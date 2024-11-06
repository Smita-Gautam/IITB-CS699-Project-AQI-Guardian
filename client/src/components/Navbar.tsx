import React, { useState, useEffect } from "react";

// Mock import - replace with actual path if needed
import cities from "../data/cities.json"; // Update with actual path

const Navbar: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCities, setFilteredCities] = useState<{ name: string }[]>([]);

  useEffect(() => {
    // Filter cities based on the search query
    if (searchQuery) {
      setFilteredCities(
        cities.filter((city) =>
          city.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredCities(cities); // Show all cities when search is empty
    }
  }, [searchQuery]);

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
    setSearchQuery(cityName); // Display selected city in search box
    // Logic for updating city AQI data could be added here
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white p-4 text-black shadow-lg flex justify-between items-center z-50">
      <h1 className="text-xl font-bold">AQI Guardian</h1>
      <div className="flex items-center relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a city"
          className="border border-gray-300 rounded p-2 w-48"
        />
        {searchQuery && (
          <div className="absolute top-full mt-1 bg-white border border-gray-300 rounded shadow-lg w-48 max-h-40 overflow-y-auto z-10">
            {filteredCities.map((city) => (
              <div
                key={city.name}
                onClick={() => handleCitySelect(city.name)}
                className="p-2 hover:bg-blue-100 cursor-pointer"
              >
                {city.name}
              </div>
            ))}
            {filteredCities.length === 0 && (
              <div className="p-2 text-gray-500">No results found</div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
