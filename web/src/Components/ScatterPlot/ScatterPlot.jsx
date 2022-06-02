import React, { useRef, useEffect } from "react";
import { select, selectAll, scaleBand, scaleLinear, min, max, axisBottom, axisLeft } from "d3";
import useResizeObserver from "../../Utils/useResizeObserver";
import './ScatterPlot.css';

export default function ScatterPlot(props) {

    const SVG_OFFSET = 25;

    const MIN_Y_AXIS = 1;
    const MAX_Y_AXIS = 9;

    const Y_PROPERTY = 'Life Ladder';

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
        'Alcohol consumption': 10 // TODO: determine best value
    }

    useEffect(() => {

        console.log(`useEffect() run with selectedCountry set to ${selectedCountry}`);

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

        // Clippath circles
        svg.selectAll('clipPath')
            .attr('class', 'clipPath')
            .data(data)
            .enter()
            .append('clipPath')
            .attr('id', (d, i) => 'clipPath-' + i)
            .append('circle')
            .attr('cx', (d, i) => xScale(d[property]))
            .attr('cy', (d, i) => yScale(d[Y_PROPERTY]))
            .attr('r', (d, i) => {
                return (selectedCountry && selectedCountry['iso_a3'] == d['iso_3']) ? 10 : 6;
            });

        if (selectedCountry) console.log("selectedCountry['iso_a3']: ", selectedCountry['iso_a3']);

        // Text (emojis)
        svg.selectAll('.country-flag')
            .attr('class', 'country-flag')
            .data(data).enter()
            .append('text')
            .text((d) => getFlagEmoji(d['iso_3'].slice(0, 2)))
            .attr('x', (d, i) => xScale(d[property]) - 12.25)
            .attr('y', (d, i) => yScale(d[Y_PROPERTY]) + 9)
            .attr("clip-path", (d, i) => "url(#clipPath-" + i + ")")
            .style('opacity', (d, i) => {
                return (selectedCountry && selectedCountry['iso_a3'] == d['iso_3']) ? '1' : '0.06';
            })
            .style('font-size', (d, i) => {
                return (selectedCountry && selectedCountry['iso_a3'] == d['iso_3']) ? '32px' : '24px';
            });

        // .attr('class', (d) => {
        //     return 'country-flag';
        // });

        // svg.selectAll('.country-flag')
        //     .exit().remove();

        // (d) => {
        //     console.log("Adding selected?");
        //     // Add selected class if the country is selected
        //     if (selectedCountry && selectedCountry['iso_a3'] == d['iso_3']) {
        //         console.log(`Adding selected class to ${d['iso_3']}`);
        //         return 'country-flag selected';
        //     }
        //     return 'country-flag';
        // });

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0, " + (height - SVG_OFFSET) + ")")
            .call(axisBottom(xScale));

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(25, 0)")
            .call(axisLeft(yScale));

        // svg.selectAll("clipPath").data(data)
        //     .exit()
        //     .remove();

        // svg.selectAll(".country-flag").data(data)
        //     .exit()
        //     .remove();

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

    }, [data, dimensions, props.selectedCountry, props.property]);

    return (
        <div id='scatter-plot'>
            <h2>Scatterplot</h2>
            <div ref={wrapperRef}>
                <svg ref={svgRef} ></svg>
            </div>
        </div>
    )
};