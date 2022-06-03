import React from 'react';
import './Page1.css';

import Box from '../Box/Box';
import PlayButton from '../PlayButton/PlayButton';
import AnimatedBarChart from '../../Components/BarChart/AnimatedBarChart';

export default function Page1(props) {

  const textTop = `Let’s start our journey to happiness by a selfish but essential issue: where should I build my future family?
  In the age of digital nomads, with a good degree in your pocket (or simply some advanced programming skills) the world is open to you, so feel free to choose.
  We provide you with a light but insightful visualization of your options and their evolution in time.
  If you were lucky enough to already live in one of them, we’ll invite you to follow its path through time.`;

  const textBottom = `That is the total number of countries who have been among the top 10 happiest, from the existence of the happiness index to our days.
  So if you notice a huge similarity in the colors shown between 2005 and 2021, that is perfectly normal.
  An expert observer will probably also note the following : the financial crisis reflects perfectly on the most abrupt changes of this ranking.
  The years directly following 2007 will contain the most exotic results while we slowly go back to “normal”. Venezuela, Mexico and Costa Rica had the chance to appear, and to disappear almost as fast.
  No other “South” country (in economical terms) has ever appeared.`;

  return (
    <Box id='box-1'>
      <h1 className="page-1-title">{"WHAT MAKES COUNTRIES HAPPY?"}</h1>
      <p className="page-1-text-top-left">{textTop}</p>
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
      <p className="page-1-text-bottom">{textBottom}</p>
    </Box>
  );
};