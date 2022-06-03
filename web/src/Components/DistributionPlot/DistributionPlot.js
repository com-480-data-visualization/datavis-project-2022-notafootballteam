import React, { useRef, useEffect } from "react";
import { select, bin, range, scaleLinear, axisBottom, axisLeft, max, min, scaleBand } from "d3";
import useResizeObserver from "../../Utils/useResizeObserver";
import './DistributionPlot.css';

const DistributionPlot = ({ id, data, selectedCountry, year, color, onProperty }) => {

    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);

    const OFFSET = 20;

    const dictMinX = {
        'Life Ladder': 1,
        'Alcohol consumption': 0
    };

    const dictMaxX = {
        'Life Ladder': 9,
        'Alcohol consumption': 20
    };

    useEffect(() => {
        const svg = select(svgRef.current);
        if (!dimensions) return;

        const width = dimensions.width;
        const height = dimensions.height;

        // Analyze data
        const minThresh = dictMinX[onProperty]; // e.g. 2
        const maxThresh = dictMaxX[onProperty]; // e.g. 9
        const THRESHOLDS = range(minThresh, maxThresh + 1); // e.g. [2, 3, 4, 5, 6, 7, 8, 9];

        // Create histograms
        const histogram = bin().thresholds(THRESHOLDS);
        const hapData = data.features.map(c => c.properties[onProperty]);



        const buckets = histogram(hapData);
        const maxBinElems = max(buckets, d => d.length);

        const xScale = scaleLinear().domain([minThresh, maxThresh]).range([OFFSET, width - OFFSET]);
        const yScale = scaleLinear().domain([0, maxBinElems]).range([height - OFFSET, OFFSET]);

        // if (selectedCountry)
        //     console.log(xScale(selectedCountry.properties[onProperty]));

        svg.selectAll("rect")
            .data(buckets)
            .join("rect")
            .attr('class', 'dist-bar')
            .attr('stroke', 'darkslategray')
            .attr("x", (d, i) => xScale(Math.floor(d.x0)))
            .style("transform", "scale(1, -1)")
            .attr("y", d => - height + OFFSET)
            .attr('rx', 2)
            .attr("width", xScale(3) - xScale(2))
            .transition()
            .attr("fill", (d, index) => {
                if (selectedCountry && d.includes(selectedCountry.properties[onProperty]))
                    return "orange"
                return color
            })
            .attr("height", d => yScale(0) - yScale(d.length));

        svg.select(".x-axis")
            .attr("transform", "translate(" + 0 + "," + (height - OFFSET) + ")")
            .call(axisBottom(xScale).ticks(THRESHOLDS.length));


    }, [data, selectedCountry, year, dimensions, onProperty]);

    return (
        <div id={id} className={'distr-plot'}>
            <h2>Distribution of {onProperty == 'Life Ladder' ? "Happiness" : "Alcohol Consumption"}</h2>
            <div ref={wrapperRef}>
                <svg ref={svgRef}>
                    <g className="x-axis" />
                </svg>
            </div>
        </div>
    )
};

export default DistributionPlot;