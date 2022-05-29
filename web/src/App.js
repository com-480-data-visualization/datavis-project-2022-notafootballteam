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
import { map_data_2005, map_data_2021 } from './Assets/data'
import {
  data_2005, data_2006, data_2007, data_2008, data_2009,
  data_2010, data_2011, data_2012, data_2013, data_2014,
  data_2015, data_2016, data_2017, data_2018, data_2019,
  data_2020, data_2021
} from './Assets/data'


function App() {
  const [loading, setLoading] = useState(true);
  const [iteration, setIteration] = useState(1)
  const [start, setStart] = useState(true)
  const [allCsvFiles] = useState([data_2005, data_2006, data_2007, data_2008, data_2009,
    data_2010, data_2011, data_2012, data_2013, data_2014,
    data_2015, data_2016, data_2017, data_2018, data_2019,
    data_2020, data_2021])
  const [property, setProperty] = useState("pop_est")
  const [countryData, setCountryData] = useState([])

  useEffect(() => {
    csv(allCsvFiles[iteration]).then((data) => {
      data.sort((a, b) => b['Life Ladder'] - a['Life Ladder']);
      setCountryData(data.slice(0, 10));
      setLoading(false);
    })
  }, [iteration, allCsvFiles]);

  // update the year each 8 seconds
  useInterval(() => {
    if (start) {
      const nextIter = (iteration + 1) % allCsvFiles.length
      setIteration(nextIter)
    }
  }, 8000);

  return (
    <div className="App">
      <div class="container">
        <div class="page page-1">
          <h1 class="page-1-title">Which countries are the happiest?</h1>
          <div class="page-1-chart"> {!loading && <AnimatedBarChart data={countryData} />} {loading && <div>Loading...</div>}</div>
          <button onClick={() => setStart(!start)} >
            {start ? "Pause" : "Start"}
          </button>
          <h1 class="page-1-text">{2005 + (iteration - 1) % allCsvFiles.length}</h1>
        </div>
        <div class="page page-2">
          <div class="page-2-title">Explore</div>
          <div class="page-2-chart">
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
          <div class="page-2-text">By clickling on a country on the map above, the user will go down to the next page and view stats about the country.</div>
        </div>
        <div class="page page-3">
          <div class="page-3-top-left"><img src={oh_dist} /></div>
          <div class="page-3-top-right"><img src={happy_dist} /></div>
          <div class="page-3-bottom-left"><img src={scatter} /></div>
          <div class="page-3-bottom-right"><img src={radar} /></div>
        </div>
        <div class="page page-4">Fun Animation</div>
        <div id="timeline-overlay">Timeline to query year</div>
      </div>
    </div>
  );
}

export default App;