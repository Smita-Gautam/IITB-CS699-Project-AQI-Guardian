import React from "react";

// Random headings for sections
const headings = [
  "Air Quality Over Time",
  "Historical Pollution Trends",
  "AQI vs Health Cases",
  "Pollution Sources Analysis",
  "Air Quality and Temperature Comparison",
  "City-Wide Pollution Patterns",
  "Annual AQI Summary",
];

const VisualisationPage: React.FC = () => {
  return (
    <div className="w-full p-4 bg-gray-100">
      {/* First Row with 2 Sections */}
      <div className="flex w-full gap-4 mb-6">
        <div className="flex-1 bg-blue-200 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">
            {headings[Math.floor(Math.random() * headings.length)]}
          </h3>
          <div className="h-60 bg-gray-300 rounded-lg mt-4">
            [Visualization Plot Here]
          </div>
        </div>
        <div className="flex-1 bg-green-200 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">
            {headings[Math.floor(Math.random() * headings.length)]}
          </h3>
          <div className="h-60 bg-gray-300 rounded-lg mt-4">
            [Visualization Plot Here]
          </div>
        </div>
      </div>

      {/* Second Row with 1 Section */}
      <div className="flex w-full gap-4 mb-6">
        <div className="flex-1 bg-yellow-200 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">
            {headings[Math.floor(Math.random() * headings.length)]}
          </h3>
          <div className="h-60 bg-gray-300 rounded-lg mt-4">
            [Visualization Plot Here]
          </div>
        </div>
      </div>

      {/* Third Row with 3 Sections */}
      <div className="flex w-full gap-4 mb-6">
        <div className="flex-1 bg-purple-200 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">
            {headings[Math.floor(Math.random() * headings.length)]}
          </h3>
          <div className="h-60 bg-gray-300 rounded-lg mt-4">
            [Visualization Plot Here]
          </div>
        </div>
        <div className="flex-1 bg-red-200 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">
            {headings[Math.floor(Math.random() * headings.length)]}
          </h3>
          <div className="h-60 bg-gray-300 rounded-lg mt-4">
            [Visualization Plot Here]
          </div>
        </div>
        <div className="flex-1 bg-teal-200 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">
            {headings[Math.floor(Math.random() * headings.length)]}
          </h3>
          <div className="h-60 bg-gray-300 rounded-lg mt-4">
            [Visualization Plot Here]
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualisationPage;
