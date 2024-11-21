import axios from "axios";

export interface AQIResponse {
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

export const fetchAQI = async (
  lat: number,
  lon: number
): Promise<AQIResponse> => {
  try {
    const response = await axios.get<AQIResponse>(
      "http://127.0.0.1:5000/api/aqi",
      {
        params: { lat, lon },
      }
    );
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || error.message || "Unknown error";
    throw new Error(errorMessage);
  }
};
