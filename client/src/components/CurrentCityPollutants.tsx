import React, { useEffect, useState } from "react";
import PollutantBar from "./PollutantBar";
import pollutantsData from "../data/pollutants.json";

interface Pollutant {
  name: string;
  maxValue: number;
  currentValue: number;
  imagePath: string;
}

const CurrentCityPollutants: React.FC = () => {
  const [pollutants, setPollutants] = useState<Pollutant[]>([]);

  useEffect(() => {
    setPollutants(pollutantsData);
  }, []);

  const getDescription = (pollutant: any) => {
    return `${pollutant.name}: ${pollutant.currentValue} / ${pollutant.maxValue} - ${pollutant.description}`;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md text-center">
      <div className="text-gray-800">
        <p className="text-3xl font-bold">Air Pollutant Levels</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {pollutants.map((pollutant, index) => (
          <PollutantBar
            key={index}
            name={pollutant.name}
            maxValue={pollutant.maxValue}
            currentValue={pollutant.currentValue}
            imagePath={pollutant.imagePath}
            description={getDescription(pollutant)}
          />
        ))}
      </div>
    </div>
  );
};

export default CurrentCityPollutants;
