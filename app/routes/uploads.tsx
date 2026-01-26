import {
  AIResponseFormat,
  getATSPrompt,
  getContentPrompt,
  getOverallScoreePrompt,
  getSkillsPrompt,
  getStructurePrompt,
  getToneAndStylePrompt,
  prepareInstructions,
} from "../../constants";
import React, { type FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";
import { Footer } from "~/components/Footer";
import SectionTag from "~/components/SectionTag";
import { MagicIcon } from "~/components/Icons";
import { convertPdfToImages } from "~/lib/pdf2images";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ATS Resume Checker – Upload Your Resume | ApplyWise" },
    {
      name: "description",
      content:
        "Check how your resume performs against ATS systems. Upload your resume and job details to get role-specific insights and improvement tips.",
    },
  ];
}

const uploads = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { auth, fs, ai, kv, isLoading } = usePuterStore();
  const navigate = useNavigate();

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    try {
      setIsProcessing(true);

      /* 1. Upload original PDF */
      setStatusText("Uploading your resume...");
      const uploadedPdf = await fs.upload([file]);

      if (!uploadedPdf || !uploadedPdf.path) {
        setStatusText("Error: Failed to upload resume");
        return;
      }

      /* 2. Convert PDF → images (ALL pages) */
      setStatusText("Processing resume pages...");
      const conversionResult = await convertPdfToImages(file);
      if (!conversionResult.pages.length) {
        setStatusText("Error: Failed to process resume pages");
        return;
      }

      /* 3. Upload all page images */
      setStatusText("Uploading extracted pages...");
      const uploadedImagePaths: string[] = [];

      for (const page of conversionResult.pages) {
        const uploaded = await fs.upload([page.file]);
        if (!uploaded) {
          setStatusText("Error: Failed to upload resume pages");
          return;
        }
        uploadedImagePaths.push(uploaded.path);
      }

      /* 4. Extract text from each image */
      setStatusText("Extracting resume content...");
      let extractedText = "";

      for (const imagePath of uploadedImagePaths) {
        const text = await ai.img2txt(imagePath);
        if (text) {
          extractedText += `\n\n${text}`;
        }
      }

      if (!extractedText.trim()) {
        setStatusText("Error: Failed to extract resume text");
        return;
      }

      /* 5. Prepare AI prompt */
      setStatusText("Analyzing resume with AI...");

      const analyzeSection = async (prompt: string) => {
        const res = await ai.chat(prompt, {
          model: "anthropic/claude-3-haiku",
        });
        if (!res?.message?.content) throw new Error("AI response empty!");

        const raw =
          typeof res.message.content === "string"
            ? res.message.content
            : res.message.content[0]?.text;

        try {
          return JSON.parse(raw);
        } catch {
          console.error("Invalid JSON:", raw);
          throw new Error("Invalid AI JSON output");
        }
      };

      setStatusText("Checking ATS optimization...");
      /* ATS */
      const ATS = await analyzeSection(
        getATSPrompt(jobTitle, jobDescription, extractedText),
      );

      setStatusText("Checking tone and style...");
      /* Tone & Style */
      const toneAndStyle = await analyzeSection(
        getToneAndStylePrompt(jobTitle, jobDescription, extractedText),
      );

      setStatusText("Checking content quality...");
      /* Content */
      const content = await analyzeSection(
        getContentPrompt(jobTitle, jobDescription, extractedText),
      );

      setStatusText("Checking document structure...");
      /* Structure */
      const structure = await analyzeSection(getStructurePrompt(extractedText));

      setStatusText("Checking skill relevance...");
      /* Skills */
      const skills = await analyzeSection(
        getSkillsPrompt(jobTitle, jobDescription, extractedText),
      );

      setStatusText("Calculating overall score...");
      /* Overall Score (weighted or AI-generated) */
      const overall = await analyzeSection(
        getOverallScoreePrompt(
          extractedText,
          jobTitle,
          jobDescription,
          ATS,
          toneAndStyle,
          content,
          structure,
          skills,
        ),
      );

      /* ---------- 6. FINAL FEEDBACK OBJECT ---------- */

      const feedback = {
        overallScore: overall.overallScore,
        ATS,
        toneAndStyle,
        content,
        structure,
        skills,
      };

      /* 7. Store analysis result */

      setStatusText("Saving analysis...");
      const uuid = generateUUID();

      await kv.set(
        `resume:${uuid}`,
        JSON.stringify({
          id: uuid,
          companyName,
          jobTitle,
          jobDescription,
          resumePath: uploadedPdf.path,
          imagePaths: uploadedImagePaths,
          extractedText,
          feedback,
        }),
      );

      /* 7. Done */
      setStatusText("Analysis complete. Redirecting...");
      navigate(`/resume/${uuid}`);
    } catch (err) {
      console.error(err);
      setStatusText("Analysis failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) return;

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/uploads");
    }
  }, [auth.isAuthenticated]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover flex flex-col gap-10 md:gap-14 lg:gap-24">
      <Navbar />
      <section className="main-section animate-in fade-in duration-1000">
        <div className="page-heading">
          <SectionTag
            icon={<MagicIcon />}
            text="Start with the Role You’re Applying For"
          />
          <h1>Analyse Your Resume with the Power of AI</h1>
          {isProcessing ? (
            <div className="w-full h-full relative flex justify-center items-center">
              <h2 className="animate-pulse absolute z-20 inset-0 top-3">
                {statusText}
              </h2>
              <img
                src="/images/resume-scan.gif"
                className="w-72 md:w-80 lg:w-96 h-auto"
              />
            </div>
          ) : (
            <>
              <h2 className="text-lg!">
                Provide the job details and upload your resume to see how well
                it aligns with the role. ApplyWise evaluates your resume using
                ATS-style logic and breaks down the results into clear scores
                and practical insights, so you know exactly what to improve
                before applying.
              </h2>
            </>
          )}
          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-8"
            >
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  name="company-name"
                  placeholder="Company Name"
                  id="company-name"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  name="job-title"
                  placeholder="Job Title"
                  id="job-title"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  rows={5}
                  name="job-description"
                  placeholder="Job Description"
                  id="job-description"
                />
              </div>

              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader file={file} onFileSelect={handleFileSelect} />
              </div>

              <button className="primary-button" type="submit">
                Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
      <div className="w-screen -mx-4 md:-mx-10 xl:-mx-20">
        <Footer />
      </div>
    </main>
  );
};

export default uploads;
