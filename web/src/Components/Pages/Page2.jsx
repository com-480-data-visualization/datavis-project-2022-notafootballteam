import React from 'react';
import './Page2.css';

import Box from '../Box/Box';
import PlayButton from '../PlayButton/PlayButton';
import WorldMap from '../WorldMap/WorldMap';
import DistributionPlot from '../DistributionPlot/DistributionPlot';

const dictForUserSelect = {
  "Happiness/GDP cap.": "Happiness/GDP per capita",
  "Life Ladder": "Happiness Score",
  "Alcohol consumption": "Alcohol consumption",
  "Log GDP per capita": "GDP"
};

const dictForMapTitle = {
  "Happiness/GDP cap.": "Happiest Countries (adjusted for GDP per capita)",
  "Life Ladder": "Happiest Countries by Ladder Score",
  "Alcohol consumption": "Countries ranked by alcohol consumption",
  "Log GDP per capita": "Countries ranked by economic output (logged GDP per capita)"
};

export default function Page2(props) {

  const options = Object.entries(dictForUserSelect).map(function (item) {
    return (<option key={item[0].toString()} value={item[0]}>{item[1]}</option>);
  });

  const mapTitle = dictForMapTitle[props.property];

  return (
    <Box id='box-2'>
      <h1 className="page-2-title">World Map</h1>
      <p className="page-2-text-top">{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis tempor tellus vitae placerat. Integer cursus nibh ex, a convallis neque venenatis ac. Praesent quam magna, auctor at consectetur bibendum, lobortis at tellus. Donec faucibus eget ligula eu pretium. Nam sed volutpat orci. Nulla turpis odio, posuere et imperdiet id, varius sit amet ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam nec consectetur justo. Vestibulum hendrerit, mauris in mattis pretium, nunc lectus tempor ex, eget vehicula dui dui id nunc. Proin vitae lacinia lectus. Morbi luctus ultricies ligula. Quisque semper augue enim, sit."}</p>
      <div className='page-2-attr-selection'>
        <div>Select attribute</div>
        <select value={props.property} onChange={event => props.setProperty(event.target.value)}>
          {options}
        </select>
      </div>
      <h2 className="page-2-map-title">{mapTitle + ", " + props.selectedYear}</h2>

      <WorldMap data={props.mapData}
        property={props.property}
        selectedCountry={props.selectedCountry}
        setSelectedCountry={props.setSelectedCountry} />

      <DistributionPlot
        id={'distr-hap'}
        data={props.mapData}
        onProperty={'Life Ladder'}
        year={props.year}
        selectedCountry={props.selectedCountry}
        color={'#24a0ed'}
      />

      <DistributionPlot
        id={'distr-alc'}
        data={props.mapData}
        onProperty={'Alcohol consumption'}
        year={props.year}
        selectedCountry={props.selectedCountry}
        color={'#24a0ed'}
      />

      <PlayButton playTime={props.playTime} handleClick={() => props.setPlayTime(!props.playTime)} />
      <p className="page-2-text-bottom">{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis tempor tellus vitae placerat. Integer cursus nibh ex, a convallis neque venenatis ac. Praesent quam magna, auctor at consectetur bibendum, lobortis at tellus. Donec faucibus eget ligula eu pretium. Nam sed volutpat orci. Nulla turpis odio, posuere et imperdiet id, varius sit amet ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam nec consectetur justo. Vestibulum hendrerit, mauris in mattis pretium, nunc lectus tempor ex, eget vehicula dui dui id nunc. Proin vitae lacinia lectus. Morbi luctus ultricies ligula. Quisque semper augue enim, sit."}</p>
    </Box>
  );
}