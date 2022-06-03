import React from 'react';
import './Page3.css';

import Box from '../Box/Box';
import ScatterPlot from '../ScatterPlot/ScatterPlot';
import RadarChart from '../RadarChart/RadarChart';
import { getFlagEmoji } from '../../Utils/utils.js';

export default function Page3(props) {

  const countryProperties = props.selectedCountry && props.selectedCountry.properties;

  return (
    <Box id='box-3'>
      <h1 className='title'>Country Card</h1>
      <h2>
        {props.selectedCountry ?
          `${getFlagEmoji(countryProperties['iso_a2'])} ${countryProperties['admin']}, ${props.selectedYear}`
          : 'Select a country'}
      </h2>

      <div id='country-data'>
        <div className='table-row region'>
          <div className='table-key'>Region</div>
          <div className='table-description'>description</div>
          <div className='table-value'>{props.selectedCountry && countryProperties['subregion']}</div>
        </div>
        <div className='table-row pop'>
          <div className='table-key'>Population</div>
          <div className='table-description'>Estimated</div>
          <div className='table-value'>{props.selectedCountry && countryProperties['pop_est']}</div>
        </div>
        <div className='table-row happ-score'>
          <div className='table-key'>Happiness Score</div>
          <div className='table-description'>description</div>
          <div className='table-value'>{props.selectedCountry && countryProperties['Life Ladder']}</div>
        </div>
        <div className='table-row happ-score-gdp'>
          <div className='table-key'>Happiness/GDP per capita</div>
          <div className='table-description'>description</div>
          <div className='table-value'>{props.selectedCountry && countryProperties['Happiness/GDP cap.']}</div>
        </div>
        <div className='table-row gdppc'>
          <div className='table-key'>GDP per capita (logged)</div>
          <div className='table-description'>description</div>
          <div className='table-value'>{props.selectedCountry && countryProperties['Log GDP per capita']}</div>
        </div>
        <div className='table-row alc'>
          <div className='table-key'>Alcohol consumption</div>
          <div className='table-description'>description</div>
          <div className='table-value'>{props.selectedCountry && countryProperties['Alcohol consumption']}</div>
        </div>
        <div className='table-row socs'>
          <div className='table-key'>Social support</div>
          <div className='table-description'>description</div>
          <div className='table-value'>{props.selectedCountry && countryProperties['Social support']}</div>
        </div>
        <div className='table-row hle'>
          <div className='table-key'>Healthy life expectancy at birth</div>
          <div className='table-description'>description</div>
          <div className='table-value'>{props.selectedCountry && countryProperties['Healthy life expectancy at birth']}</div>
        </div>
        <div className='table-row ftm'>
          <div className='table-key'>Freedom to make life choices</div>
          <div className='table-description'>description</div>
          <div className='table-value'>{props.selectedCountry && countryProperties['Freedom to make life choices']}</div>
        </div>
        <div className='table-row gener'>
          <div className='table-key'>Generosity</div>
          <div className='table-description'>description</div>
          <div className='table-value'>{props.selectedCountry && countryProperties['Generosity']}</div>
        </div>
        <div className='table-row corr'>
          <div className='table-key'>Perceptions of corruption</div>
          <div className='table-description'>description</div>
          <div className='table-value'>{props.selectedCountry && countryProperties['Perceptions of corruption']}</div>
        </div>
      </div>

      <ScatterPlot data={props.mapData}
        selectedYear={props.selectedYear}
        selectedCountry={props.selectedCountry}
        setSelectedCountry={props.setSelectedCountry}
        property={props.property} />

      <RadarChart id='radar-chart'
        selectedCountry={props.selectedCountry} />

      <div className='page-3-datasource'>
        <h2 >Datasource</h2>
          <p><a href='https://www.kaggle.com/datasets/ajaypalsinghlo/world-happiness-report-2021?resource=download&select=world-happiness-report.csv'>Dataset 1</a>: Results of the <a href='https://en.wikipedia.org/wiki/World_Happiness_Report'>World Happiness Report</a> research initiative conducted by the Gallup World Poll (GWP) in about 150 countries, for the period from 2005 to 2020.</p>
          <p><a href='https://www.kaggle.com/datasets/ajaypalsinghlo/world-happiness-report-2021?resource=download&select=world-happiness-report-2021.csv'>Dataset 2</a>: 2021 results of the World Happiness Report.</p>
          <p><a href='https://www.kaggle.com/datasets/sveneschlbeck/alcohol-consumption-per-capita-year-and-country'>Dataset 3</a>: Total alcohol consumption per capita (liters of pure alcohol, projected estimates, 15+ years of age) in 217 historically identifiable countries and 49 aggregates/areas (e.g. EU). The dataset contains interval data for certain years depending on the country.</p>
      </div>

      <div className='page-3-thankyou'>
        <h2>Thank you</h2>
        <p>Thank you for your attention! We do hope this work may assist you in finding the country that truly makes you happy.</p>
      </div>

    </Box>
  );
};