import React, { useState } from "react";
import { BrainIcon, ProtectedIcon, ResumeAddIcon } from "./Icons";

const StepDetails = ({
  icon,
  title,
  subtitle,
  description,
  themeColor,
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  themeColor?: string;
}) => {
  return (
    <div className={`w-full flex flex-col pl-7 md:pl-10 border-l-6 animate-in fade-in duration-1000 ease-in-out`} style={{ borderColor: themeColor }}>
      <h3 className={`font-bold text-2xl flex flex-row gap-3 items-center`}>
        {icon}
        {title}
      </h3>
      <h5 className="text-lg font-medium text-gray-400 pt-1 italic">{subtitle}</h5>
      <p className="text-[#334155] pt-4">{description}</p>
    </div>
  );
};

const HowItWorks = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="w-full max-w-4xl flex flex-col gap-10">
      <div className="flex flex-row justify-center items-center text-[#0F172A]">
        <div
          className={`w-10 h-10 flex justify-center items-center rounded-full border border-[#0F172A] font-medium text-xl cursor-pointer ${step === 1 ? "bg-[#ec4899] text-white border-none" : ""} transition-colors duration-600 ease-in-out`}
          onClick={() => setStep(1)}
        >
          01
        </div>
        <div className="h-px w-32 md:w-48 bg-[#0F172A]"></div>
        <div
          className={`w-10 h-10 flex justify-center items-center rounded-full border border-[#0F172A] font-medium text-xl cursor-pointer ${step === 2 ? "bg-[#F97316] text-white border-none" : ""} transition-colors duration-600 ease-in-out`}
          onClick={() => setStep(2)}
        >
          02
        </div>
        <div className="h-px w-32 md:w-48 bg-[#0F172A]"></div>
        <div
          className={`w-10 h-10 flex justify-center items-center rounded-full border border-[#0F172A] font-medium text-xl cursor-pointer ${step === 3 ? "bg-[#22C55E] text-white border-none" : ""} transition-colors duration-600 ease-in-out`}
          onClick={() => setStep(3)}
        >
          03
        </div>
      </div>
      {step === 1 && (
        <StepDetails
          icon={
            <ProtectedIcon />
          }
          title="Sign In Securely"
          subtitle="Create an account on Puter and log in."
          description="ApplyWise uses Puter for authentication and secure file handling. This ensures your resume and personal data are stored safely, while giving you full control over your files and analysis history throughout the process." themeColor="#ec4899"
        />
      )}
      {step === 2 && (
        <StepDetails
          icon={
            <ResumeAddIcon />
          }
          title="Add Job Details & Resume"
          subtitle="Enter the company name, job role, job description, and upload your resume."
          description="These details allow ApplyWise to evaluate your resume against real hiring criteria. Instead of generic checks, the system analyzes relevance, keyword alignment, structure, and tone based on the specific role you’re targeting." themeColor="#F97316"
        />
      )}
      {step === 3 && (
        <StepDetails
          icon={
            <BrainIcon />
          }
          title="Analyze & Improve"
          subtitle="Click “Analyze Resume” and let AI handle the rest."
          description="ApplyWise processes your resume, calculates an ATS score, and generates clear insights across multiple categories. You’ll receive focused feedback that explains what’s working, what’s missing, and how to make meaningful improvements." themeColor="#22C55E"
        />
      )}
    </div>
  );
};

export default HowItWorks;
