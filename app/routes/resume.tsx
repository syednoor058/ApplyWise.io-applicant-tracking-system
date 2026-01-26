import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import Navbar from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import SectionTag from "~/components/SectionTag";
import { MagicIcon } from "~/components/Icons";

export const meta = () => [
  { title: "Resume Analysis Report | ATS Score & Insights | ApplyWise" },
  {
    name: "description",
    content:
      "Explore a detailed resume analysis with ATS score, skill alignment, structure review, and practical recommendations to strengthen your application.",
  },
];

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;

      const data = JSON.parse(resume);

      /* ---------- PDF ---------- */
      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) {
        console.error("Failed to read resume PDF");
        return;
      }

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      setResumeUrl(URL.createObjectURL(pdfBlob));

      /* ---------- IMAGE PREVIEW (FIRST PAGE) ---------- */
      if (Array.isArray(data.imagePaths) && data.imagePaths.length > 0) {
        const urls: string[] = [];

        for (const path of data.imagePaths) {
          const blob = await fs.read(path);
          if (blob) {
            urls.push(URL.createObjectURL(blob));
          }
        }

        setImageUrls(urls);
      }

      setFeedback(data.feedback);
    };

    loadResume();
  }, [id]);

  const LoadingScreen = () => {
    return (
      <section className="w-full flex flex-col justify-center items-center">
        <div className="w-full h-full relative flex justify-center items-center">
          <h2 className="animate-pulse absolute z-20 inset-0 top-3 text-center">
            Please wait a moment...
          </h2>
          <img
            src="/images/resume-scan-2.gif"
            className="w-72 md:w-80 lg:w-96 h-auto"
          />
        </div>
      </section>
    );
  };

  return (
    <main className="w-full bg-[url('/images/bg-main.svg')] bg-cover bg-no-repeat min-h-screen main-section">
      <Navbar />
      {feedback ? (
        <section className="w-full flex flex-col justify-center items-center gap-10 md:gap-14 lg:gap-20 animate-in fade-in duration-1000">
          <div className="page-heading">
            <SectionTag
              icon={<MagicIcon />}
              text="Your Resume, Clearly Explained"
            />
            <h1>Your Resume Analysis Report</h1>
            <h2>
              This report shows how your resume performs against the job you’re
              applying for. Each score is backed by clear reasoning and
              practical suggestions.
            </h2>
          </div>
          <div className="flex flex-col w-full lg:flex-row gap-5 lg:gap-8">
            <section className="w-full lg:w-[40%] feedback-section">
              {imageUrls.length > 0 && resumeUrl && (
                <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
                  {imageUrls.map((imageUrl) => (
                    <div
                      key={imageUrl}
                      className="animate-in fade-in duration-1000 gradient-border p-1"
                    >
                      <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={imageUrl}
                          className="w-full h-full object-contain rounded-2xl"
                          title="resume"
                        />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </section>
            <section className="w-full lg:w-[60%] feedback-section">
              {feedback && (
                <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                  <Summary feedback={feedback} />
                  <ATS
                    score={feedback.ATS.score || 0}
                    suggestions={feedback.ATS.tips || []}
                  />
                  <Details feedback={feedback} />
                </div>
              )}
            </section>
          </div>
        </section>
      ) : (
        <LoadingScreen />
      )}
      <div className="w-screen -mx-4 md:-mx-10 lg:-mx-20">
        <Footer />
      </div>
    </main>
  );
};
export default Resume;
