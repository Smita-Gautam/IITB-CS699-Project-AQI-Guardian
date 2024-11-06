import CurrentCityPollutants from "../components/CurrentCityPollutants";
import CurrentCityAQI from "../components/CurrentCityAQI";
import CurrentDayPlot from "../components/CurrentDayPlot";
import MetroAQIPanel from "../components/MetroAQIPanel";

const HomePage: React.FC = () => {
  return (
    <div className="flex w-full p-4 bg-gradient-to-r from-blue-100 to-blue-150">
      {/* Main Content Area */}
      {/* <div className="flex-1 grid gap-4 p-4 border border-blue-500 bg-blue-50"> */}
      <div className="flex-1 grid gap-4 p-4 border">
        {/* Top Section with CityAQI and CurrentDayPlot */}
        <div className="grid gap-4">
          <div className="p-4 border">
            <CurrentCityAQI />
          </div>
          {/* <div className="p-4 border border-green-500 bg-green-50"> */}
          <div className="p-4 border">
            <CurrentCityPollutants />
          </div>
          {/* <div className="p-4 border border-yellow-500 bg-yellow-50"> */}
          <div className="p-4 border">
            <CurrentDayPlot />
          </div>
        </div>
      </div>

      {/* Right Side Panel for MetroAQI */}
      {/* <div className="w-1/4 ml-4 p-4 border border-red-500 bg-red-50"> */}
      <div className="w-1/4 ml-4 p-4 border">
        <MetroAQIPanel />
      </div>
    </div>
  );
};

export default HomePage;
