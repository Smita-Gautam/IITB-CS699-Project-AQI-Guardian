import React, { useEffect, useState} from 'react';
import Plot from 'react-plotly.js';
import * as d3 from 'd3';

interface RowData {
  date: string;
  City: string;
  aqi: number;
}

interface PlotAqiProps {
    cities: string[]; // constant array of all cities
    selectedCities: string[]; // dynamically selected cities
}


const PlotAQI: React.FC<PlotAqiProps> = ({cities, selectedCities}) => {
  const [data, setData] = useState<any[]>([]); // state to hold chart data
  
  useEffect(() => {
    // fetching CSV and parse it
    d3.csv("https://raw.githubusercontent.com/Smita-Gautam/IITB-CS699-Project-AQI-Guardian/250b3f288562da53faa130181adcead838567388/aqi_data.csv")
        .then((rows) => {
        if (!rows) return;

            // function to extract data
            const unpack = (rows: RowData[], key: keyof RowData) =>
            rows.map((row) => row[key]);

            const filteredData = rows.filter((row) =>
                selectedCities.length ? selectedCities.includes(row.City) : true
            );
        
            // Determine cities to plot: If no cities are selected, use the first city
            const citiesToPlot = selectedCities.length > 0 ? selectedCities : [cities[0]];

            const traces = citiesToPlot.map((city) => {
                const cityData = filteredData.filter((row) => row.City === city);
                return {
                    type: "scatter",
                    mode: "lines",
                    x: unpack(cityData, "date"),
                    y: unpack(cityData, "aqi"),
                    name: city,
                };
            });
            setData(traces);
        // }
      })
      .catch((error) => console.error("Error loading CSV:", error));
  }, [selectedCities]); // rerun the effect when city or date range changes

  const layout = {
    autosize: true,
    title: {
      text: "AQI vs Date",
    },
    xaxis: {
        autorange: true,
        range: ['2015-02-17', '2017-02-16'],
        rangeselector: {buttons: [
            {
              count: 1,
              label: '1m',
              step: 'month',
              stepmode: 'backward'
            },
            {
              count: 6,
              label: '6m',
              step: 'month',
              stepmode: 'backward'
            },
            {
              count: 12,
              label: '1Y',
              step: 'month',
              stepmode: 'backward'
            },
            {step: 'all'}
          ]},
        rangeslider: {range: ['2018-02-17', '2020-02-16']},
        type: 'date'
      },
    yaxis: {
      title: "AQI",
      type: "linear"
    },
  };

  var config = {responsive: true}

  return <Plot  data={data}  layout={layout}  style={{ width: "100%",height: "100%" }}  config={config} />

};

export default PlotAQI;
