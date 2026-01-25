import { useState, useRef, useEffect } from "react";
import { DropDownIcon } from "./Icons";

interface AccordionProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

const FaqAccordion = ({ question, answer, defaultOpen = false }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="w-full border border-gray-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-900 cursor-pointer"
      >
        <span>{question}</span>
        <span
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <DropDownIcon />
        </span>
      </button>

      <div
        style={{ maxHeight: `${height}px` }}
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
      >
        <div ref={contentRef} className="px-4 pb-4 text-gray-600">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default FaqAccordion;
