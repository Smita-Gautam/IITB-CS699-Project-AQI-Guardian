import axios from "axios";

export const fetchHourlyAQI = async (
  lat: number,
  lon: number,

): Promise<any> => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:5000/api/hourly-aqi",
      {
        params: { lat, lon },
      }
    );
    console.log(response.data)
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || error.message || "Unknown error";
    throw new Error(errorMessage);
  }
};
