import React, { createContext, useState, useEffect, ReactNode } from "react";

interface CityContextProps {
  selectedCity: CityData | null;
  setSelectedCity: (city: CityData) => void;
}

interface CityData {
  city_name: string;
  lat: string;
  lon: string;
}

export const CityContext = createContext<CityContextProps>({
  selectedCity: null,
  setSelectedCity: () => {},
});

export const CityProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);

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

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};
