import React from "react";
// import { Tooltip as ReactTooltip } from "react-tooltip";

interface PollutantBarProps {
  name: string;
  maxValue: number;
  currentValue: number;
  imagePath: string;
  // description: string;
}

const PollutantBar: React.FC<PollutantBarProps> = ({
  name,
  maxValue,
  currentValue,
  imagePath,
  // description,
}) => {
  const percentage = (currentValue / maxValue) * 100;
  const barColor =
    percentage > 75
      ? "bg-red-500"
      : percentage > 50
      ? "bg-yellow-400"
      : "bg-green-400";

  return (
    <div className="flex flex-col items-center text-center p-4">
      <img src={imagePath} alt={`${name} icon`} className="h-12 mb-2" />
      <span
        className="text-lg font-semibold"
        // data-tooltip-id={`tooltip-${name}`}
        // data-tooltip-content={description}
      >
        <span className="text-xl font-bold">{currentValue}</span>{" "}
        <span className="text-sm font-medium text-gray-500">({name})</span>
      </span>

      <div className="relative w-4/5 bg-gray-200 rounded-full h-5 mt-2 mb-2 shadow-inner">
        <div
          className={`absolute top-0 left-0 h-5 rounded-full transition-all duration-300 ${barColor}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* <ReactTooltip id={`tooltip-${name}`} place="top" /> */}
    </div>
  );
};

export default PollutantBar;
