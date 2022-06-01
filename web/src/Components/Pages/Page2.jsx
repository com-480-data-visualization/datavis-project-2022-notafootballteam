import React from 'react';
import './Page2.css';

import Box from '../Box/Box';
import PlayButton from '../PlayButton/PlayButton';
import WorldMap from '../WorldMap/WorldMap';

const dictForUserSelect = {
  "Happiness/GDP cap.": "Happiness/GDP",
  "Life Ladder": `Happiness ` + String.fromCharCode(0x263A, 0xFE0F),
  "Alcohol consumption": "Alcohol consumption",
  "Log GDP per capita": "GDP"
};

const dictForMapTitle = {
  "Happiness/GDP cap.": "Happiest Countries by Ladder Score (adj. for GDP per capita)",
  "Life Ladder": "Happiest Countries by Ladder Score",
  "Alcohol consumption": "Countries ranked by alcohol consumption",
  "Log GDP per capita": "Countries ranked by economic output (logged GDP per capita)"
};

export default function Page2(props) {

  const options = Object.entries(dictForUserSelect).map( function(item) {
    return (<option key={item[0].toString()} value={item[0]}>{item[1]}</option>);
  });

  const mapTitle = dictForMapTitle[props.property];

  return (
    <Box id='box-2'>
      <h1 className="page-2-title">Happiness Map</h1>
      <p className="page-2-text-top">{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis tempor tellus vitae placerat. Integer cursus nibh ex, a convallis neque venenatis ac. Praesent quam magna, auctor at consectetur bibendum, lobortis at tellus. Donec faucibus eget ligula eu pretium. Nam sed volutpat orci. Nulla turpis odio, posuere et imperdiet id, varius sit amet ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam nec consectetur justo. Vestibulum hendrerit, mauris in mattis pretium, nunc lectus tempor ex, eget vehicula dui dui id nunc. Proin vitae lacinia lectus. Morbi luctus ultricies ligula. Quisque semper augue enim, sit."}</p>
      <div className='page-2-attr-selection'>
        <div>Select attribute</div>
        <select value={props.property} onChange={event => props.setProperty(event.target.value)}>
          {options}
        </select>
      </div>
      <h2 className="page-2-map-title">{mapTitle + ", " + props.selectedYear}</h2>
      <WorldMap data={props.mapData} property={props.property} />
      <PlayButton playTime={props.playTime} handleClick={() => props.setPlayTime(!props.playTime)} />
      <p className="page-2-text-bottom">{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis tempor tellus vitae placerat. Integer cursus nibh ex, a convallis neque venenatis ac. Praesent quam magna, auctor at consectetur bibendum, lobortis at tellus. Donec faucibus eget ligula eu pretium. Nam sed volutpat orci. Nulla turpis odio, posuere et imperdiet id, varius sit amet ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam nec consectetur justo. Vestibulum hendrerit, mauris in mattis pretium, nunc lectus tempor ex, eget vehicula dui dui id nunc. Proin vitae lacinia lectus. Morbi luctus ultricies ligula. Quisque semper augue enim, sit."}</p>
    </Box>
  );
}

// ☺️
// smiling face
// Unicode: U+263A U+FE0F, UTF-8: E2 98 BA EF B8 8F