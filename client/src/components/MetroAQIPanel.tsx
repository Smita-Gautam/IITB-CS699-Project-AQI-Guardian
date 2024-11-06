import React from "react";
import CityAQICard from "./CityAQICard";

const MetroAQIPanel: React.FC = () => {
  const citiesData = [
    { name: "Delhi", aqi: 150, imagePath: "/assets/images/Delhi.jpg" },
    { name: "Mumbai", aqi: 120, imagePath: "/assets/images/Mumbai.jpg" },
    { name: "Kolkata", aqi: 130, imagePath: "/assets/images/Kolkata.jpg" },
    {
      name: "Bengaluru",
      aqi: 110,
      imagePath: "/assets/images/Bengaluru.jpg",
    },
    { name: "Chennai", aqi: 140, imagePath: "/assets/images/Chennai.jpg" },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-xl font-semibold mb-4">Metro Cities AQI</h1>
      <div className="space-y-4">
        {citiesData.map((city) => (
          <CityAQICard
            key={city.name}
            cityName={city.name}
            aqi={city.aqi}
            imagePath={city.imagePath}
          />
        ))}
      </div>
    </div>
  );
};

export default MetroAQIPanel;
