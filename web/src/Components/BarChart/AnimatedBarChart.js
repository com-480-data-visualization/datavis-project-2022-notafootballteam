import React, { useRef, useEffect } from "react";
import { select, scaleBand, scaleLinear, max } from "d3";
import useResizeObserver from "../../Utils/useResizeObserver";
import './AnimatedBarChart.css';

const countryToColorMap = {
    'AU': { 'color': '#4e79a7', 'emoji': '🇦🇺' },
    'AT': { 'color': '#a0cbe8', 'emoji': '🇦🇹' },
    'BE': { 'color': '#f28e2b', 'emoji': '🇧🇪' },
    'CA': { 'color': '#ffbe7d', 'emoji': '🇨🇦' },
    'CR': { 'color': '#59a14f', 'emoji': '🇨🇷' },
    'DK': { 'color': '#8cd17d', 'emoji': '🇩🇰' },
    'FI': { 'color': '#d37295', 'emoji': '🇫🇮' },
    'DE': { 'color': '#9d7660', 'emoji': '🇩🇪' },
    'IS': { 'color': '#499894', 'emoji': '🇮🇸' },
    'IE': { 'color': '#b6992d', 'emoji': '🇮🇪' },
    'IL': { 'color': '#e15759', 'emoji': '🇮🇱' },
    'LU': { 'color': '#ff9d9a', 'emoji': '🇱🇺' },
    'MX': { 'color': '#f9706e', 'emoji': '🇲🇽' },
    'NL': { 'color': '#bbbfac', 'emoji': '🇳🇱' },
    'NZ': { 'color': '#86bcb6', 'emoji': '🇳🇿' },
    'NO': { 'color': '#fabfd2', 'emoji': '🇳🇴' },
    'ES': { 'color': '#b07aa1', 'emoji': '🇪🇸' },
    'SE': { 'color': '#d4a6c8', 'emoji': '🇸🇪' },
    'CH': { 'color': '#f1ce63', 'emoji': '🇨🇭' },
    'US': { 'color': '#d7b5a6', 'emoji': '🇺🇸' },
    'VE': { 'color': '#a39fc9', 'emoji': '🇻🇪' }
}



function AnimatedBarChart({ data }) {
    const svgRef = useRef()
    const wrapperRef = useRef()
    const dimensions = useResizeObserver(wrapperRef)

    useEffect(() => {
        const svg = select(svgRef.current)
        if (!dimensions) return;

        const yScale = scaleBand()
            .domain(data.map((value, index) => index))
            .range([0, dimensions.height])
            .paddingInner(0.1)

        const xScale = scaleLinear()
            .domain([0, max(data, entry => Math.pow(2, 8))])
            .range([0, dimensions.width])

        const START_LOC = dimensions.height;
        const MAIN_ANIMATION_DURATION = 1250;
        const REMOVE_ANIMATION_DURATION = 700;

        // draw the bars
        svg.selectAll(".bar")
            .data(data, (entry, index) => entry['Country name'])
            .join(enter => enter.append("rect").attr("y", START_LOC).transition().duration(REMOVE_ANIMATION_DURATION).attr("y", (entry, index) => yScale(index)), undefined,
                elemToRemove => elemToRemove.transition().duration(REMOVE_ANIMATION_DURATION).attr("y", START_LOC).style('opacity', 0.1).remove())
            .attr("fill", (entry, index) => `${countryToColorMap[entry['iso_2']].color}`)
            .attr("class", "bar")
            .attr("x", 0)
            .attr("height", yScale.bandwidth())
            .transition()
            .duration(MAIN_ANIMATION_DURATION)
            .attr("width", entry => xScale(Math.pow(2, entry['Life Ladder'])))
            .attr("y", (entry, index) => yScale(index))
            .attr("rx", 5)
            .attr("ry", 5);

        // draw the labels 
        svg
            .selectAll(".label")
            .data(data, (entry, index) => entry['Country name'])
            .join(
                enter => enter
                    .append("text")
                    .attr("y", START_LOC)
                    .transition()
                    .duration(REMOVE_ANIMATION_DURATION)
                    .attr("y", (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5),
                undefined,
                elemToRemove => elemToRemove
                    .transition()
                    .duration(REMOVE_ANIMATION_DURATION)
                    .attr("y", START_LOC)
                    .style('opacity', 0.3)
                    .remove()
            )
            .text(entry => `${countryToColorMap[entry['iso_2']].emoji} ${entry['Country name']}`)
            .attr("class", "label")
            .attr('x', 15)
            .raise()
            .transition()
            .duration(MAIN_ANIMATION_DURATION)
            .attr("y", (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5);
    }, [data, dimensions]);

    return (
        <div id='animated-bar-chart' ref={wrapperRef}>
            <svg ref={svgRef}></svg>
        </div>
    )

}

export default AnimatedBarChart;