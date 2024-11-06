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

  return (
    <div className="p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">
        Current Air Quality in Mumbai
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {pollutants.map((pollutant, index) => (
          <PollutantBar
            key={index}
            name={pollutant.name}
            maxValue={pollutant.maxValue}
            currentValue={pollutant.currentValue}
            imagePath={pollutant.imagePath}
          />
        ))}
      </div>
    </div>
  );
};

export default CurrentCityPollutants;
