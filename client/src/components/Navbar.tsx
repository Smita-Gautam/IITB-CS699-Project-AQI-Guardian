import React, { useState, useEffect, useRef, useContext } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CityAQIContext } from "../context/CityAQIProvider";
import cityData from "../data/cities.json";

const Navbar: React.FC = () => {
  const { setSelectedCity } = useContext(CityAQIContext);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCities, setFilteredCities] = useState<typeof cityData>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setFilteredCities([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredCities(
        cityData.filter((city) =>
          city.city_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredCities([]);
    }
  }, [searchQuery]);

  const handleCitySelect = (city: (typeof cityData)[0]) => {
    setSelectedCity({
      city_name: city.city_name,
      lat: city.lat,
      lon: city.lon,
    });
    setSearchQuery(city.city_name);
    setFilteredCities([]);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white pr-8 pl-8 pt-4 pb-4 text-black shadow-lg flex justify-between items-center z-50">
      <h1 className="text-xl font-bold">AQI Guardian</h1>

      <div className="flex justify-center space-x-8 flex-grow">
        <Link to="/" className="text-gray-700">
          City AQI
        </Link>
        <Link to="/visualisations" className="text-gray-700">
          AQI Visualizations
        </Link>
      </div>

      <div className="flex items-center relative w-full max-w-xs ml-auto">
        <FaSearch className="absolute left-3 text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a city"
          className="border border-gray-300 rounded p-2 pl-8 pr-10 w-full"
        />
        <FaMapMarkerAlt className="absolute right-3 text-gray-500" />

        {searchQuery.length > 0 && filteredCities.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute top-full mt-1 bg-white border border-gray-300 rounded shadow-lg w-full max-h-40 overflow-y-auto z-10"
          >
            {filteredCities.map((city) => (
              <div
                key={city.city_id}
                onClick={() => handleCitySelect(city)}
                className="p-2 hover:bg-blue-100 cursor-pointer"
              >
                {city.city_name}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
