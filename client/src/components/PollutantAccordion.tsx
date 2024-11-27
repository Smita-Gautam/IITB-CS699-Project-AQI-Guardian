import React, { useState } from "react";

interface PollutantAccordionProps {
  heading: string;
  content: string;
}

const PollutantAccordion: React.FC<PollutantAccordionProps> = ({
  heading,
  content,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full p-2">
      <div
        className="flex justify-between items-center cursor-pointer p-4 bg-blue-200 rounded-lg shadow-sm"
        onClick={toggleAccordion}
      >
        <h3 className="text-lg font-semibold text-gray-800">{heading}</h3>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </div>

      {isOpen && (
        <div className="p-4 mt-2 bg-white rounded-lg shadow-inner">
          <p className="text-gray-700">{content}</p>
        </div>
      )}
    </div>
  );
};

export default PollutantAccordion;
