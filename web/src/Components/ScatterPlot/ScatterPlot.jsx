import React, { useRef, useEffect } from "react";
import { select, selectAll, scaleBand, scaleLinear, min, max } from "d3";
import useResizeObserver from "../../Utils/useResizeObserver";
import './ScatterPlot.css';

export default function ScatterPlot(props) {

    const MAX_Y_AXIS = 9;

    function getFlagEmoji(countryCode) {
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt());
        return String.fromCodePoint(...codePoints);
    }

    const svgRef = useRef()
    const wrapperRef = useRef()
    const dimensions = useResizeObserver(wrapperRef)

    const data = props.data;
    const countryInfo = props.selectedCountry && props.selectedCountry.properties;

    let xProperty = 'Log GDP per capita';
    // props.data == [{iso_3: "AFG", "Life Ladder": 3.724 ...}, {iso_3: "Angola", ...}, {}, {}]

    useEffect(() => {

        const svg = select(svgRef.current)
        if (!dimensions) return;

        const width = dimensions.width;
        const height = dimensions.height;

        const xMin = min(data, d => parseFloat(d[xProperty]));
        const xMax = max(data, d => parseFloat(d[xProperty]));

        // TODO: change as a f() of which property is selected
        const xScale = scaleLinear()
            .domain([5, xMax + 1])
            .range([0, width]);

        const yScale = scaleLinear()
            .domain([0, MAX_Y_AXIS])
            .range([height, 0]);

        let countryCircles = svg.selectAll(".country-circle")
            .data(data)
            .enter()
            .append("text")
            .text(d => d['iso_3'])
            .attr('x', (d, i) => xScale(d[xProperty]))
            .attr('y', (d, i) => yScale(d['Life Ladder']));

        countryCircles.data(data)
            .exit()
            .remove();

        // X axis name
        // svg.append('text')
        //     .attr('x', width / 2 - 30)
        //     .attr('y', height + 150)
        //     .attr('text-anchor', 'middle')
        //     .style('font-size', 15)
        //     .text('X axis name');

        // // Y axis name
        // svg.append('text')
        // .attr('transform', 'translate(60,' + height + ')rotate(-90)')
        // .attr('text-anchor', 'middle')
        // .style('font-size', 12)
        // .text('Y axis name');

    }, [props.data, dimensions]);

    return (
        <div id='scatter-plot' ref={wrapperRef}>
            <h2>Scatterplot</h2>
            <svg ref={svgRef}></svg>
        </div>
    )
};