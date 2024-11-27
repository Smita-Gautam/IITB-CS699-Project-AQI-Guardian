import React, { useContext, useEffect, useState } from "react";
import Plot from "react-plotly.js";
import PerfectScrollbar from "react-perfect-scrollbar";
import { debounce } from "lodash";
import { CityAQIContext } from "../context/CityAQIProvider";
import { fetchHourlyAQI } from "../api/hourly_aqi";
import "react-perfect-scrollbar/dist/css/styles.css";
import cities from "../data/cities.json";

interface City {
  city_id: string;
  city_name: string;
  state_code: string;
  country_code: string;
  country_full: string;
  lat: string;
  lon: string;
}

const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];

const CurrentDayPlot: React.FC = () => {
  const { selectedCity } = useContext(CityAQIContext);
  const [availableCities, setAvailableCities] = useState<City[]>(
    cities.sort((a, b) => a.city_name.localeCompare(b.city_name))
  );
  const [selectedCities, setSelectedCities] = useState(new Set<string>());
  const [cityDataMap, setCityDataMap] = useState<Map<string, number[]>>(
    new Map()
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // to ensure the current city is always selected
  useEffect(() => {
    if (selectedCity) {
      setSelectedCities((prev) => new Set(prev).add(selectedCity.city_name));
    }
  }, [selectedCity]);

  const fetchCityData = async (cityName: string, lat: string, lon: string) => {
    setLoading(true);
    try {
      const response = await fetchHourlyAQI(parseFloat(lat), parseFloat(lon));
      const hourlyData = response;
      setCityDataMap((prev) => new Map(prev).set(cityName, hourlyData));
    } catch (error) {
      console.error(`Failed to fetch AQI data for ${cityName}:`, error);
    } finally {
      setLoading(false);
    }
  };

  // fetch AQI data for new cities added to the selection
  useEffect(() => {
    const fetchSelectedCitiesData = async () => {
      for (let city of selectedCities) {
        console.log("in fetchselectdata", city, selectedCities);
        if (!cityDataMap.has(city)) {
          const cityDetails =
            availableCities.find((c) => c.city_name === city) || {};
          await fetchCityData(
            cityDetails.city_name || "",
            cityDetails.lat || "0",
            cityDetails.lon || "0"
          );
        }
      }
    };

    fetchSelectedCitiesData();
  }, [selectedCities]);

  const handleCheckboxChange = (cityName: string) => {
    setSelectedCities((prev) => {
      const updatedSelection = new Set(prev);
      if (cityName === selectedCity?.city_name) return updatedSelection; // prevent deselection of current city
      if (updatedSelection.has(cityName)) {
        updatedSelection.delete(cityName);
      } else {
        updatedSelection.add(cityName);
      }
      return updatedSelection;
    });
  };

  const handleSearchChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    300
  );

  const filteredCities = searchTerm
    ? availableCities.filter((city) =>
        city.city_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : availableCities;

  const sortedCities = filteredCities.sort((a, b) => {
    if (selectedCities.has(a.city_name)) return -1;
    if (selectedCities.has(b.city_name)) return 1;
    return a.city_name.localeCompare(b.city_name);
  });

  const plotData = Array.from(selectedCities).map((city, index) => ({
    x: Array.from({ length: 24 }, (_, i) => `${i}h`),
    y: cityDataMap.get(city) || [],
    type: "scatter",
    mode: "lines+markers",
    name: city,
    line: { color: colors[index % colors.length] },
  }));

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
        {loading && <p>Loading data...</p>}
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
          {sortedCities.map((city) => (
            <div key={city.city_id} style={{ marginBottom: "5px" }}>
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={selectedCities.has(city.city_name)}
                  onChange={() => handleCheckboxChange(city.city_name)}
                  disabled={city.city_name === selectedCity?.city_name}
                  style={{
                    accentColor:
                      colors[
                        Array.from(selectedCities).indexOf(city.city_name) %
                          colors.length
                      ],
                    marginRight: "8px",
                  }}
                />
                <span
                  style={{
                    fontWeight:
                      city.city_name === selectedCity?.city_name
                        ? "bold"
                        : "normal",
                  }}
                >
                  {city.city_name}
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
