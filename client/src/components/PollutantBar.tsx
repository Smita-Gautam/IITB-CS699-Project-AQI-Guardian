import React from "react";

interface PollutantBarProps {
  name: string;
  maxValue: number;
  safeValue: number;
  avgValue: number;
  currentValue: number;
  imagePath: string;
}

const PollutantBar: React.FC<PollutantBarProps> = ({
  name,
  maxValue,
  safeValue,
  avgValue,
  currentValue,
  imagePath,
}) => {
  const percentage = Math.min((currentValue / maxValue) * 100, 100);
  const barColor =
    currentValue > avgValue
      ? "bg-red-500"
      : currentValue > safeValue
      ? "bg-yellow-400"
      : "bg-green-400";

  return (
    <div className="flex flex-col items-center text-center p-4">
      <img src={imagePath} alt={`${name} icon`} className="h-12 mb-2" />
      <span className="text-lg font-semibold">
        <span className="text-2xl font-bold">{currentValue}</span>{" "}
        <span className="text-sm font-medium text-gray-500">({name})</span>
      </span>

      <div className="relative w-4/5 bg-gray-200 rounded-full h-5 mt-2 mb-2 shadow-inner">
        <div
          className={`absolute top-0 left-0 h-5 rounded-full transition-all duration-300 ${barColor}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default PollutantBar;
