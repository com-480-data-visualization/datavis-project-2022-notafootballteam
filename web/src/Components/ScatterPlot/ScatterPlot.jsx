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
        'Alcohol consumption': 10 // TODO: determine best value
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
                if(props.selectedCountry && props.selectedCountry.properties['iso_a3'] === d.properties['iso_a3']) {
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
                if(d.properties[property]){
                    return xScale(d.properties[property]) - X_OFFSET;
                }
                return -100;
            })
            .attr('y', (d, i) => {
                if(d.properties[Y_PROPERTY]){
                    return yScale(d.properties[Y_PROPERTY]) + Y_OFFSET;
                }
                return -100;
            })
            .attr("clip-path", (d, i) => "url(#clipPath-" + i + ")")
            .on("click", (event, country) => {
                if(props.selectedCountry && props.selectedCountry.properties['iso_a3'] === country.properties['iso_a3']) {
                    props.setSelectedCountry(null);
                } else {
                    props.setSelectedCountry(country);
                }
            })
            .transition()
            .style('opacity', (d, i) => {
                // console.log("I RAN");
                if(props.selectedCountry && props.selectedCountry.properties['iso_a3'] === d.properties['iso_a3']) {
                    // console.log("set to 1");
                    return '1';
                } else {
                   // console.log("set to 0.3")
                    return '0.3';
                }
            }).style('font-size', (d, i) => {
                if(props.selectedCountry && props.selectedCountry.properties['iso_a3'] === d.properties['iso_a3']) {
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
        .attr("transform", "translate(25, 0)")
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
        <div id='scatter-plot' ref={wrapperRef}>
            <h2>Scatterplot</h2>
            {/* <div > */}
                <svg ref={svgRef}/>
            {/* </div> */}
        </div>
    )
};