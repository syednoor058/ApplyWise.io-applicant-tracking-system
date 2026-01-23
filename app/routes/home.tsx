import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ApplyWise.io – Smart Resume Checker for Job Applications" },
    {
      name: "description",
      content:
        "Not sure if your resume fits the job? ApplyWise compares your CV with job descriptions and gives clear, practical feedback.",
    },
  ];
}

export default function Home() {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-contain bg-no-repeat min-h-screen">
      <Navbar />
      <section className="main-section pb-10 md:pb-14 xl:pb-20">
        <div className="page-heading">
          <p className="py-1.5 px-4 rounded-xl border-2 border-[#4F7BFF] bg-[#4F7BFF]/20 flex gap-2 items-center text-sm md:text-base">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#FFE300"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-sparkles-icon lucide-sparkles"
              >
                <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                <path d="M20 2v4" />
                <path d="M22 4h-4" />
                <circle cx="4" cy="20" r="2" />
              </svg>
            </span>
            AI-Powered Full Free Resume Intelligence
          </p>
          <h1>Match Your Resume to the Job — Before Recruiters Do</h1>
          <h2>
            <span className="font-semibold">ApplyWise</span> analyzes your
            resume against real job descriptions, scores its ATS compatibility,
            and shows exactly what to fix to improve your chances.
          </h2>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center">
            <Link
              to="/upload"
              className="primary-button px-7 py-3 text-xl animate-in fade-in duration-1000 flex gap-2 items-center"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-file-text-icon lucide-file-text"
                >
                  <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
                  <path d="M14 2v5a1 1 0 0 0 1 1h5" />
                  <path d="M10 9H8" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                </svg>
              </span>
              Analyze Resume
            </Link>
            <Link
              to="/"
              className="text-nowrap text-xl hover:text-[#4F7BFF] transition-colors ease-in-out animate-in fade-in duration-1000 flex items-center gap-2"
            >
              How It Works
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-arrow-right-icon lucide-arrow-right"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
        <div className="w-screen relative mt-5 -mx-4 md:-mx-10 xl:-mx-20">
          <img
            src="/images/home-banner-image.png"
            alt="resume-analyzed-score-screenshot-tablet"
            className="w-full h-auto"
          />
        </div>
      </section>
      {resumes.length > 0 && (
        <section className="flex flex-col justify-center items-center">
          <div className="page-heading"><h1 className="text-center">What a Resume Review Looks Like with ApplyWise</h1>
          <h2 className="text-center">No vague scores. No generic advice. Just clear feedback that helps you understand where your resume stands and how to improve it.</h2></div>
          <div className="resumes-section">
            {resumes.map((resume: Resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
          </div>
        </section>
      )}
    </main>
  );
}
