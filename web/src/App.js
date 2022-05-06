import logo from './logo.svg';
import './App.css';
import bar from './images/bar.png';
import map from './images/map.png';
import oh_dist from './images/oh_dist.png';
import happy_dist from './images/happy_dist.png';
import scatter from './images/scatter.png';
import radar from './images/radar.png';

function App() {
  return (
    <div className="App">
      <div class="container">
        <div class="page page-1">
          <div class="page-1-title">Which countries are the happiest?</div>
          <div class="page-1-chart"><img src={bar} /></div>
          <div class="page-1-text">The above chart will be animated.</div>
        </div>
        <div class="page page-2">
          <div class="page-2-title">Explore</div>
          <div class="page-2-chart"><img src={map} /></div>
          <div class="page-2-text">By clickling on a country on the map above, the user will go down to the next page and view stats about the country.</div>
        </div>
        <div class="page page-3">
          <div class="page-3-top-left"><img src={oh_dist} /></div>
          <div class="page-3-top-right"><img src={happy_dist} /></div>
          <div class="page-3-bottom-left"><img src={scatter} /></div>
          <div class="page-3-bottom-right"><img src={radar} /></div>
        </div>
        <div class="page page-4">Fun Animation</div>
        <div id="timeline-overlay"></div>
      </div>
    </div>
  );
}

export default App;