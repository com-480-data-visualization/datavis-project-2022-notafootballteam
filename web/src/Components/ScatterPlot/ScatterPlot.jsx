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
    const selectedCountry = props.selectedCountry && props.selectedCountry.properties;

    let property = props.property;
    switch (property) {

        case Y_PROPERTY:
        case 'Happiness/GDP cap.':
            property = 'Log GDP per capita';
            break;

        default:
            break;
    }

    const minXMap = {
        'Log GDP per capita': 6,
        'Alcohol consumption': 0
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
            .domain([minXMap[property], maxXMap[property]])
            .range([SVG_OFFSET, width - SVG_OFFSET]);

        const yScale = scaleLinear()
            .domain([MIN_Y_AXIS, MAX_Y_AXIS])
            .range([height - SVG_OFFSET, SVG_OFFSET]);

        // console.log(data);

        // Clippath circles
        svg.selectAll('clipPath')
            .data(data)
            .append('clipPath')
            .attr('class', 'clipPath')
            .attr('id', (d, i) => 'clipPath-' + i)
            .append('circle')
            .attr('cx', (d, i) => xScale(d.properties[property]))
            .attr('cy', (d, i) => yScale(d.properties[Y_PROPERTY]))
            .transition()
            .attr('r', (d, i) => {
                if (props.selectedCountry && props.selectedCountry.properties['iso_a3'] === d.properties['iso_a3']) {
                    return 10;
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
            .attr('x', (d, i) => {
                if (d.properties[property]) {
                    return xScale(d.properties[property]) - X_OFFSET;
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
            .on("click", (event, country) => {
                if (props.selectedCountry && props.selectedCountry.properties['iso_a3'] === country.properties['iso_a3']) {
                    props.setSelectedCountry(null);
                } else {
                    props.setSelectedCountry(country);
                }
            })
            .transition()
            .style('opacity', (d, i) => {
                // console.log("I RAN");
                if (props.selectedCountry && props.selectedCountry.properties['iso_a3'] === d.properties['iso_a3']) {
                    // console.log("set to 1");
                    return '1';
                } else {
                    // console.log("set to 0.3")
                    return '0.3';
                }
            }).style('font-size', (d, i) => {
                if (props.selectedCountry && props.selectedCountry.properties['iso_a3'] === d.properties['iso_a3']) {
                    return '32px';
                } else {
                    // console.log("set to 0.3")
                    return '24px';
                }
            });

        // .attr('class', (d) => {
        //     return 'country-flag';
        // });

        // svg.selectAll('.country-flag')
        //     .exit().remove();

        // (d) => {
        //     console.log("Adding selected?");
        //     // Add selected class if the country is selected
        //     if (selectedCountry && selectedCountry['iso_a3'] == d.properties['iso_3']) {
        //         console.log(`Adding selected class to ${d.properties['iso_3']}`);
        //         return 'country-flag selected';
        //     }
        //     return 'country-flag';
        // });

        svg.select(".x-axis")
            .attr("transform", "translate(0, " + (height - SVG_OFFSET) + ")")
            .call(axisBottom(xScale));

        svg.select(".y-axis")
            .attr("transform", "translate(" + SVG_OFFSET + ", 0)")
            .call(axisLeft(yScale));

        // svg.append("g")
        //     .attr("class", "axis")
        //     attr("transform", "translate(25, 0)")
        //     .call(axisLeft(yScale));

        // svg.selectAll("clipPath").data(data)
        //     .exit()
        //     .remove();

        // svg.selectAll(".country-flag").data(data)
        //     .exit()
        //     .remove();


        // TODO: enable without re-render issue (@Mohamed)

        const axis_names = ["X axis name", "Y axis name"]
        //X axis name
        svg.selectAll('.axis-x-label')
            .data([axis_names[0]])
            .join("text")
            .attr('class', 'axis-x-label')
            .attr('x', width / 2 - 30)
            .attr('y', height - SVG_OFFSET/2)
            .attr('text-anchor', 'middle')
            .style('font-size', 15)
            .text(d => d);

        // Y axis name
        svg.selectAll('.axis-y-label')
        .data([axis_names[1]])
        .join("text")
        .attr("class", "axis-y-label")
        .attr('transform', 'translate(60,' + height + ')rotate(-90)')
        .attr('text-anchor', 'middle')
        .style('font-size', 12)
        .text(d => d);

    }, [data, dimensions, props.selectedCountry, props.property]);

    return (
        <div id='scatter-plot'>
            <h2>Scatterplot</h2>
            <div ref={wrapperRef}>
                <svg ref={svgRef}>
                    <g className="x-axis axis" />
                    <g className="y-axis axis" />
                </svg>
            </div>
        </div>
    )
}