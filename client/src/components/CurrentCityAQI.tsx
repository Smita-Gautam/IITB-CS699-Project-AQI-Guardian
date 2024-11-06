const CurrentCityAQI = () => {
  return (
    <div className="bg-[#f5f5e6] rounded-lg shadow-lg p-6 font-sans">
      {/* Header */}
      <div className="text-gray-800">
        <h2 className="text-xl font-bold">
          Powai Air Quality Index (AQI) | Mumbai
        </h2>
        <p className="text-sm text-gray-600">
          Real-time PM2.5, PM10 air pollution in
        </p>
      </div>

      {/* Content */}
      <div className="flex items-center justify-between mt-6">
        {/* Status Section */}
        <div className="text-center">
          <span className="bg-[#cddc39] text-white text-xs font-semibold rounded-full px-3 py-1 inline-block">
            Moderate
          </span>
          <p className="text-xs text-gray-500 mt-2">
            Last Updated: 06 Nov 2024, 07:00pm
          </p>
        </div>

        {/* AQI Value */}
        <div className="text-center">
          <span className="text-5xl font-bold text-[#cddc39]">95</span>
          <p className="text-sm text-gray-600">(AQI-US)</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentCityAQI;
