import React, { useRef, useEffect } from "react";
import './RadarChart.css';

import { select, line, selectAll, scaleLinear, min } from "d3";
import useResizeObserver from "../../Utils/useResizeObserver";

export default function RadarChart(props) {

    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const dataPoint = props.selectedCountry && props.selectedCountry.properties;

    // if (dataPoint) {
    //     const { "Life Ladder": ll,
    //         "Log GDP per capita": gdp,
    //         "Alcohol consumption": alc,
    //         "Freedom to make life choices": fdm,
    //         "Perceptions of corruption": corr, ...rest } = dataPoint;
    //     data = { ll, gdp, alc, fdm, corr };
    // }

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

        let radialScale = scaleLinear().domain([0, 1]).range([0, maxRadius - 60]);
        let ticks = [0.2, 0.4, 0.6, 0.8, 1];

        svg.selectAll('.circle-radial')
        .data(ticks)
        .join('circle')
        .attr('class', 'circle-radial')
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("r", t => radialScale(t))
        

        // Credits to DANNY YANG (https://yangdanny97.github.io/blog/2019/03/01/D3-Spider-Chart)
        function angleToCoordinate(angle, value) {
            let x = Math.cos(angle) * radialScale(value);
            let y = Math.sin(angle) * radialScale(value);
            return { "x": centerX + x, "y": centerY - y };
        }

        const features = Object.keys(FEATURE_MAX_DICT);

        svg.selectAll(".line-radar")
            .data(features)
            .join("line")
            .attr("class", "line-radar")
            .attr("x1", centerX)
            .attr("y1", centerY)
            .attr("x2", (ft_name, i) => {
                let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
                let line_coordinate = angleToCoordinate(angle, 1);
                return line_coordinate.x
            })
            .attr("y2",  (ft_name, i) => {
                let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
                let line_coordinate = angleToCoordinate(angle, 1);
                return line_coordinate.y
            })
            .attr("stroke", "darkslategray");

             //draw axis label
             svg.selectAll(".text-radar")
             .data(features)
             .join("text")
             .attr("class", "text-radar")
             .attr("x", (feature, i) => {
                let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
                let label_coordinate = angleToCoordinate(angle, 1.3);
                return label_coordinate.x
             })
             .attr("y", (feature, i) => {
                let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
                let label_coordinate = angleToCoordinate(angle, 1.3);
                return label_coordinate.y
             })
             .text(ft_name => FEATURE_LABEL_DICT[ft_name]);

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
        console.log(coordinates)

        //draw the path element
        svg.selectAll('.path-radar')
            .data([coordinates])
            .join("path")
            .attr("class", "path-radar")
            .transition()
            .attr("d", line().x(d => d.x)
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