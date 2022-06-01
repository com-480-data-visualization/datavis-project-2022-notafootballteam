import React, { useRef, useEffect, useState } from "react";
import { select, geoPath, min, max, scaleLinear } from "d3";
import useResizeObserver from '../../Utils/useResizeObserver'
import { geoMercator } from "d3";

import './WorldMap.css'

const WorldMap = ({ data, property, countrySelected, setCountrySelected }) => {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [selectedCountry, setSelectedCountry] = useState(null);
    useEffect(() => {
        const svg = select(svgRef.current);
        const minProp = min(data.features, feature => feature.properties[property])
        const maxProp = max(data.features, feature => feature.properties[property])

        const colorScale = scaleLinear().domain([minProp, maxProp]).range(['black', 'yellow'])


        const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();

        const projection = geoMercator().fitSize([width, height], data).precision(100);

        const pathGenerator = geoPath().projection(projection);
        const unknownColor = 'gray';

        svg
            .selectAll(".country")
            .data(data.features)
            .join("path")
            .on("mouseenter", (event, feature) => {
                if (feature && feature.properties[property]) {
                    setSelectedCountry(feature);
                } else {
                    setSelectedCountry(null);
                }
            })
            .on("mouseleave", () => {
                svg.select(".labelFact").remove()
                setSelectedCountry(null);
            })
            .on("click", (event, selected) => {
                setCountrySelected(selected);
                console.log(selected);
            })
            .attr("class", "country")
            .style("cursor", "pointer")
            .transition()
            .attr("fill", feature => feature.properties[property] !== undefined ? colorScale(feature.properties[property]) : unknownColor)
            .attr("d", feature => pathGenerator(feature));

        svg
            .selectAll(".labelFact")
            .data([selectedCountry])
            .join("text")
            .attr("class", "labelFact")
            .text(
                feature => {
                    if (feature) {
                        const num = feature.properties[property];
                        const rounded = Math.round(num * 10) / 10;
                        return feature.properties.name + " : " + rounded.toLocaleString()
                    }
                }
            )
            .attr("x", 10)
            .attr("y", 25)
            .style('font-size', '15px');

        const colors = ['black', 'yellow'];

        const grad = svg.append('defs')
            .append('linearGradient')
            .attr('id', 'grad')
            .attr('x1', '0%')
            .attr('x2', '100%')
            .attr('y1', '0%')
            .attr('y2', '0%');

        grad.selectAll('stop')
            .data(colors)
            .enter()
            .append('stop')
            .style('stop-color', (d) => d)
            .attr('offset', (d, i) => {
                return 100 * (i / (colors.length - 1)) + '%';
            })

        svg.append('rect')
            .attr('x', 40)
            .attr('y', 400)
            .attr('width', 100)
            .attr('height', 20)
            .attr('stroke', 'black')
            .attr('fill', 'url(#grad)');

        let legendText = ['Low', 'High']
        svg
            .selectAll(".legendText")
            .data(legendText)
            .join("text")
            .attr("class", "legendText")
            .text((text) => text)
            .attr("x", (text, index) => 1 + index * 150)
            .attr("y", 415)
            .style('font-size', '11px')
            .style('font-weight', '500')
            .style('text-transform', 'uppercase');

        const unknownData = ['Missing']
        svg.selectAll("unknownValuesLegend")
            .data(unknownData)
            .join("rect")
            .attr('x', 40)
            .attr('y', 430)
            .attr('width', 20)
            .attr('height', 20)
            .attr('fill', unknownColor)
            .attr('stroke', 'black');

        svg.selectAll("unknownValueLegendText")
            .data(unknownData)
            .join('text')
            .attr('class', 'legendText')
            .attr('x', 70)
            .attr('y', 445)
            .text(text => text)
            .style('font-size', '11px')
            .style('font-weight', '500')
            .style('text-transform', 'uppercase');

    }, [data, dimensions, property, selectedCountry]);

    return (
        <div id='world-map' ref={wrapperRef} style={{ marginBottom: "2rem" }} >
            <svg ref={svgRef} />
        </div>
    );

}


export default WorldMap;