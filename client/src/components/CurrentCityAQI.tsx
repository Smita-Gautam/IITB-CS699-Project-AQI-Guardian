const CurrentCityAQI = () => {
  return (
    <div className="border-4 mb-3 text-center rounded-lg overflow-hidden w-full mx-auto">
      <div
        className="card-body overview-pane flex flex-col justify-center items-center text-gray-900 h-80 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url('/assets/images/AQIBanner.png')`,
          backgroundSize: "contain",
        }}
      >
        <h4 className="font-bold text-3xl">
          Air Quality Index (AQI) for Powai
        </h4>
        <p className="text-lg mb-2">Last Updated: 06 Nov 2024, 07:00pm</p>
        <h1 className="text-6xl font-bold">95</h1>
      </div>
    </div>
  );
};

export default CurrentCityAQI;
