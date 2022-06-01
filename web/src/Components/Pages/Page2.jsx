import React from 'react';
import './Page2.css';

import Box from '../Box/Box';
import PlayButton from '../PlayButton/PlayButton';
import WorldMap from '../WorldMap/WorldMap';

export default function Page2(props) {
  return (
    <Box id='box-2'>
      <h1 className="page-2-title">World Map</h1>
      <div className="page-2-year">{props.selectedYear}</div>
      <p className="page-2-text-top">{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis tempor tellus vitae placerat. Integer cursus nibh ex, a convallis neque venenatis ac. Praesent quam magna, auctor at consectetur bibendum, lobortis at tellus. Donec faucibus eget ligula eu pretium. Nam sed volutpat orci. Nulla turpis odio, posuere et imperdiet id, varius sit amet ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam nec consectetur justo. Vestibulum hendrerit, mauris in mattis pretium, nunc lectus tempor ex, eget vehicula dui dui id nunc. Proin vitae lacinia lectus. Morbi luctus ultricies ligula. Quisque semper augue enim, sit."}</p>
      <div className='page-2-attr-selection'>
        <div>Select Attribute</div>
        <select value={props.property} onChange={event => props.setProperty(event.target.value)}>
          <option value="Happiness/GDP cap.">Happiness/GDP per capita</option>
          <option value="Life Ladder">{`Happiness ` + String.fromCharCode(0x263A, 0xFE0F)}</option>
          <option value="Alcohol consumption">Alcohol consumption</option>☺️
          <option value="Log GDP per capita">GDP</option>
        </select>
      </div>
      <WorldMap data={props.mapData} property={props.property} />
      <PlayButton playTime={props.playTime} handleClick={() => props.setPlayTime(!props.playTime)}/>
      <p className="page-2-text-bottom">{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis tempor tellus vitae placerat. Integer cursus nibh ex, a convallis neque venenatis ac. Praesent quam magna, auctor at consectetur bibendum, lobortis at tellus. Donec faucibus eget ligula eu pretium. Nam sed volutpat orci. Nulla turpis odio, posuere et imperdiet id, varius sit amet ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam nec consectetur justo. Vestibulum hendrerit, mauris in mattis pretium, nunc lectus tempor ex, eget vehicula dui dui id nunc. Proin vitae lacinia lectus. Morbi luctus ultricies ligula. Quisque semper augue enim, sit."}</p>
    </Box>
  );
}

// ☺️
// smiling face
// Unicode: U+263A U+FE0F, UTF-8: E2 98 BA EF B8 8F