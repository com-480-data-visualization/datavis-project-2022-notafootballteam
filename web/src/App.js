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
          <div class="page-1-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ex lacus, pulvinar vitae nunc vitae, faucibus fermentum arcu. Nullam augue nibh, pellentesque ut eros quis, pharetra porttitor ligula. Vivamus eget elit mi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam scelerisque tellus vel libero lobortis bibendum. Nulla et sapien magna. Maecenas egestas erat vel nibh interdum maximus. Cras et semper dolor. Cras sed porttitor neque.</div>
        </div>
        <div class="page page-2">
          <div class="page-2-title">Explore</div>
          <div class="page-2-chart"><img src={map} /></div>
          <div class="page-2-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ex lacus, pulvinar vitae nunc vitae, faucibus fermentum arcu. Nullam augue nibh, pellentesque ut eros quis, pharetra porttitor ligula. Vivamus eget elit mi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam scelerisque tellus vel libero lobortis bibendum. Nulla et sapien magna. Maecenas egestas erat vel nibh interdum maximus. Cras et semper dolor. Cras sed porttitor neque.</div>
        </div>
        <div class="page page-3">
          <div class="page-3-top-left"><img src={oh_dist} />HELLO1</div>
          <div class="page-3-top-right"><img src={happy_dist} />HELLO2</div>
          <div class="page-3-bottom-left"><img src={scatter} />HELLO3</div>
          <div class="page-3-bottom-right"><img src={radar} /></div>
        </div>
        <div class="page page-4">Fun Animation</div>
      </div>
    </div>
  );
}

export default App;