import React from "react";

interface CityAQICardProps {
  cityName: string;
  aqi: number;
  imagePath: string;
}

const getAQIColor = (aqi: number) => {
  if (aqi > 300) return "bg-red-600 text-white"; // Hazardous
  // if (aqi > 200) return "bg-red-500 text-white"; // Very Unhealthy
  if (aqi > 150) return "bg-yellow-500 text-white"; // Unhealthy
  // if (aqi > 100) return "bg-yellow-500 text-black"; // Unhealthy for Sensitive Groups
  // if (aqi > 50) return "bg-green-500 text-black"; // Moderate
  return "bg-blue-500 text-white"; // Good
  // return "bg-green-500 text-white"; // Good
};

const CityAQICard: React.FC<CityAQICardProps> = ({
  cityName,
  aqi,
  imagePath,
}) => {
  const aqiColorClass = getAQIColor(aqi);

  return (
    <div
      className={`flex flex-col items-center p-4 rounded-lg shadow-md transform transition-transform duration-200 ease-in-out hover:scale-105 cursor-pointer ${aqiColorClass}`}
    >
      <img
        src={imagePath}
        alt={`${cityName} view`}
        className="w-16 h-16 rounded-full mb-3 shadow-lg"
      />
      <div className="text-center">
        <p className="text-lg font-semibold">{cityName}</p>
        <p className="text-md font-medium">
          AQI: <span className="font-bold">{aqi}</span>
        </p>
      </div>
    </div>
  );
};

export default CityAQICard;
