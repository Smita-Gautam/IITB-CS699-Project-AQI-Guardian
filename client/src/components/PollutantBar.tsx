interface PollutantBarProps {
  name: string;
  maxValue: number;
  currentValue: number;
  imagePath: string;
}

const PollutantBar: React.FC<PollutantBarProps> = ({
  name,
  maxValue,
  currentValue,
  imagePath,
}) => {
  const percentage = (currentValue / maxValue) * 100;

  return (
    <div className="flex flex-col items-center text-center">
      <img src={imagePath} alt={`${name} icon`} className="h-10 mb-2" />
      <span className="text-sm font-medium">
        {currentValue} ({name})
      </span>
      <div className="relative w-full bg-gray-200 rounded-full h-2 mt-1 mb-2">
        <div
          className={`absolute top-0 left-0 h-2 rounded-full ${
            percentage > 75
              ? "bg-red-500"
              : percentage > 50
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
          style={{ width: `${percentage}%` }}
          title={`${currentValue} / ${maxValue}`}
        ></div>
      </div>
    </div>
  );
};

export default PollutantBar;
