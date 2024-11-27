import React, { createContext, useState, useEffect, ReactNode } from "react";
import { fetchAQI, AQIResponse } from "../api/aqi";

interface CityAQIContextProps {
  selectedCity: CityData | null;
  setSelectedCity: (city: CityData) => void;
  aqiData: AQIResponse | null;
  loading: boolean;
  error: string | null;
}

interface CityData {
  city_name: string;
  lat: string;
  lon: string;
}

export const CityAQIContext = createContext<CityAQIContextProps>({
  selectedCity: null,
  setSelectedCity: () => {},
  aqiData: null,
  loading: true,
  error: null,
});

export const CityAQIProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [aqiData, setAqiData] = useState<AQIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Use `navigator.geolocation` to set the default location on app start
  useEffect(() => {
    const getDefaultLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setSelectedCity({
              city_name: "Current Location",
              lat: latitude.toString(),
              lon: longitude.toString(),
            });
          },
          (error) => {
            console.error("Geolocation Error:", error);
          }
        );
      } else {
        console.warn("Geolocation is not supported by your browser.");
      }
    };
    getDefaultLocation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCity) return;

      setLoading(true);
      setError(null);

      try {
        await delay(1000);
        const data = await fetchAQI(
          parseFloat(selectedCity.lat),
          parseFloat(selectedCity.lon)
        );
        setAqiData(data);
      } catch (err) {
        setError("Failed to fetch AQI data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCity]);

  return (
    <CityAQIContext.Provider
      value={{ selectedCity, setSelectedCity, aqiData, loading, error }}
    >
      {children}
    </CityAQIContext.Provider>
  );
};
