import React from "react";
import PollutantAccordion from "./PollutantAccordion";
import pollutantInfo from "../data/pollutantInfo.json";

const InformationPanel: React.FC = () => {
  return (
    <div className="p-4 bg-white w-full mx-auto rounded-lg shadow-md">
      <h2 className="font-bold text-2xl text-center">Pollutants Information</h2>
      {pollutantInfo.map((item, index) => (
        <PollutantAccordion
          key={index}
          heading={item.heading}
          content={item.content}
        />
      ))}
    </div>
  );
};

export default InformationPanel;
