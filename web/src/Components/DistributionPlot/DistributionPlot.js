import React, { useRef, useEffect } from "react";
import { select, bin, scaleLinear, axisBottom, axisLeft, max, scaleThreshold } from "d3";
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


        const width = dimensions.width
        const height = dimensions.height
        const maxBins = max(buckets, d => d.length)
        const local_data = buckets.flat()
        const count = data.length

        const x = scaleLinear().domain([0, 8]).range([0, width]);
        const y = scaleLinear().domain([0, maxBins]).nice().range([height, 0]);

        const colors = [
            "black",
            "#1f77b4",
            "#ff7f0e",
            "#2ca02c",
            "#d62728",
            "#9467bd",
            "#8c564b",
            "#e377c2",
            "#7f7f7f",
            "#bcbd22",
            "#17becf",
            "#a6cee3",
            "#1f78b4",
            "#b2df8a",
            "#33a02c",
            "#fb9a99",
            "#e31a1c",
            "#fdbf6f",
            "#ff7f00",
            "#cab2d6",
            "#6a3d9a",
            "#ffff99",
            "#b15928",
            "#fbb4ae",
            "#b3cde3",
            "#ccebc5",
            "#decbe4",
            "#fed9a6",
            "#ffffcc",
            "#e5d8bd",
            "#fddaec",
            "#f2f2f2",
            "#b3e2cd",
            "#fdcdac",
            "#cbd5e8",
            "#f4cae4",
            "#e6f5c9",
            "#fff2ae",
            "#f1e2cc",
            "#cccccc"
        ]
        const binColor = scaleThreshold()
            .domain(buckets.map(d => d.x0))
            .range(colors);

        svg
            .selectAll("rect")
            .attr('class', 'dist-bar')
            .data(buckets)
            .join("rect")
            .attr("fill", (d => binColor(d.x0)))
            .attr("x", (d, index) => index * Math.max(0, x(d.x1) - x(d.x0) - 1))
            .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
            .attr("y", d => y(d.length))
            .attr("height", d => y(0) - y(d.length));

    }, [data, selectedCountry, year, dimensions]);

    return (
        <div id='distribution-plot' ref={wrapperRef}>
            <svg ref={svgRef}></svg>
        </div>
    )
};

export default DistributionPlot;