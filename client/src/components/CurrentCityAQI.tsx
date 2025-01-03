import React, { useContext } from "react";
import CurrentCityPollutants from "./CurrentCityPollutants";
import { CityAQIContext } from "../context/CityAQIProvider";
import LoadingAnimation from "./LoadingAnimation/LoadingAnimation";

const CurrentCityAQI: React.FC = () => {
  const { selectedCity, aqiData, loading, error } = useContext(CityAQIContext);

  if (!selectedCity || loading || error || !aqiData) {
    return <LoadingAnimation />;
  }

  // if (loading) {
  //   return <LoadingAnimation />;
  // }

  // if (error) {
  //   return <LoadingAnimation />;
  // }

  // if (!aqiData) {
  //   return <LoadingAnimation />;
  // }

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
            Air Quality Index for {aqiData.location}
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
