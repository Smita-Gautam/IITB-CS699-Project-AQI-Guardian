// import CurrentCityPollutants from "../components/CurrentCityPollutants";
import CurrentCityAQI from "../components/CurrentCityAQI";
import CurrentDayPlot from "../components/CurrentDayPlot";
import MetroAQIPanel from "../components/MetroAQIPanel";
import InformationPanel from "../components/InformationPanel";
import MaskSuggestion from "../components/MaskSuggestion";

const HomePage: React.FC = () => {
  return (
    <div className="flex w-full p-4 bg-gray-100">
      <div className="flex-1 w-3/4 grid gap-4">
        <div className="grid gap-4">
          <div className="pt-4">
            <CurrentCityAQI />
          </div>
          <div className="">
            <CurrentDayPlot />
          </div>
        </div>

        <div className="grid gap-4 pt-4">
          <InformationPanel />
        </div>
      </div>

      <div className="w-1/4 pt-4 pb-4 pl-4">
        <MetroAQIPanel />
        <MaskSuggestion />
      </div>
    </div>
  );
};

export default HomePage;
