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
  "Log GDP per capita": "GDP per capita"
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
      <h2 className="page-2-subtitle">If not money, what makes you happy?</h2>
      <p className="page-2-text-top">
        {`The most popular view of the relation between happiness and money presents it as `}
        <a href='https://www.cnbc.com/2015/12/14/money-can-buy-happiness-but-only-to-a-point.html'>logarithmic</a>.
        {` Moreover, our top 10 seems to contain mainly countries known for their high level of income.
        So could we conclude that (outside major crisis) happiness only depends on money? 
        The below map provides with a larger overview of happiness rate in the world.
        As many economical statistics, the correlation with the economical production per capita (≈ individual wealth) is obvious:
         just compare GDP per capita (set the slider below to "GDP per capita”) to convince yourself of the similarities. 
        `}<br/><br/>
        {`But let’s say you are not at all interested by money: good news, there are some major outliers
         and we wanted to make them obvious: selecting the “Happiness/GDP/capita” map in the below list should make them obvious. 
        Great, we found our outliers, let’s now see what other parameters influence happiness.
        Previous research has shown Social Support, Life expectancy, Freedom, Absence of corruption and Generosity as good candidates.
        A simple click on a country will select it and update the whole website accordingly.
        The radar chart in the corner provides deeper insight of these parameters, and relative comparison.
        Take a look at the page below for specific focus on each country’s attributes and its relative position (cf. Scatterplot).`}
      </p>
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
      <p className="page-2-text-bottom">
        {`Alcohol [à mettre en évidence] : As a second part, we have investigated a more amusing relation
         (the project aims to make the visitors and its authors happy). 
         The American association of psyhology has published various studies showing alcohol acts as a social lubricant:
          alcohol was supposed to minimize negative emotions. If our first ambition was to show such an effect at country level, 
          those attempts did not pay. However, we aim to continue providing complete information to the reader 
          considering his or her future place to live and we could not exclude alcohol. 
          The above histograms act as a comparison between the happiness tier in the considered country 
          and the alcohol consumption “performances” of its inhabitants. We consider this as a somehow acceptable metric 
          of the “lifestyle” you are expected to have - party hard western, true slavic gopnik or sober hardworker, 
          the choice is now yours! Many thanks for your attention and we do hope this work will contribute 
          into making you find the country who really makes you happy!`}
      </p>
    </Box>
  );
}