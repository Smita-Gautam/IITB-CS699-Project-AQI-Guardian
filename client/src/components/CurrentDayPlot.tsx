import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
Chart.register(...registerables);

// Sample data for the AQI trend (this would be fetched from your data source)
const initialAQIData = {
  city: "Delhi",
  aqi: [
    50, 55, 60, 70, 80, 90, 85, 75, 65, 60, 55, 50, 45, 55, 60, 65, 70, 75, 80,
    85, 90, 95, 100, 105,
  ],
};

const cityList = [
  {
    name: "Delhi",
    aqi: [
      50, 55, 60, 70, 80, 90, 85, 75, 65, 60, 55, 50, 45, 55, 60, 65, 70, 75,
      80, 85, 90, 95, 100, 105,
    ],
  },
  {
    name: "Mumbai",
    aqi: [
      40, 45, 50, 55, 65, 70, 80, 75, 70, 65, 60, 55, 50, 45, 50, 55, 60, 65,
      70, 75, 80, 85, 90, 95,
    ],
  },
  {
    name: "Bengaluru",
    aqi: [
      30, 35, 40, 45, 50, 55, 60, 65, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25,
      20, 15, 10, 5, 0, 5,
    ],
  },
  {
    name: "Chennai",
    aqi: [
      60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135,
      140, 145, 150, 155, 160, 165, 170, 175,
    ],
  },
  {
    name: "Kolkata",
    aqi: [
      70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145,
      150, 155, 160, 165, 170, 175, 180, 185,
    ],
  },
];

const CurrentDayPlot: React.FC = () => {
  const [selectedCities, setSelectedCities] = useState<{
    [key: string]: boolean;
  }>({
    [initialAQIData.city]: true, // Initially checked city
  });

  const chartRef = useRef<Chart | null>(null); // Create a ref to hold the chart instance

  const handleCheckboxChange = (cityName: string) => {
    setSelectedCities((prev) => ({
      ...prev,
      [cityName]: !prev[cityName],
    }));
  };

  // Prepare the data for the chart
  const chartData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}h`), // Labels for each hour
    datasets: Object.keys(selectedCities).map((city) => ({
      label: city,
      data: cityList.find((c) => c.name === city)?.aqi || [],
      fill: false,
      borderColor: city === initialAQIData.city ? "blue" : "green", // Different color for selected city
      tension: 0.1,
    })),
  };

  useEffect(() => {
    // Create chart instance when component mounts
    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy existing chart if it exists
    }

    // Create new chart instance
    chartRef.current = new Chart("aqiChart", {
      type: "line",
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Time (Hours)",
            },
          },
          y: {
            title: {
              display: true,
              text: "AQI",
            },
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null; // Clear reference
      }
    };
  }, [selectedCities]); // Depend on selectedCities to re-render the chart on change

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">AQI Trend for Today</h2>
      <canvas id="aqiChart" /> {/* Add a canvas element for the chart */}
      {/* Checkbox list for selecting additional cities */}
      <div className="mt-4">
        <h3 className="font-medium">Select Additional Cities:</h3>
        {cityList.map((city) => (
          <div key={city.name}>
            <label>
              <input
                type="checkbox"
                checked={selectedCities[city.name] || false}
                onChange={() => handleCheckboxChange(city.name)}
                disabled={city.name === initialAQIData.city} // Disable checkbox for the initial city
              />
              {city.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentDayPlot;
