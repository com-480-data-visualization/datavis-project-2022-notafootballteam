import React, { useRef, useEffect } from "react";
import './ScatterPlot.css';

import { select, selectAll, scaleBand, scaleLinear, min, max, axisBottom, axisLeft } from "d3";
import useResizeObserver from "../../Utils/useResizeObserver";

import { getFlagEmoji } from '../../Utils/utils.js';

export default function ScatterPlot(props) {

    const SVG_OFFSET = 40;

    const MIN_Y_AXIS = 1;
    const MAX_Y_AXIS = 9;

    const Y_PROPERTY = 'Life Ladder';

    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const data = props.data.features;

    let xAxisProperty = props.property;
    switch (xAxisProperty) {

        case Y_PROPERTY:
        case 'Happiness/GDP cap.':
            xAxisProperty = 'Log GDP per capita'; // Switch to GDP for X axis if "Happiness" is selected
            break;
        default:
            break;
    }

    const minXMap = {
        'Log GDP per capita': 6,
        'Alcohol consumption': -0.5
    }

    const maxXMap = {
        'Log GDP per capita': 12,
        'Alcohol consumption': 20
    }

    useEffect(() => {

        const svg = select(svgRef.current)
        if (!dimensions) return;

        const width = dimensions.width;
        const height = dimensions.height;

        const xScale = scaleLinear()
            .domain([minXMap[xAxisProperty], maxXMap[xAxisProperty]])
            .range([SVG_OFFSET, width - SVG_OFFSET]);

        const yScale = scaleLinear()
            .domain([MIN_Y_AXIS, MAX_Y_AXIS])
            .range([height - SVG_OFFSET * 1.25, SVG_OFFSET /2]);

        // console.log(data);

        // Clippath circles
        svg.selectAll('clipPath')
            .data(data)
            .append('clipPath')
            .attr('class', 'clipPath')
            .attr('id', (d, i) => 'clipPath-' + i)
            .append('circle')
            .attr('cx', (d, i) => xScale(d.properties[xAxisProperty]))
            .attr('cy', (d, i) => yScale(d.properties[Y_PROPERTY]))
            .transition()
            .attr('r', (d, i) => {
                if (props.selectedCountry && props.selectedCountry.properties['iso_a2'] === d.properties['iso_a2']) {
                    return 6;
                } else {
                    return 6;
                }
            });

        const Y_OFFSET = 9;
        const X_OFFSET = 12.25;

        // Text (emojis)
        svg.selectAll('.country-flag')
            .data(props.data.features)
            .join('text')
            .attr('class', 'country-flag')
            .text((d) => getFlagEmoji(d.properties['iso_a2']))
            .on("click", (event, country) => {
                if (props.selectedCountry && props.selectedCountry.properties['iso_a2'] === country.properties['iso_a2']) {
                    props.setSelectedCountry(null);
                } else {
                    console.log(country)
                    props.setSelectedCountry(country);
                }
            })
            .transition()
            .attr('x', (d, i) => {
                if (d.properties[xAxisProperty]) {
                    return xScale(d.properties[xAxisProperty]) - X_OFFSET;
                }
                return -100;
            })
            .attr('y', (d, i) => {
                if (d.properties[Y_PROPERTY]) {
                    return yScale(d.properties[Y_PROPERTY]) + Y_OFFSET;
                }
                return -100;
            })
            .attr("clip-path", (d, i) => "url(#clipPath-" + i + ")")
            .style('opacity', (d, i) => {
                if (props.selectedCountry && props.selectedCountry.properties['iso_a2'] === d.properties['iso_a2']) {
                    return '1';
                } else {
                    return '0.5';
                }
            }).style('font-size', (d, i) => {
                if (props.selectedCountry && props.selectedCountry.properties['iso_a2'] === d.properties['iso_a2']) {
                    return '32px';
                } else {
                    return '24px';
                }
            });

        svg.select(".x-axis")
            .attr("transform", "translate(0, " + (height - SVG_OFFSET * 1.25) + ")")
            .call(axisBottom(xScale));

        svg.select(".y-axis")
            .attr("transform", "translate(" + SVG_OFFSET + ", 0)")
            .call(axisLeft(yScale));

        const axis_names = ["X axis name", "Y axis name"]
        //X axis name
        svg.selectAll('.axis-x-label')
            .data([axis_names[0]])
            .join("text")
            .attr('class', 'axis-x-label')
            .attr('x', width / 2)
            .attr('y', height - 5)
            .attr('text-anchor', 'middle')
            .style('font-size', 15)
            .text(xAxisProperty.toUpperCase());

        // Y axis name
        svg.selectAll('.axis-y-label')
        .data([axis_names[1]])
        .join("text")
        .attr("class", "axis-y-label")
        .attr('transform', 'translate(' + 10 + ', ' + height/2 + ')rotate(-90)')
        .attr('text-anchor', 'middle')
        .style('font-size', 12)
        .text('HAPPINESS SCORE');

    }, [data, dimensions, props.selectedCountry, props.property]);

    return (
        <div id='scatter-plot'>
            <h2>Global Scatterplot</h2>
            <div ref={wrapperRef}>
                <svg ref={svgRef}>
                    <g className="x-axis axis" />
                    <g className="y-axis axis" />
                </svg>
            </div>
        </div>
    )
}