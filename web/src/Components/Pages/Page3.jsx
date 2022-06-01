import React from 'react';
import './Page3.css';

import Box from '../Box/Box';
import ScatterPlot from '../ScatterPlot/ScatterPlot';

export default function Page3(props) {
  return (
    <Box id='box-3'>
      <h1 className='title'>Happiness Dashboard</h1>
      <div id='distr-hap'>
        <h2>Distribution of happiness</h2>
      </div>
      <div id='distr-alc'>
        <h2>Distribution of alcohol consumption</h2>
      </div>

      <ScatterPlot data={props.data}
        selectedYear={props.selectedYear}
        selectedCountryID={props.selectedCountryID} />

      <div id='radar-chart'>
        <h2>Country Sheet</h2>
      </div>
    </Box>
  );
};