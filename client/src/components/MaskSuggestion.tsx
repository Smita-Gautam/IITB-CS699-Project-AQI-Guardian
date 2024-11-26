import React, { useContext } from "react";
import { CityAQIContext } from "../context/CityAQIProvider";

const MaskSuggestion: React.FC = () => {
  const { aqiData, loading, error } = useContext(CityAQIContext);

  if (loading) return <div>Loading mask suggestions...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!aqiData) return <div>No AQI data available</div>;

  const suggestMask = () => {
    const aqi = aqiData.aqi as number;
    let imgSrc = "";
    let text = "";
    if (aqi <= 50) {
      imgSrc = "/assets/images/no-mask.png";
      text = "No mask needed as air quality is good.";
    } else if (aqi <= 100) {
      imgSrc = "/assets/images/surgical-mask.png";
      text =
        "A surgical mask or light disposable mask is recommended due to moderate air pollution.";
    } else if (aqi <= 200) {
      imgSrc = "/assets/images/kn95-mask.png";
      text =
        "A KN95 mask is recommended for protection against unhealthy air quality.";
    } else {
      //if (aqi <= 300) {
      imgSrc = "/assets/images/n95-mask.png";
      text =
        "An N95 mask is strongly recommended due to unhealthy air quality.";
    }
    // else if (aqi <= 500) {
    //   imgSrc = "n99-mask.png";
    //   text =
    //     "An N99 mask or FFP2/FFP3 mask is required for very unhealthy air quality.";
    // } else {
    //   imgSrc = "p100-mask.png";
    //   text =
    //     "A P100 respirator or industrial-grade mask is necessary due to hazardous air quality.";
    // }
    return { imgSrc, text };
  };

  const { imgSrc, text } = suggestMask();
  console.log(imgSrc);
  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded bg-gray-50 shadow-md">
      <h2 className="font-bold text-xl">Recommended Mask</h2>
      <img
        src={imgSrc}
        alt="Recommended Mask"
        className="w-full h-auto object-contain"
      />
      <p className="text-gray-800 text-lg">{text}</p>
    </div>
  );
};

export default MaskSuggestion;
