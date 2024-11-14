import React, { useState } from "react";
import Plot from "react-plotly.js";
import PerfectScrollbar from "react-perfect-scrollbar";
import { debounce } from "lodash";
import aqiData from "../data/aqiData.json";
import "react-perfect-scrollbar/dist/css/styles.css";

const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];

const CurrentDayPlot = () => {
  const [selectedCities, setSelectedCities] = useState(
    new Set([aqiData[1].name])
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleCheckboxChange = (cityName: string) => {
    setSelectedCities((prevSelected) => {
      const updatedSelection = new Set(prevSelected);
      if (cityName === aqiData[1].name) return updatedSelection;
      if (updatedSelection.has(cityName)) {
        updatedSelection.delete(cityName);
      } else {
        updatedSelection.add(cityName);
      }
      return updatedSelection;
    });
  };

  const plotData = Array.from(selectedCities).map((city, index) => {
    const cityData = aqiData.find((c) => c.name === city);
    return {
      x: Array.from({ length: 24 }, (_, i) => `${i}h`),
      y: cityData ? cityData.aqi : [],
      type: "scatter",
      mode: "lines+markers",
      name: city,
      line: { color: colors[index % colors.length] },
    };
  });

  const filteredCityList = aqiData.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    300
  );

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ flex: 1, width: "100%" }}>
        <Plot
          data={plotData}
          layout={{
            title: {
              text: "Hourly AQI",
              x: 0.5,
              xanchor: "center",
              y: 0.95,
              yanchor: "top",
              pad: { t: 10 },
            },
            xaxis: { title: "Time (Hours)" },
            yaxis: { title: "AQI", rangemode: "tozero" },
            margin: { t: 80, b: 40, l: 50, r: 20 },
            showlegend: true,
            legend: {
              orientation: "h",
              y: -0.2,
              x: 0.5,
              xanchor: "center",
            },
          }}
          style={{ width: "100%", height: "500px" }}
          useResizeHandler={true}
        />
      </div>

      <div
        style={{
          width: "200px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9",
        }}
      >
        <div style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
          <input
            type="text"
            placeholder="Search cities"
            onChange={handleSearchChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
        </div>
        <PerfectScrollbar style={{ maxHeight: "440px", padding: "10px" }}>
          {filteredCityList.map((city) => (
            <div key={city.name} style={{ marginBottom: "5px" }}>
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={selectedCities.has(city.name)}
                  onChange={() => handleCheckboxChange(city.name)}
                  disabled={city.name === aqiData[1].name}
                  style={{
                    accentColor:
                      colors[
                        aqiData.findIndex((c) => c.name === city.name) %
                          colors.length
                      ],
                    marginRight: "8px",
                  }}
                />
                <span
                  style={{
                    fontWeight:
                      city.name === aqiData[1].name ? "bold" : "normal",
                    color: city.name === aqiData[1].name ? "#555" : "#333",
                  }}
                >
                  {city.name}
                </span>
              </label>
            </div>
          ))}
        </PerfectScrollbar>
      </div>
    </div>
  );
};

export default CurrentDayPlot;
