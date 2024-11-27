import { useEffect, useState } from "react";
import "./LoadingAnimation.css";

const LoadingAnimation = () => {
  const [bars, setBars] = useState([...Array(30).keys()]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBars((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-container bg-white p-4">
      {/* Bars in the background */}
      <div className="bars">
        {bars.map((_, index) => (
          <div className="bar bg-blue-100" key={index}></div>
        ))}
      </div>

      {/* Image circle overlay */}
      <div className="image-circle">
        <div className="image-wrapper">
          <img
            src="/assets/images/people.jpg"
            alt="Loader"
            className="loader-image"
          />
          <img
            src="/assets/images/people.jpg"
            alt="Loader Duplicate"
            className="loader-image"
          />
        </div>
      </div>

      {/* Text at the bottom */}
      <div className="text-container">
        <h2 className="text-2xl">Just a moment...</h2>
        <h2 className="text-2xl">We're Fetching Your Air Quality Exposure</h2>
      </div>
    </div>
  );
};

export default LoadingAnimation;
