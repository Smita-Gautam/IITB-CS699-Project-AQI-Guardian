import React, { useEffect, useState } from "react";
import PollutantBar from "./PollutantBar";

interface Pollutant {
  name: string;
  maxValue: number;
  currentValue: string | number; // Allow both string and number
  imagePath: string;
  description: string;
}

interface AQIResponse {
  location: string;
  aqi: number | string;
  dominant_pollutant: string;
  pm10: number | string;
  pm25: number | string;
  o3: number | string;
  so2: number | string;
  co: number | string;
  no2: number | string;
}

interface CurrentCityPollutantsProps {
  aqiData: AQIResponse | null; // Pass AQI data as a prop
}

const pollutantsTemplate = [
  {
    name: "PM2.5",
    maxValue: 150,
    imagePath: "/assets/images/pm2.5.png",
    description:
      "Fine particulate matter that can penetrate deep into the lungs and affect respiratory health.",
  },
  {
    name: "PM10",
    maxValue: 200,
    imagePath: "/assets/images/pm10.png",
    description:
      "Inhalable particles that can cause breathing issues and aggravate asthma.",
  },
  {
    name: "CO",
    maxValue: 3000,
    imagePath: "/assets/images/co.png",
    description:
      "A colorless, odorless gas that reduces oxygen delivery in the body and can be harmful in high concentrations.",
  },
  {
    name: "SO2",
    maxValue: 20,
    imagePath: "/assets/images/so2.png",
    description:
      "A pungent gas from burning fossil fuels, which can cause throat irritation and exacerbate lung diseases.",
  },
  {
    name: "O3",
    maxValue: 100,
    imagePath: "/assets/images/ozone.png",
    description:
      "A reactive gas at ground level that can irritate the lungs and reduce lung function.",
  },
  {
    name: "NO2",
    maxValue: 400,
    imagePath: "/assets/images/no2.png",
    description:
      "A gas from vehicles and industry that can irritate airways and worsen respiratory diseases.",
  },
];

const CurrentCityPollutants: React.FC<CurrentCityPollutantsProps> = ({
  aqiData,
}) => {
  const [pollutants, setPollutants] = useState<Pollutant[]>([]);

  useEffect(() => {
    if (aqiData) {
      // Dynamically map pollutant data from API response
      const dynamicPollutants = pollutantsTemplate.map((pollutant) => {
        const pollutantKey = pollutant.name.toLowerCase().replace(".", ""); // Handle keys like pm25
        const currentValue = aqiData[pollutantKey as keyof AQIResponse] || 0;
        return {
          ...pollutant,
          currentValue,
        };
      });

      setPollutants(dynamicPollutants);
    }
  }, [aqiData]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md text-center">
      <div className="text-gray-800">
        <p className="text-3xl font-bold">Air Pollutant Levels</p>
      </div>

      {pollutants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {pollutants.map((pollutant, index) => (
            <PollutantBar
              key={index}
              name={pollutant.name}
              maxValue={pollutant.maxValue}
              currentValue={
                isNaN(Number(pollutant.currentValue))
                  ? 0
                  : Number(pollutant.currentValue)
              } // Default to 0 if invalid
              imagePath={pollutant.imagePath}
              description={`${pollutant.name}: ${pollutant.currentValue} / ${pollutant.maxValue} - ${pollutant.description}`}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">Fetching pollutant data...</p>
      )}
    </div>
  );
};

export default CurrentCityPollutants;
