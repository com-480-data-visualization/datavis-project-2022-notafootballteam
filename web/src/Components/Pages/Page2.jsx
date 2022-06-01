import React from 'react';
import './Page2.css';

import Box from '../Box/Box';
import WorldMap from '../WorldMap/WorldMap';

export default function Page2(props) {
  return (
    <Box id='box-2'>
      <h1 className="page-1-title">World Map</h1>
      <div className="page-1-year">{props.selectedYear}</div>
      <WorldMap data={props.mapData} property={props.property} />
      <h2>Select property</h2>
      <select value={props.property} onChange={event => props.setProperty(event.target.value)}>
        <option value="Life Ladder">Happiness 😁</option>
        <option value="Log GDP per capita">GDP 💸</option>
        <option value="Alcohol consumption">Alcohol consumption 🍾</option>
        <option value="Happiness/GDP cap.">Happiness/GDP cap. 🤓</option>
      </select>
    </Box>
  );
}