import { useState } from 'react';
import './App.css';
import {csv} from "d3";
import map from './images/map.png';
import oh_dist from './images/oh_dist.png';
import happy_dist from './images/happy_dist.png';
import scatter from './images/scatter.png';
import radar from './images/radar.png';
import useInterval from './useInterval';
import AnimatedBarChart from './AnimatedBarChart';
import year_2015 from './data/data_2005.csv';
import WorldMap from './WorldMap';
import {map_data_2005, map_data_2021} from './data'

const testData = [[
  {
    name: "Egypt",
    value: 10,
    color: "#f4efd3",
    flag : "🇪🇬"
  },
  {
    name: "France",
    value: 15,
    color: "#cccccc",
    flag : "🇫🇷"
  },
  {
    name: "Switzerland",
    value: 20,
    color: "#c2b0c9",
    flag : "🇨🇭"
  },
  {
    name: "Germany",
    value: 25,
    color: "#9656a1",
    flag : "🇩🇪"
  },
  {
    name: "Iceland",
    value: 30,
    color: "#fa697c",
    flag : "🇮🇸"
  },
  {
    name: "Argentina",
    value: 40,
    color: "#3e90f9",
    flag : "🇦🇷"
  },
  {
    name: "USA",
    value: 45,
    color: "#7ce1af",
    flag : "🇺🇸"
  },
  {
    name: "UK",
    value: 50,
    color: "#7fe8e9",
    flag : "🇬🇧"
  },
  {
    name: "Turkey",
    value: 55,
    color: "#fa697c",
    flag : "🇹🇷"
  },
  {
    name: "South Korea",
    value: 60,
    color: "#dda000",
    flag : "🇰🇷"
  },
],[
  {
    name: "Senegal",
    value: 17,
    color: "#f4efd3",
    flag : "🇸🇳"
  },
  {
    name: "France",
    value: 15,
    color: "#cccccc",
    flag : "🇫🇷"
  },
  {
    name: "Switzerland",
    value: 80,
    color: "#c2b0c9",
    flag : "🇨🇭"
  },
  {
    name: "Germany",
    value: 25,
    color: "#9656a1",
    flag : "🇩🇪"
  },
  {
    name: "Iceland",
    value: 40,
    color: "#fa697c",
    flag : "🇮🇸"
  },
  {
    name: "Argentina",
    value: 30,
    color: "#3e90f9",
    flag : "🇦🇷"
  },
  {
    name: "USA",
    value: 45,
    color: "#7ce1af",
    flag : "🇺🇸"
  },
  {
    name: "UK",
    value: 50,
    color: "#7fe8e9",
    flag : "🇬🇧"
  },
  {
    name: "Turkey",
    value: 55,
    color: "#fa697c",
    flag : "🇹🇷"
  },
  {
    name: "South Korea",
    value: 60,
    color: "#dda000",
    flag : "🇰🇷"
  },
],[
  {
    name: "Egypt",
    value: 10,
    color: "#f4efd3",
    flag : "🇪🇬"
  },
  {
    name: "France",
    value: 15,
    color: "#cccccc",
    flag : "🇫🇷"
  },
  {
    name: "Switzerland",
    value: 20,
    color: "#c2b0c9",
    flag : "🇨🇭"
  },
  {
    name: "Germany",
    value: 25,
    color: "#9656a1",
    flag : "🇩🇪"
  },
  {
    name: "Iceland",
    value: 30,
    color: "#fa697c",
    flag : "🇮🇸"
  },
  {
    name: "Argentina",
    value: 40,
    color: "#3e90f9",
    flag : "🇦🇷"
  },
  {
    name: "USA",
    value: 45,
    color: "#7ce1af",
    flag : "🇺🇸"
  },
  {
    name: "UK",
    value: 70,
    color: "#7fe8e9",
    flag : "🇬🇧"
  },
  {
    name: "Turkey",
    value: 66,
    color: "#fa697c",
    flag : "🇹🇷"
  },
  {
    name: "South Korea",
    value: 60,
    color: "#dda000",
    flag : "🇰🇷"
  },
]]


function App() {
  csv(year_2015, data => console.log(data))
  const [iteration, setIteration] = useState(1)
  const [start, setStart] = useState(true)
  const [allData, setAllData] = useState(testData)
  const [property, setProperty] = useState("pop_est")
  const [data, setData] = useState(testData[0])
  

  useInterval(() => {
    if(start) {
      const nextIndex = iteration % allData.length
      setData(
        allData[nextIndex]
      );
      setIteration(iteration + 1)
    }
  }, 8000);

  return (
    <div className="App">
      <div class="container">
        <div class="page page-1">
          <h1 class="page-1-title">Which countries are the happiest?</h1>
          <div class="page-1-chart"> <AnimatedBarChart data={data}/></div>
          <button  onClick={ () => setStart(!start)} >
        {start ? "Pause" : "Start"}
      </button>
          <h1 class="page-1-text">{2015 + (iteration - 1) % allData.length }</h1>
        </div>
        <div class="page page-2">
          <div class="page-2-title">Explore</div>
          <div class="page-2-chart">
            <WorldMap data={map_data_2021} property={property}/>
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