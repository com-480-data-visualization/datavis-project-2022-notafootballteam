import React from 'react';
import './Page3.css';

import Box from '../Box/Box';
import ScatterPlot from '../ScatterPlot/ScatterPlot';

export default function Page3(props) {
  return (
    <Box id='box-3'>
      <h1 className='title'>Happiness Dashboard</h1>
      <div id='distr-hap'>Distribution of happiness</div>
      <div id='distr-alc'>Distribution of alcohol consumption</div>
      <ScatterPlot />
      <div id='radar-chart'>Radar Chart</div>
    </Box>
  );
}