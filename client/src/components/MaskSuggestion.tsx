import React, { useContext, useEffect, useState } from "react";
import { CityAQIContext } from "../context/CityAQIProvider";

const MaskSuggestion: React.FC = () => {
  const { aqiData } = useContext(CityAQIContext);
  const [amazonResults, setAmazonResults] = useState<any[]>([]);
  const [loadingAmazon, setLoadingAmazon] = useState(false);

  // if (loading) return <div>Loading mask suggestions...</div>;
  // if (error) return <div>Error: {error}</div>;
  // if (!aqiData) return <div>No AQI data available</div>;

  const suggestMask = () => {
    const aqi = aqiData?.aqi as number;
    let imgSrc = "";
    let text = "";
    let maskName = "";
    let needMask = true;

    if (aqi <= 50) {
      imgSrc = "/assets/images/no-mask.png";
      text = "No mask needed as air quality is good.";
      maskName = "No Mask";
      needMask = false;
    } else if (aqi <= 100) {
      imgSrc = "/assets/images/surgical-mask.png";
      text =
        "A surgical mask or light disposable mask is recommended due to moderate air pollution.";
      maskName = "Surgical Mask";
    } else if (aqi <= 200) {
      imgSrc = "/assets/images/kn95-mask.png";
      text =
        "A KN95 mask is recommended for protection against unhealthy air quality.";
      maskName = "KN95 Mask";
    } else {
      imgSrc = "/assets/images/n95-mask.png";
      text =
        "An N95 mask is strongly recommended due to unhealthy air quality.";
      maskName = "N95 Mask";
    }

    return { imgSrc, text, maskName, needMask };
  };

  const { imgSrc, text, maskName, needMask } = suggestMask();

  // Fetch Amazon search results
  useEffect(() => {
    const fetchAmazonResults = async () => {
      setLoadingAmazon(true);
      try {
        const response = await fetch(
          `http://localhost:5000/scrape?mask_name=${maskName}`
        );
        const data = await response.json();
        setAmazonResults(data);
      } catch (error) {
        console.error("Error fetching Amazon results:", error);
      } finally {
        setLoadingAmazon(false);
      }
    };
    if (needMask) fetchAmazonResults();
  }, [maskName]);

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded bg-gray-50 shadow-md">
      <h2 className="font-bold text-xl">Recommended Mask</h2>
      <img
        src={imgSrc}
        alt="Recommended Mask"
        className="w-full h-auto object-contain"
      />
      <p className="text-gray-800 text-lg">{text}</p>
      {needMask && (
        <div className="mt-4 w-full">
          {loadingAmazon ? (
            <div>Loading Amazon results...</div>
          ) : (
            <div className="mt-4 w-full">
              <h3 className="text-lg font-semibold">Top 3 Amazon Products</h3>
              {amazonResults.length > 0 ? (
                <ul>
                  {amazonResults.map((product, index) => (
                    <li key={index} className="border-b py-2">
                      <div className="flex flex-col">
                        <a
                          href={product.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <strong>{product.title}</strong>
                        </a>
                        {/* <span className="text-gray-700">{product.title}</span> */}
                        <span className="text-green-600 font-medium">
                          {product.price}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div>No products found.</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MaskSuggestion;
