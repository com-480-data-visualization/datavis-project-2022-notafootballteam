import React from 'react'
import './TimeSlider.css'
import { getYearRange } from '../../Utils/utils.js';

export default function TimeSlider(props) {

    // Create list of years
    const currYear = props.currYear;
    const yearIntegers = getYearRange();

    // Generate list of year <div>s
    const yearDivs = yearIntegers.map(function (yearInteger) {

        let divClass = `time-slider-year`;
        divClass += (yearInteger == currYear) ? ' current' : ''; // Is the year selected

        const yearDiv = (
            <div key={yearInteger.toString()}
                className={divClass}
                onClick={() => props.handleSelect(yearInteger)}>
                {yearInteger}
            </div>);
        return yearDiv;
    });

    return (
        <div id='time-slider'>
            {yearDivs}
        </div>
    )
};