import React from "react";

interface CityAQICardProps {
  cityName: string;
  aqi: number;
  imagePath: string;
}

const CityAQICard: React.FC<CityAQICardProps> = ({
  cityName,
  aqi,
  imagePath,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <img
        src={imagePath}
        alt={`${cityName} view`}
        className="w-10 h-10 rounded-full"
      />
      <div>
        <p className="font-medium">{cityName}</p>
        <p>
          AQI: <span className="font-bold">{aqi}</span>
        </p>
      </div>
    </div>
  );
};

export default CityAQICard;
