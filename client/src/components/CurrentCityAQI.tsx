import React, { useState, useEffect, useContext } from "react";
import CurrentCityPollutants from "./CurrentCityPollutants";
import { fetchAQI, AQIResponse } from "../api/aqi";
import { CityContext } from "../context/CityProvider";

const CurrentCityAQI: React.FC = () => {
  const { selectedCity } = useContext(CityContext);
  const [aqiData, setAqiData] = useState<AQIResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCity) {
        try {
          const data = await fetchAQI(
            parseFloat(selectedCity.lat),
            parseFloat(selectedCity.lon)
          );
          setAqiData(data);
        } catch (error) {
          console.error("Error fetching AQI data:", error);
          setAqiData(null);
        }
      }
    };

    fetchData();
  }, [selectedCity]);

  if (!selectedCity) {
    return <div>Loading location...</div>;
  }

  if (!aqiData) {
    return <div>Loading AQI data...</div>;
  }

  return (
    <div>
      <div className="border-4 mb-3 text-center rounded-lg overflow-hidden w-full mx-auto">
        <div
          className="card-body overview-pane flex flex-col justify-center items-center text-gray-900 h-80 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url('/assets/images/AQIBanner.png')",
            backgroundSize: "contain",
          }}
        >
          <h4 className="font-bold text-3xl">
            Air Quality Index (AQI) for {aqiData.location}
          </h4>
          <h1 className="text-6xl font-bold">{aqiData.aqi || "N/A"}</h1>
        </div>
      </div>

      {/* Pass AQI data to CurrentCityPollutants */}
      <CurrentCityPollutants aqiData={aqiData} />
    </div>
  );
};

export default CurrentCityAQI;
