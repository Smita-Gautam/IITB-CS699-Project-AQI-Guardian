import React from "react";
import CityAQICard from "./CityAQICard";
import allCityData from "../data/aqiData.json";

const MetroAQIPanel: React.FC = () => {
  const citiesData = allCityData
    .filter((city) => city.isMetro)
    .map((city) => ({
      name: city.name,
      aqi: city.aqi[city.aqi.length - 1],
      imagePath: city.imagePath ? city.imagePath : "",
    }));

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Metro Cities AQI
      </h1>
      <div className="space-y-4">
        {" "}
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
