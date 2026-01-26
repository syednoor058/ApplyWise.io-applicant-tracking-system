import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
  return (
    <div
      className={cn(
        "flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px]",
        score > 69
          ? "bg-badge-green"
          : score > 39
            ? "bg-badge-yellow"
            : "bg-badge-red",
      )}
    >
      <img
        src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
        alt="score"
        className="size-4"
      />
      <p
        className={cn(
          "text-sm font-medium",
          score > 69
            ? "text-badge-green-text"
            : score > 39
              ? "text-badge-yellow-text"
              : "text-badge-red-text",
        )}
      >
        {score}/100
      </p>
    </div>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex flex-row gap-4 items-center py-1">
      <p className="text-lg font-semibold">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: {
    type: "good" | "improve";
    tip: string;
    explanation: string;
    needChanges?: {
      reason: string;
      before: string;
      after: string;
      scoreImpact: number;
    }[];
  }[];
}) => {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <div className="flex flex-col gap-4 w-full">
        {tips.map((tip, index) => (
          <div
            key={index + tip.tip}
            className={cn(
              "flex flex-col gap-2 rounded-2xl p-4 bg-white",
              tip.type === "good"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-yellow-50 border border-yellow-200 text-yellow-700",
            )}
          >
            <div className="flex flex-row gap-2 items-center">
              <img
                src={
                  tip.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt="score"
                className="size-5"
              />
              <p className="text-lg lg:text-xl font-semibold">{tip.tip}</p>
            </div>
            <p>{tip.explanation}</p>
            {tip.needChanges && tip.needChanges.length > 0 && (
              <div className="mt-4">
                <div className="font-medium mb-4">Need changes here:</div>
                <div className="w-full flex flex-col gap-6">
                  {tip.needChanges.map((change, idx) => (
                  <div key={idx + change.reason} className={`w-full pl-4 border-l-4 flex flex-row gap-3 justify-between ${tip.type === "good" ? "border-green-400" : "border-yellow-400"}`}>
                    <div className="w-full flex flex-col gap-2">
                      <p className="font-medium">{idx + 1}. {change.reason}</p>
                      <div>
                        <div className="mb-0.5 italic">Before:</div>
                        <div className="bg-red-50 border-[0.5px] border-red-200 p-3 text-gray-700 rounded-sm">{change.before}</div>
                      </div>
                      <div>
                        <div className="mb-0.5 italic">After:</div>
                        <div className="bg-green-50 border-[0.5px] border-green-200 p-3 text-gray-700 rounded-sm">{change.after}</div>
                      </div>
                    </div>
                    <div className="text-xl">+{change.scoreImpact}</div>
                  </div>
                ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Accordion>
        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader
              title="Tone & Style"
              categoryScore={feedback.toneAndStyle.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader
              title="Content"
              categoryScore={feedback.content.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader
              title="Structure"
              categoryScore={feedback.structure.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader
              title="Skills"
              categoryScore={feedback.skills.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
