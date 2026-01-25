import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";

const ResumeCard = ({
  resume: { companyName, companyLogo, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  return (
    <div className="resume-card animate-in fade-in duration-1000 shadow-lg hover:shadow-2xl transition-shadow ease-in-out relative z-10">
      <div className="resume-card-header">
        <div className="flex flex-col">
          {companyName && (
            <div className="flex flex-row items-center gap-1">
              <span className="w-5 aspect-square relative">
                <img src={companyLogo} />
              </span>
              <h2 className="text-xl! text-black! font-bold wrap-break-word">
                {companyName}
              </h2>
            </div>
          )}
          {jobTitle && (
            <h3 className="text-xs wrap-break-word text-gray-500">
              {jobTitle}
            </h3>
          )}
          {!companyName && !jobTitle && (
            <h2 className="text-black! font-bold">Resume</h2>
          )}
        </div>
        <div className="shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>
      {imagePath && (
        <div className="gradient-border animate-in fade-in duration-1000">
          <div className="w-full aspect-square overflow-hidden">
            <img
              src={imagePath}
              alt="resume"
              className="w-full h-auto object-cover object-top"
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default ResumeCard;
