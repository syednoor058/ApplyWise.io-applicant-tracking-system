import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";

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
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section pb-10 md:pb-14 xl:pb-20">
        <div className="page-heading">
          <h1>Welcome to ApplyWise.io – Your Smart Resume Checker!</h1>
          <h2>
            Not sure if your resume fits the job? ApplyWise compares your CV
            with job descriptions and gives clear, practical feedback.
          </h2>
        </div>
      </section>
      {resumes.length > 0 && (
        <section className="resumes-section">
          {resumes.map((resume: Resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </section>
      )}
    </main>
  );
}
