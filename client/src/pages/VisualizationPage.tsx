import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { debounce } from "lodash";
import "react-perfect-scrollbar/dist/css/styles.css";
import PlotAQI from "../components/PlotAQI";
import PlotCO from "../components/PlotCO";
import PlotSO2 from "../components/PlotSO2";
import PlotNO2 from "../components/PlotNO2";
import PlotO3 from "../components/PlotO3";
import PlotPM25 from "../components/PlotPM25";
import PlotPM10 from "../components/PlotPM10";

const cities:string[] = ["Bengaluru","Hyderabad","Chennai","Mumbai","Lucknow","Kolkata","Guwahati","Delhi","Chandigarh","Amritsar","Ahmedabad","Thiruvananthapuram"];

const VisualizationPage: React.FC = () => {
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [searchTerm] = useState("");
    const [rowHeight] = useState<number>(450); // default height for the row
    
    // handling checkbox change
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const city = event.target.value;
        if (event.target.checked) {
          // add city to selectedCities
          setSelectedCities((prev) => [...prev, city]);
        } else {
          // remove city when unselected
          setSelectedCities((prev) => prev.filter((c) => c !== city));
        }
    };
    
    const filteredCityList = cities.filter((city) =>
        city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex w-full p-4 bg-gray-100">
            {/* first column (Sticky) */}
            <div className="w-1/5 pt-4 pb-4 pl-1 sticky top-0 h-screen">
                <PerfectScrollbar style={{ maxHeight: "800" }}>
                    {filteredCityList.map((city, index) => (
                        <div key={city} style={{ marginBottom: "15px" }}>
                            <label style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    type="checkbox"
                                    value={city}
                                    checked={index === 0 || selectedCities.includes(city)}
                                    onChange={handleCheckboxChange}
                                    style={{
                                        marginRight: "8px",
                                    }}
                                />
                                <span
                                style={{
                                    fontWeight:"bold",
                                    color: "#333",
                                }}
                                >
                                {city}
                                </span>
                            </label>
                        </div>
                    ))}
                </PerfectScrollbar>                
            </div>
            
            
            {/* second column (Scrollable) */}
            <div className="flex-1 w-4/5 grid gap-4 h-screen overflow-y-auto">
                <div className="grid gap-4">
                    {/* AQI */}
                    <div className="h-auto flex-1 bg-blue-200 p-4 rounded-lg shadow-md">
                        <h3 className="flex items-center justify-center text-xl font-semibold text-gray-800"> AQI </h3>
                        <div 
                            className="bg-gray-300 rounded-lg mt-4"
                            style={{  height: `${rowHeight}px` }}
                        >
                            {/* pass selected cities data to child component */}
                            <PlotAQI cities={cities} selectedCities={selectedCities} />
                        </div>
                    </div>

                    {/* PM2.5 */}
                    <div className=" h-auto flex-1 bg-blue-200 p-4 rounded-lg shadow-md">
                        <h3 className="flex items-center justify-center text-xl font-semibold text-gray-800"> PM2.5 (ug/m3) </h3>
                        <div 
                            className="bg-gray-300 rounded-lg mt-4"
                            style={{  height: `${rowHeight}px` }}
                        >
                            <PlotPM25 cities={cities} selectedCities={selectedCities} />
                        </div>
                    </div>

                    {/* PM10 */}
                    <div className=" h-auto flex-1 bg-blue-200 p-4 rounded-lg shadow-md">
                        <h3 className="flex items-center justify-center text-xl font-semibold text-gray-800">PM10 (ug/m3) </h3>
                        <div 
                            className="bg-gray-300 rounded-lg mt-4"
                            style={{  height: `${rowHeight}px` }}
                        >
                            <PlotPM10 cities={cities} selectedCities={selectedCities} />
                        </div>
                    </div>

                    {/* CO */}
                    <div className=" h-auto flex-1 bg-blue-200 p-4 rounded-lg shadow-md">
                        <h3 className="flex items-center justify-center text-xl font-semibold text-gray-800"> CO (mg/m3) </h3>
                        <div 
                            className="bg-gray-300 rounded-lg mt-4"
                            style={{  height: `${rowHeight}px` }}
                        >
                            <PlotCO cities={cities} selectedCities={selectedCities} />
                        </div>
                    </div>


                    {/* SO2 */}
                    <div className=" h-auto flex-1 bg-blue-200 p-4 rounded-lg shadow-md">
                        <h3 className="flex items-center justify-center text-xl font-semibold text-gray-800">SO2 (ug/m3) </h3>
                        <div 
                            className="bg-gray-300 rounded-lg mt-4"
                            style={{  height: `${rowHeight}px` }}
                        >
                            <PlotSO2 cities={cities} selectedCities={selectedCities}/>
                        </div>
                    </div>


                    {/* O3 */}
                    <div className=" h-auto flex-1 bg-blue-200 p-4 rounded-lg shadow-md">
                        <h3 className="flex items-center justify-center text-xl font-semibold text-gray-800"> Ozone (ug/m3) </h3>
                        <div 
                            className="bg-gray-300 rounded-lg mt-4"
                            style={{  height: `${rowHeight}px` }}
                        >
                            <PlotO3 cities={cities} selectedCities={selectedCities} />
                        </div>
                    </div>


                    {/* NO2 */}
                    <div className=" h-auto flex-1 bg-blue-200 p-4 rounded-lg shadow-md">
                        <h3 className="flex items-center justify-center text-xl font-semibold text-gray-800"> NO2 (ug/m3) </h3>
                        <div 
                            className="bg-gray-300 rounded-lg mt-4"
                            style={{  height: `${rowHeight}px` }}
                        >
                            <PlotNO2 cities={cities} selectedCities={selectedCities} />
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    );
  };
  
  export default VisualizationPage;