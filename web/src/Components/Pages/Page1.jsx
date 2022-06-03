import React from 'react';
import './Page1.css';

import Box from '../Box/Box';
import PlayButton from '../PlayButton/PlayButton';
import AnimatedBarChart from '../../Components/BarChart/AnimatedBarChart';

export default function Page1(props) {

  const textTop = `Let’s begin our journey to happiness with a cliché yet essential question: where should you build your future family?
  In the age of digital nomads, with a recognized degree in your pocket (or simply some advanced programming skills) the world is open to you, so feel free to choose.
  We provide you with a light but insightful visualization of your options and their evolution over time.
  And if you were lucky enough to have lived in more than one country, we invite you to follow their paths. Use the `;
  const play = (<strong>Play</strong>);
  const textTop2 = ` button on the page slider to travel in time.`;

  return (
    <Box id='box-1'>
      <h1 className="page-1-title">{"WHAT MAKES COUNTRIES HAPPY?"}</h1>
      <p className="page-1-text-top-left">{textTop}{play}{textTop2}</p>
      <div className="did-you-know">
        <p id='did-you-know-text'>🟡 Did you know?</p>
        <p>Yellow is the color of <a href='https://www.science.org/content/article/what-makes-people-happy-when-skies-are-gray-color-yellow#:~:text=Yellow%20is%20usually%20the%20color%20of%20happy%2C%20joyful%20emotions.'>happiness</a> in many cultures.
          Happiness seems to be associated with sunny weather in numerous non-desertic countries.</p>
      </div>
      <h2 className="page-1-chart-title">{"Ranking by Happiness Score, " + props.selectedYear}</h2>
      <div className="page-1-chart">
        {props.loading && <div>Loading...</div>}
        {!props.loading && <AnimatedBarChart data={props.data} />}
      </div>
      <PlayButton playTime={props.playTime} handleClick={() => props.setPlayTime(!props.playTime)} />
      <h2 className="page-1-bottom-subtitle">21 countries</h2>
      <p className="page-1-text-bottom">
        {`21 countries. That is the total number of countries that have ever been among the top 10 happiest countries since the start of the `}<a href='https://en.wikipedia.org/wiki/World_Happiness_Report'>World Happiness Report</a>{` index in 2005.
  If you notice a pattern in bars shown between 2005 and 2021, that is perfectly normal. An expert observer would probably also note the following: the 2008 financial crisis reflects perfectly on the most abrupt changes of this ranking.
  Years directly following late 2000s contain the most exotic results while slowly return to an expected ranking. Venezuela, Mexico and Costa Rica had the chance to appear... and disappear just as fast. No other developing country has appeared.`}
      </p>
    </Box>
  );
};