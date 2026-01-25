import { prepareInstructions } from "../../constants";
import React, { type FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { convertPdfToImage } from "../lib/pdf2img";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";
import { Footer } from "~/components/Footer";
import SectionTag from "~/components/SectionTag";
import { MagicIcon } from "~/components/Icons";
import type { Route } from "./+types/upload";

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

const upload = () => {
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
    setIsProcessing(true);

    setStatusText("Uploading the document...");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile)
      return setStatusText("Error: Failed to upload the document!");

    setStatusText("Extracting the information...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file)
      return setStatusText("Error: Failed to extract the information");

    setStatusText("Analyzing the data...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText("Error: Failed to analyze the data");

    setStatusText("Preparing data...");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Almost there...");

    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription }),
    );
    if (!feedback) return setStatusText("Error: Failed to analyze resume");

    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analysis complete, redirecting...");
    console.log(data);
    navigate(`/resume/${uuid}`);
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
      navigate("/auth?next=/upload");
    }
  }, [auth.isAuthenticated]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover flex flex-col gap-10 md:gap-14 lg:gap-24">
      <Navbar />
      <section className="main-section">
        <div className="page-heading">
          <SectionTag
              icon={<MagicIcon />}
              text="Start with the Role You’re Applying For"
            />
          <h1>Analyse Your Resume with the Power of AI</h1>
          {isProcessing ? (
            <div className="w-full h-full relative flex justify-center items-center">
              <h2 className="animate-pulse absolute z-20 inset-0 top-3">{statusText}</h2>
              <img src="/images/resume-scan.gif" className="w-72 md:w-80 lg:w-96 h-auto" />
            </div>
          ) : (
            <>
              <h2 className="text-lg!">Provide the job details and upload your resume to see how well it aligns with the role. ApplyWise evaluates your resume using ATS-style logic and breaks down the results into clear scores and practical insights, so you know exactly what to improve before applying.</h2>
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

export default upload;
