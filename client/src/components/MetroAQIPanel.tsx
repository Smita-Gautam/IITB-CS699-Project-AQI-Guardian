import React, { useEffect, useState } from "react";
import CityAQICard from "./CityAQICard";
import cities from "../data/cities.json";
import { fetchAQI, AQIResponse } from "../api/aqi";
import LoadingAnimation from "./LoadingAnimation/LoadingAnimation";

const MetroAQIPanel: React.FC = () => {
  const [metroCitiesData, setMetroCitiesData] = useState<
    { name: string; aqi: number; imagePath: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMetroCitiesAQI = async () => {
      try {
        const metroCities = cities.filter((city) =>
          ["Delhi", "Mumbai", "Bengaluru", "Kolkata"].includes(city.city_name)
        );

        const citiesWithAQI = await Promise.all(
          metroCities.map(async (city) => {
            // fetch AQI data for each city
            const response: AQIResponse = await fetchAQI(
              parseFloat(city.lat),
              parseFloat(city.lon)
            );
            const aqiValue = response.aqi;

            const aqi =
              typeof aqiValue === "number" ? aqiValue : Number(aqiValue);

            return {
              name: city.city_name,
              aqi: !isNaN(aqi) ? aqi : 0,
              imagePath: `/assets/images/${city.city_name}.jpg`,
            };
          })
        );

        setMetroCitiesData(citiesWithAQI);
      } catch (err) {
        setError("Failed to fetch AQI data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getMetroCitiesAQI();
  }, []);

  if (loading || error) {
    return <LoadingAnimation />;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">
        Metro Cities AQI
      </h1>
      <div className="space-y-4">
        {metroCitiesData.map((city) => (
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
