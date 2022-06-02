import React from 'react';
import './Page3.css';

import Box from '../Box/Box';
import ScatterPlot from '../ScatterPlot/ScatterPlot';

export default function Page3(props) {
  return (
    <Box id='box-3'>
      <h1 className='title'>Country Card</h1>

      <div id='country-data'>
      <h2>{props.selectedCountry && props.selectedCountry.properties['iso_a3']}</h2>
        <ul>
          <li>Attribute 1</li>
          <li>Attribute 2</li>
          <li>Attribute 3</li>
        </ul>
      </div>

      <ScatterPlot data={props.data}
        selectedYear={props.selectedYear}
        selectedCountry={props.selectedCountry} 
        property={props.property}/>

      <div id='radar-chart'>
        <h2>Radar Chart</h2>
      </div>

    </Box>
  );
};