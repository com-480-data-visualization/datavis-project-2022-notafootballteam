import React, { useRef, useEffect } from "react";
import { select, bin, range, scaleLinear, axisBottom, axisLeft, max, min, scaleBand } from "d3";
import useResizeObserver from "../../Utils/useResizeObserver";
import './DistributionPlot.css';

const DistributionPlot = ({ id, data, selectedCountry, year, color, onProperty}) => {

    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);

    const OFFSET = 20;

    useEffect(() => {
        const svg = select(svgRef.current);
        if (!dimensions) return;

        // prepare the data
        const THRESHOLDS = [2, 3, 4, 5, 6, 7, 8, 9];

        const histogram = bin().thresholds(THRESHOLDS);
        console.log(data);
        const hapData = data.features.map(c => c.properties[onProperty]);
        var buckets = histogram(hapData);

        const width = dimensions.width;
        const height = dimensions.height;

        const maxBinElems = max(buckets, d => d.length);

        const dictMinX = {
            'Life Ladder': 2,
            'Alcohol consumption': 0
        };

        const dictMaxX = {
            'Life Ladder': 9,
            'Alcohol consumption': 16
        };

        const xScale = scaleLinear().domain([dictMinX[onProperty], dictMaxX[onProperty]]).range([OFFSET, width - OFFSET]);
        const yScale = scaleLinear().domain([0, maxBinElems]).range([height - OFFSET, OFFSET]);

        svg.selectAll("rect")
            .data(buckets)
            .join("rect")
            .attr('class', 'dist-bar')
            .attr("fill", color)
            .attr('stroke', 'darkslategray')
            .attr("x", (d, i) => xScale(Math.floor(d.x0)))
            .attr("y", d => yScale(d.length))
            .attr('rx', 2)
            .attr("width", xScale(3) - xScale(2))
            .attr("height", d => yScale(0) - yScale(d.length));

        svg.select(".x-axis")
            .attr("transform", "translate(" + 0 + "," + (height - OFFSET) + ")")
            .call(axisBottom(xScale).ticks(8));


    }, [data, selectedCountry, year, dimensions, onProperty]);

    return (
        <div id={id} className={'distr-plot'}>
            <h2>Distribution of happiness</h2>
            <div ref={wrapperRef}>
                <svg ref={svgRef}>
                    <g className="x-axis" />
                </svg>
            </div>
        </div>
    )
};

export default DistributionPlot;