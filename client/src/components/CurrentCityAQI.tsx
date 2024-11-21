import React, { useState, useEffect } from "react";
import CurrentCityPollutants from "./CurrentCityPollutants";
import { fetchAQI, AQIResponse } from "../api/aqi";

const CurrentCityAQI = () => {
  const [aqiData, setAqiData] = useState<AQIResponse | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
            setLocationError(null);
          },
          (err) => {
            setLocationError("Unable to retrieve your location.");
            console.error("Geolocation Error:", err);
          }
        );
      } else {
        setLocationError("Geolocation is not supported by your browser.");
      }
    };

    getCurrentLocation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (lat !== null && lon !== null) {
        try {
          const data = await fetchAQI(lat, lon);
          setAqiData(data);
        } catch (error) {
          console.error("Error fetching AQI data:", error);
          setAqiData(null);
        }
      }
    };

    fetchData();
  }, [lat, lon]);

  if (locationError) {
    return <div>Error: {locationError}</div>;
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
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url('/assets/images/AQIBanner.png')`,
            backgroundSize: "contain",
          }}
        >
          <h4 className="font-bold text-3xl">
            Air Quality Index (AQI) for {aqiData.location || "Unknown Location"}
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
