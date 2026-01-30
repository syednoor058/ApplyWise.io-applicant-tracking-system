import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import HowItWorks from "~/components/HowItWorks";
import Feature from "~/components/Feature";
import SectionTag from "~/components/SectionTag";
import {
  CogsIcon,
  GuardIcon,
  HalfStarIcon,
  HandShakeIcon,
  InfoIcon,
  MagicIcon,
  MuscleIcon,
  QuestionIcon,
  ResumeIcon,
  ReviewIcon,
  RightArrowIcon,
  ScoreIcon,
  StarIcon,
} from "~/components/Icons";
import FaqAccordion from "~/components/FaqAccordion";
import { Footer } from "~/components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Resume Checker for Job Applications | ApplyWise.io" },
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
      <div className="flex flex-col gap-20 md:gap-24 xl:gap-36 py-8 md:py-10 lg:py-20 animate-in fade-in duration-1000">
        <section className="main-section">
          <div className="page-heading">
            <SectionTag
              icon={<MagicIcon />}
              text="AI-Powered Full Free Resume Intelligence"
            />
            <h1>Match Your Resume to the Job — Before Recruiters Do</h1>
            <h2>
              <span className="font-semibold">ApplyWise</span> analyzes your
              resume against real job descriptions, scores its ATS
              compatibility, and shows exactly what to fix to improve your
              chances.
            </h2>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center">
              <Link
                to="/uploads"
                className="primary-button px-7 py-3 text-xl animate-in fade-in duration-1000 flex gap-2 items-center"
              >
                <span>
                  <ResumeIcon />
                </span>
                Analyze Resume
              </Link>
              <Link
                to="/"
                className="text-nowrap text-xl hover:text-[#4F7BFF] transition-colors ease-in-out animate-in fade-in duration-1000 flex items-center gap-2"
              >
                How It Works
                <span>
                  <RightArrowIcon />
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
          <div className="text-center flex flex-col justify-center items-center">
            <div className="flex flex-wrap gap-x-4 gap-y-1 lg:gap-6 justify-center items-center mb-6 md:mb-4 lg:mb-8">
              <div className="font-semibold text-sm lg:text-lg">EXCELLENT</div>
              <div className="flex flex-row">
                {Array.from({ length: 4 }, (_, index) => (
                  <StarIcon key={index} />
                ))}
                <HalfStarIcon />
              </div>
              <div className="">17 reviews on</div>
              <div className=" relative">
                <img
                  src="/logos/trustpilot.svg"
                  alt="trustpilot-reviews"
                  className="h-7 w-auto"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-6 lg:gap-10 justify-center items-center">
              <img
                src="/logos/Google-Logo.svg"
                alt="google-logo"
                className="h-5 lg:h-8 w-auto grayscale hover:grayscale-0 transition-all ease-in-out"
              />

              <img
                src="/logos/Amazon-Logo.svg"
                alt="amazon-logo"
                className="h-5 lg:h-8 w-auto grayscale hover:grayscale-0 transition-all ease-in-out"
              />
              <img
                src="/logos/Microsoft-Logo.svg"
                alt="microsoft-logo"
                className="h-5 lg:h-8 w-auto grayscale hover:grayscale-0 transition-all ease-in-out"
              />
              <img
                src="/logos/Facebook-Logo.svg"
                alt="facebook-logo"
                className="h-5 lg:h-8 w-auto grayscale hover:grayscale-0 transition-all ease-in-out"
              />
              <img
                src="/logos/IBM-Logo.svg"
                alt="ibm-logo"
                className="h-5 lg:h-8 w-auto grayscale hover:grayscale-0 transition-all ease-in-out"
              />
              <img
                src="/logos/Netflix-Logo.svg"
                alt="netflix-logo"
                className="h-8 w-auto grayscale hover:grayscale-0 transition-all ease-in-out"
              />
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full flex flex-col justify-center items-center"
        >
          <div className="page-heading">
            <SectionTag icon={<HandShakeIcon />} text="What You Get" />
            <h1 className="text-center">
              Everything You Need
              <br />
              to Apply Smarter
            </h1>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 mt-6 md:mt-8 lg:mt-14">
            <Feature
              icon={<ScoreIcon />}
              title="ATS Compatibility Score"
              description="See how well your resume performs against automated screening systems used by employers."
            />
            <Feature
              icon={<MuscleIcon />}
              title="Skill Match Analysis"
              description="Identify missing or underrepresented skills compared to the job role and description very precisely."
            />
            <Feature
              icon={<ReviewIcon />}
              title="Content & Structure Review"
              description="Get feedback on resume sections, formatting, and clarity to improve readability and impact."
            />
            <Feature
              icon={<InfoIcon />}
              title="Tone & Style Insights"
              description="Ensure your resume sounds professional, confident, and aligned with industry expectations."
            />
          </div>
        </section>
        {resumes.length > 0 && (
          <section className="flex flex-col justify-center items-center">
            <div className="page-heading">
              <SectionTag
                icon={<GuardIcon />}
                text="Privacy-first Resume Processing"
              />
              <h1 className="text-center">
                Report That Enhances Your Presence
              </h1>
              <h2 className="text-center">
                No vague scores. No generic advice. Just clear feedback that
                helps you understand where your resume stands and how to improve
                it.
              </h2>
            </div>
            <div className="resumes-section relative">
              <div className="absolute inset-0 w-full z-1 opacity-20 blur-3xl">
                <img src="/images/bg-elem-1.png" />
              </div>
              {resumes.map((resume: Resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
          </section>
        )}
        <section
          id="how-it-works"
          className="w-full flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10 justify-center items-center"
        >
          <div className="w-full lg:w-[60%] flex flex-col gap-6 md:gap-8 lg:gap-10">
            <div className="page-heading lg:items-start!">
              <SectionTag icon={<CogsIcon />} text="How It Works" />

              <h1 className="text-center lg:text-start">
                From Upload to Insight
                <br />
                in Minutes
              </h1>
              <h2 className="text-center lg:text-start">
                <span className="font-medium">ApplyWise</span> is designed to be
                straightforward. No complex setup, no confusing steps. You
                provide the context, and the system analyzes your resume the
                same way an ATS would — then translates the results into clear,
                actionable feedback.
              </h2>
            </div>
            <HowItWorks />
          </div>
          <div className="w-full lg:w-[40%] flex aspect-[3/3.5] justify-center items-center">
            <img src="/images/step-cards.png" className="w-full h-auto" />
          </div>
        </section>
        <section
          id="faq"
          className="w-full flex flex-col justify-center items-center"
        >
          <div className="page-heading mb-6 md:mb-8 lg:mb-10">
            <SectionTag icon={<QuestionIcon />} text="FAQ" />

            <h1 className="text-center">Frequiently Asked Questions</h1>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 lg:gap-10">
            <div className="w-full md:w-1/2 flex flex-col gap-2 md:gap-4">
              <FaqAccordion
                question="1. How accurate is the ATS score?"
                answer="The ATS score is calculated by analyzing how closely your resume aligns with a specific job description. It reflects common ATS screening factors such as keyword relevance, structure, formatting, and overall clarity. While no tool can guarantee outcomes, the score gives a realistic indication of how an ATS may evaluate your resume."
              />
              <FaqAccordion
                question="2. Do I need a different analysis for every job application?"
                answer="Yes. Each job description has different requirements, keywords, and expectations. ApplyWise analyzes your resume against the specific role you provide, ensuring the feedback is tailored to that position rather than being generic."
              />
              <FaqAccordion
                question="3. Is my resume data safe and private?"
                answer="Yes. Your files are securely handled through Puter. ApplyWise does not share or sell your data, and you remain in control of your uploaded files and analysis history at all times."
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-2 md:gap-4">
              <FaqAccordion
                question="4. What type of resumes does ApplyWise support?"
                answer="ApplyWise currently supports PDF resumes. This format ensures accurate text extraction and consistent analysis across different resume layouts and designs."
              />
              <FaqAccordion
                question="5. Does ApplyWise rewrite my resume for me?"
                answer="No. ApplyWise focuses on analysis and guidance. It highlights gaps, explains issues, and suggests improvements, allowing you to make informed changes while keeping your resume authentic and personalized."
              />
              <FaqAccordion
                question="6. Can ApplyWise guarantee interview calls or job offers?"
                answer="No tool can guarantee interview calls or job offers. ApplyWise is designed to help you optimize your resume for ATS screening and relevance, increasing your chances of being shortlisted—but final decisions always depend on recruiters."
              />
            </div>
          </div>
        </section>
      </div>
      <div className="w-screen -mx-4 md:-mx-10 xl:-mx-20">
        <Footer />
      </div>
    </main>
  );
}
