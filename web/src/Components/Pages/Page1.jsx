import React from 'react';
import './Page1.css';

import Box from '../Box/Box';
import AnimatedBarChart from '../../Components/BarChart/AnimatedBarChart';

export default function Page1(props) {
    return (
        <Box id='box-1'>
          <h1 className="page-1-title">{"WHAT MAKES COUNTRIES HAPPY?"}</h1>
          <p className="page-1-text-top-left">{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis interdum ullamcorper. Aenean quis imperdiet nunc. Nulla vitae imperdiet tellus. Suspendisse ut iaculis sem, id viverra tortor. Nullam a urna vitae justo luctus venenatis. Nullam a aliquet arcu. Suspendisse potenti. Sed quis tortor vitae libero molestie sollicitudin eget congue nisl. Aenean convallis a lectus sed dictum. Curabitur diam odio, rutrum ac interdum quis, congue in sem."}</p>
          <div className="did-you-know">
            <p id='did-you-know-text'>Did you know?</p>
            <p>This will contain info about the yellow color.</p>
          </div>
          <h2 className="page-1-chart-title">{"Ranking by Happiness Score (" + props.selectedYear + ")"}</h2>
          <div className="page-1-chart"> {!props.loading && <AnimatedBarChart data={props.top10HappiestData} />} {props.loading && <div>Loading...</div>}</div>
          <button className='page-1-button' onClick={() => props.setPlayTime(!props.playTime)} >
            {props.playTime ? "Pause" : "▶️"}
          </button>
          <p className="page-1-text-bottom">{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis tempor tellus vitae placerat. Integer cursus nibh ex, a convallis neque venenatis ac. Praesent quam magna, auctor at consectetur bibendum, lobortis at tellus. Donec faucibus eget ligula eu pretium. Nam sed volutpat orci. Nulla turpis odio, posuere et imperdiet id, varius sit amet ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam nec consectetur justo. Vestibulum hendrerit, mauris in mattis pretium, nunc lectus tempor ex, eget vehicula dui dui id nunc. Proin vitae lacinia lectus. Morbi luctus ultricies ligula. Quisque semper augue enim, sit."}</p>
        </Box>
    );
}