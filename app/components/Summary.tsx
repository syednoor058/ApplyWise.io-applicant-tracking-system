import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 70
      ? "text-green-600"
      : score > 49
        ? "text-yellow-600"
        : "text-red-600";

  return (
    <div className="resume-summary">
      <div className="category">
        <div className="flex flex-row gap-2 items-center justify-center">
          <p className="font-medium">{title}</p>
          <ScoreBadge score={score} />
        </div>
        <p className="font-medium">
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full flex-col flex md:flex-row gap-4 justify-between p-6">
      <div className="w-full md:w-1/2 flex flex-col-reverse gap-2">
        <div className="flex flex-col">
            <ScoreGauge score={feedback.overallScore} />
            <h5 className="font-medium pt-3 pb-1">Total Score</h5>
            <p className="text-sm text-gray-500">
            This score is calculated based on the variables listed below.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Match Summary</h2>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col gap-4 mt-6">
        <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
        <Category title="Content" score={feedback.content.score} />
        <Category title="Structure" score={feedback.structure.score} />
        <Category title="Skills" score={feedback.skills.score} />
      </div>
    </div>
  );
};
export default Summary;
