import React, { useRef, useEffect } from "react";
import './RadarChart.css';

import { select, line, selectAll, scaleLinear, min } from "d3";
import useResizeObserver from "../../Utils/useResizeObserver";

export default function RadarChart(props) {

    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const dataPoint = props.selectedCountry && props.selectedCountry.properties;

    let data = {
        "Life Ladder": 0,
        "Log GDP per capita": 0,
        "Alcohol consumption": 0,
        "Freedom to make life choices": 0,
        "Perceptions of corruption": 0
    };

    if (dataPoint) {
        const { "Life Ladder": ll,
            "Log GDP per capita": gdp,
            "Alcohol consumption": alc,
            "Freedom to make life choices": fdm,
            "Perceptions of corruption": corr, ...rest } = dataPoint;
        data = { ll, gdp, alc, fdm, corr };
    }

    // console.log(partialObject) // => { a: 'a', b: 'b'}
    console.log(data) // => { c: 'c', d: 'd'}

    const FEATURE_LABEL_DICT = {
        "Life Ladder": "HAPPINESS",
        "Log GDP per capita": "GDP",
        "Alcohol consumption": "ALCOHOL",
        "Freedom to make life choices": "FREEDOM",
        "Perceptions of corruption": "CORRUPTION"
    };

    const FEATURE_MAX_DICT = {
        "Life Ladder": 10,
        "Log GDP per capita": 17,
        "Alcohol consumption": 20,
        "Freedom to make life choices": 1,
        "Perceptions of corruption": 1
    };

    useEffect(() => {

        const svg = select(svgRef.current)
        if (!dimensions) return;

        const width = dimensions.width;
        const height = dimensions.height;

        const OFFSET = 5;

        const maxRadius = min([width / 2, height / 2]);
        const centerX = width / 2;
        const centerY = height / 2;

        // TODO
        let radialScale = scaleLinear().domain([0, 1]).range([0, maxRadius - 60]);
        let ticks = [0.2, 0.4, 0.6, 0.8, 1];

        ticks.forEach(t =>
            svg.append('circle')
                .attr('class', 'circle-radial')
                .attr("cx", centerX)
                .attr("cy", centerY)
                .attr("fill", "none")
                .attr("stroke", "gray")
                .attr("r", radialScale(t))
                .exit().remove()
        );

        // ticks.forEach(t =>
        //     svg.append("text")
        //         .attr("x", centerX + 5)
        //         .attr("y", centerY - radialScale(t))
        //         .text(t.toString())
        // );

        // Credits to DANNY YANG (https://yangdanny97.github.io/blog/2019/03/01/D3-Spider-Chart)
        function angleToCoordinate(angle, value) {
            let x = Math.cos(angle) * radialScale(value);
            let y = Math.sin(angle) * radialScale(value);
            return { "x": centerX + x, "y": centerY - y };
        }

        const features = Object.keys(FEATURE_MAX_DICT);

        for (var i = 0; i < features.length; i++) {
            let ft_name = features[i];
            let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
            let line_coordinate = angleToCoordinate(angle, 1);
            let label_coordinate = angleToCoordinate(angle, 1.3);

            //draw axis line
            svg.append("line")
                .attr("x1", centerX)
                .attr("y1", centerY)
                .attr("x2", line_coordinate.x)
                .attr("y2", line_coordinate.y)
                .attr("stroke", "darkslategray");

            // svg.selectAll('.line-radar')
            //     .data(data)
            //     .join('line')
            //     .attr('class', 'line-radar')
            //     .attr("x1", centerX)
            //     .attr("y1", centerY)
            //     .attr("x2", line_coordinate.x)
            //     .attr("y2", line_coordinate.y)
            //     .attr("stroke", "darkslategray");

            //draw axis label
            svg.append("text")
                .attr("x", label_coordinate.x)
                .attr("y", label_coordinate.y)
                .text(FEATURE_LABEL_DICT[ft_name]);
        }

        function getPathCoordinates(data_point) {
            let coordinates = [];
            for (var i = 0; i < features.length; i++) {
                let ft_name = features[i];
                let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
                coordinates.push(angleToCoordinate(angle, data_point[ft_name] / FEATURE_MAX_DICT[ft_name]));
            }
            return coordinates;
        }

        let coordinates = dataPoint ? getPathCoordinates(dataPoint) : { "x": 0, "y": 0 };
        // let line =

        //draw the path element
        svg.append("path")
            .datum(coordinates)
            .attr("d", line()
                .x(d => d.x)
                .y(d => d.y)
            ).attr("stroke-width", 3)
            .attr("stroke", '#24a0ed')
            .attr("fill", '#24a0ed')
            .attr("stroke-opacity", 1)
            .attr("opacity", 0.5);

    }, [props.selectedCountry, dimensions])

    return (
        <div id='radar-chart'>
            <h2>Radar Chart</h2>
            <div ref={wrapperRef}>
                <svg ref={svgRef}>
                </svg>
            </div>
        </div>
    );
}