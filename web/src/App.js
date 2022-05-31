import { useEffect, useState } from 'react';
import './App.css';
import { csv } from "d3";
import oh_dist from './Assets/images/oh_dist.png';
import happy_dist from './Assets//images/happy_dist.png';
import scatter from './Assets/images/scatter.png';
import radar from './Assets/images/radar.png';
import useInterval from './Utils/useInterval';
import AnimatedBarChart from './Components/BarChart/AnimatedBarChart';
import WorldMap from './Components/WorldMap/WorldMap';
import { map_data_2005, map_data_2021 } from './Assets/data';
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
import Box from './Components/Box/Box';
import Background from './Components/Background/Background';
import TimeSlider from './Components/TimeSlider/TimeSlider';

function App() {
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(true);
  const [CSVData] = useState({
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

  const [selectedCountryID, setSelectedCountryID] = useState(null); // I checked, null == 0 is false in JS, so we're good
  const [selectedYear, setSelectedYear] = useState(2005);
  const [top10HappiestData, settop10HappiestData] = useState([]);

  const [property, setProperty] = useState("Life Ladder");

  // Reload the year's data when selected year changes
  useEffect(() => {
    csv(CSVData[selectedYear]).then((data) => {
      settop10HappiestData(data);
      setLoading(false);
    });
  }, [selectedYear]);

  // Update the year each 8 seconds
  useInterval(() => {
    if (start) {
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
      <div className="box-container">
        <Box id='box-1'>
          <h1 className="page-1-title">Which countries are the happiest?</h1>
          <p className="page-1-text-top-left">{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis interdum ullamcorper. Aenean quis imperdiet nunc. Nulla vitae imperdiet tellus. Suspendisse ut iaculis sem, id viverra tortor. Nullam a urna vitae justo luctus venenatis. Nullam a aliquet arcu. Suspendisse potenti. Sed quis tortor vitae libero molestie sollicitudin eget congue nisl. Aenean convallis a lectus sed dictum. Curabitur diam odio, rutrum ac interdum quis, congue in sem."}</p>
          <div className="did-you-know">
            <p id='did-you-know-text'>Did you know?</p>
            <p>This will contain info about the yellow color.</p>
          </div>
          <div className="page-1-year">{selectedYear}</div>
          <div className="page-1-chart"> {!loading && <AnimatedBarChart data={top10HappiestData} />} {loading && <div>Loading...</div>}</div>
          <button className='page-1-button' onClick={() => setStart(!start)} >
            {start ? "Pause" : "Start"}
          </button>
          <p className="page-1-text-bottom">{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis tempor tellus vitae placerat. Integer cursus nibh ex, a convallis neque venenatis ac. Praesent quam magna, auctor at consectetur bibendum, lobortis at tellus. Donec faucibus eget ligula eu pretium. Nam sed volutpat orci. Nulla turpis odio, posuere et imperdiet id, varius sit amet ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam nec consectetur justo. Vestibulum hendrerit, mauris in mattis pretium, nunc lectus tempor ex, eget vehicula dui dui id nunc. Proin vitae lacinia lectus. Morbi luctus ultricies ligula. Quisque semper augue enim, sit."}</p>
        </Box>
        <Box id='box-2'>
          <WorldMap data={map_data_2005} property={property} />
          <h2>Select property to highlight</h2>
          <select value={property} onChange={event => setProperty(event.target.value)}>
            <option value="Life Ladder">Happiness</option>
            <option value="Log GDP per capita">GDP</option>
            <option value="Alcohol consumption">Alcohol consumption</option>
            <option value="Happiness/GDP cap.">Happiness/GDP cap.</option>
          </select>
        </Box>
        <Box id='box-3'>
          {"Box 3"}
        </Box>
        <Box id='box-4'>
          {"Box 4"}
        </Box>
      </div>
      <TimeSlider currYear={selectedYear} handleSelect={setSelectedYear} />
      {/* Slider component */}

      {/* <div className="container">
        <div className="page page-1">
          <h1 className="page-1-title">Which countries are the happiest?</h1>
          <div className="page-1-chart"> {!loading && <AnimatedBarChart data={top10HappiestData} />} {loading && <div>Loading...</div>}</div>
          <button onClick={() => setStart(!start)} >
            {start ? "Pause" : "Start"}
          </button>
          <h1 className="page-1-text">{2005 + (iteration - 1) % CSVData.length}</h1>
        </div>
        <div className="page page-2">
          <div className="page-2-title">Explore</div>
          <div className="page-2-chart">
            <WorldMap data={map_data_2021} property={property} />
            <h2>Select property to highlight</h2>
            <select value={property} onChange={event => setProperty(event.target.value)}>
              <option value="pop_est" color="red">Population</option>
              <option value="Life Ladder">Happiness</option>
              <option value="Log GDP per capita">GDP</option>
              <option value="Social support">Social support</option>
              <option value="Healthy life expectancy at birth">Life expectancy</option>
              <option value="Freedom to make life choices">Freedom to make life choices</option>
              <option value="Generosity">Generosity</option>
              <option value="Perceptions of corruption">Perceptions of corruption</option>
              <option value="Alcohol consumption">Alcohol consumption</option>
              <option value="Happiness/GDP cap.">Happiness/GDP cap.</option>
            </select>
          </div>
          <div className="page-2-text">By clickling on a country on the map above, the user will go down to the next page and view stats about the country.</div>
        </div>
        <div className="page page-3">
          <div className="page-3-top-left"><img src={oh_dist} /></div>
          <div className="page-3-top-right"><img src={happy_dist} /></div>
          <div className="page-3-bottom-left"><img src={scatter} /></div>
          <div className="page-3-bottom-right"><img src={radar} /></div>
        </div>
        <div className="page page-4">Fun Animation</div>
      </div> */}
    </div>
  );
}

export default App;