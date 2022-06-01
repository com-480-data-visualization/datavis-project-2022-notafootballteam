import { useEffect, useState } from 'react';
import useInterval from './Utils/useInterval';
import { csv } from "d3";
import './App.css';

// ------------------------------------------ Components ------------------------------------------

import Background from './Components/Background/Background';
import TimeSlider from './Components/TimeSlider/TimeSlider';
import Page1 from './Components/Pages/Page1';
import Page2 from './Components/Pages/Page2';
import Page3 from './Components/Pages/Page3';
import Page4 from './Components/Pages/Page4';

// ------------------------------------------ Data ------------------------------------------

import {
  data_2005, data_2006, data_2007, data_2008, data_2009,
  data_2010, data_2011, data_2012, data_2013, data_2014,
  data_2015, data_2016, data_2017, data_2018, data_2019,
  data_2020, data_2021
} from './Assets/data';

import {
  top_2005, top_2006, top_2007, top_2008, top_2009,
  top_2010, top_2011, top_2012, top_2013, top_2014,
  top_2015, top_2016, top_2017, top_2018, top_2019,
  top_2020, top_2021
} from './Assets/data';

import {
  map_data_2005, map_data_2006, map_data_2007, map_data_2008, map_data_2009,
  map_data_2010, map_data_2011, map_data_2012, map_data_2013, map_data_2014,
  map_data_2015, map_data_2016, map_data_2017, map_data_2018, map_data_2019,
  map_data_2020, map_data_2021
} from './Assets/data';

export default function App() {

  const [loading, setLoading] = useState(true);

  const [CSVData] = useState({
    2005: data_2005,
    2006: data_2006,
    2007: data_2007,
    2008: data_2008,
    2009: data_2009,
    2010: data_2010,
    2011: data_2011,
    2012: data_2012,
    2013: data_2013,
    2014: data_2014,
    2015: data_2015,
    2016: data_2016,
    2017: data_2017,
    2018: data_2018,
    2019: data_2019,
    2020: data_2020,
    2021: data_2021,
  });

  const [CSVDataTop] = useState({
    2005: top_2005,
    2006: top_2006,
    2007: top_2007,
    2008: top_2008,
    2009: top_2009,
    2010: top_2010,
    2011: top_2011,
    2012: top_2012,
    2013: top_2013,
    2014: top_2014,
    2015: top_2015,
    2016: top_2016,
    2017: top_2017,
    2018: top_2018,
    2019: top_2019,
    2020: top_2020,
    2021: top_2021,
  });

  const [MapData] = useState({
    2005: map_data_2005,
    2006: map_data_2006,
    2007: map_data_2007,
    2008: map_data_2008,
    2009: map_data_2009,
    2010: map_data_2010,
    2011: map_data_2011,
    2012: map_data_2012,
    2013: map_data_2013,
    2014: map_data_2014,
    2015: map_data_2015,
    2016: map_data_2016,
    2017: map_data_2017,
    2018: map_data_2018,
    2019: map_data_2019,
    2020: map_data_2020,
    2021: map_data_2021,
  });

  const [selectedYear, setSelectedYear] = useState(2021);
  const [selectedCountry, setSelectedCountry] = useState(null); // I checked, null == 0 is false in JS, so we're good

  const [playTime, setPlayTime] = useState(false);

  const [top10HappiestData, settop10HappiestData] = useState([]);

  // Property
  const [property, setProperty] = useState("Life Ladder");

  // Reload the year's data when selected year changes
  useEffect(() => {
    csv(CSVDataTop[selectedYear]).then((data) => {
      settop10HappiestData(data);
      setLoading(false);
    });
  }, [selectedYear]);

  // Update the year each 8 seconds
  useInterval(() => {
    if (playTime) {
      if (selectedYear === 2021) {
        setSelectedYear(2005);
      } else {
        setSelectedYear(selectedYear + 1);
      }
    }
  }, 8000);

  return (
    <div className="App">

      <Background />
      <TimeSlider currYear={selectedYear} handleSelect={setSelectedYear} playTime={playTime} handleButtonClick={setPlayTime} />

      <div className="box-container">

        <Page1 selectedYear={selectedYear}
          playTime={playTime}
          setPlayTime={setPlayTime}
          loading={loading}
          top10HappiestData={top10HappiestData} />

        <Page2 mapData={MapData[selectedYear]}
          selectedYear={selectedYear}
          property={property}
          setProperty={setProperty}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          playTime={playTime}
          setPlayTime={setPlayTime} />

        <Page3 data={CSVData[selectedYear]}
          selectedYear={selectedYear}
          selectedCountry={selectedCountry}
          property={property} />

        <Page4 />

      </div>
    </div>
  );
};

// {/* <div className="container">
      //   <div className="page page-1">
      //     <h1 className="page-1-title">Which countries are the happiest?</h1>
      //     <div className="page-1-chart"> {!loading && <AnimatedBarChart data={top10HappiestData} />} {loading && <div>Loading...</div>}</div>
      //     <button onClick={() => setStart(!start)} >
      //       {start ? "Pause" : "Start"}
      //     </button>
      //     <h1 className="page-1-text">{2005 + (iteration - 1) % CSVData.length}</h1>
      //   </div>
      //   <div className="page page-2">
      //     <div className="page-2-title">Explore</div>
      //     <div className="page-2-chart">
      //       <WorldMap data={map_data_2021} property={property} />
      //       <h2>Select property to highlight</h2>
      //       <select value={property} onChange={event => setProperty(event.target.value)}>
      //         <option value="pop_est" color="red">Population</option>
      //         <option value="Life Ladder">Happiness</option>
      //         <option value="Log GDP per capita">GDP</option>
      //         <option value="Social support">Social support</option>
      //         <option value="Healthy life expectancy at birth">Life expectancy</option>
      //         <option value="Freedom to make life choices">Freedom to make life choices</option>
      //         <option value="Generosity">Generosity</option>
      //         <option value="Perceptions of corruption">Perceptions of corruption</option>
      //         <option value="Alcohol consumption">Alcohol consumption</option>
      //         <option value="Happiness/GDP cap.">Happiness/GDP cap.</option>
      //       </select>
      //     </div>
      //     <div className="page-2-text">By clickling on a country on the map above, the user will go down to the next page and view stats about the country.</div>
      //   </div>
      //   <div className="page page-3">
      //     <div className="page-3-top-left"><img src={oh_dist} /></div>
      //     <div className="page-3-top-right"><img src={happy_dist} /></div>
      //     <div className="page-3-bottom-left"><img src={scatter} /></div>
      //     <div className="page-3-bottom-right"><img src={radar} /></div>
      //   </div>
      //   <div className="page page-4">Fun Animation</div>
      // </div> */}