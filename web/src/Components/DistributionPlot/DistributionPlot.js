import React, { useRef, useEffect } from "react";
import { select, bin, scaleLinear, axisBottom, axisLeft, max, min, scaleBand } from "d3";
import useResizeObserver from "../../Utils/useResizeObserver";
import './DistributionPlot.css';

const DistributionPlot = ({ data, selectedCountry, year }) => {
    const svgRef = useRef()
    const wrapperRef = useRef()
    const dimensions = useResizeObserver(wrapperRef)


    useEffect(() => {
        const svg = select(svgRef.current)
        if (!dimensions) return;

        // prepare the data
        var histogram = bin()
        const hapData = data.map(c => c['Life Ladder'])
        var buckets = histogram(hapData)

        console.log(buckets)


        const width = dimensions.width
        const height = dimensions.height
        const maxBins = max(buckets, d => d.length)
        const minLadderScore = min(buckets.map(arr => min(arr)))
        const maxLadderScore = max(buckets.map(arr => max(arr)))

        const xScale = scaleLinear().domain([0, 9]).range([0, width]);
        const yScale = scaleLinear().domain([0, maxBins + 1]).nice().range([height, 0]);

        const test = buckets.map((d, index) => index * Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
        console.log(test)


        svg
            .selectAll("rect")
            .attr('class', 'dist-bar')
            .data(buckets)
            .join("rect")
            .attr("fill", 'darkgreen')
            .attr("x", (d, index) => index * Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
            .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
            .attr("y", d => yScale(d.length))
            .attr("height", d => yScale(0) - yScale(d.length));

        svg.append("g").call(axisBottom(xScale).ticks(buckets.length))

    }, [data, selectedCountry, year, dimensions]);

    return (
        <div id='distribution-plot' ref={wrapperRef}>
            <svg ref={svgRef}></svg>
        </div>
    )
};

export default DistributionPlot;