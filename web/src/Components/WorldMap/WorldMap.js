import React, { useRef, useEffect, useState } from "react";
import { select, geoPath, min, max, scaleLinear } from "d3";
import useResizeObserver from '../../Utils/useResizeObserver'
import { geoMercator } from "d3";

const WorldMap = ({data, property}) => {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [selectedCountry, setSelectedCountry] = useState(null);
    
    useEffect(() => {
        const svg = select(svgRef.current);
        const minProp = min(data.features, feature => feature.properties[property])
        const maxProp = max(data.features, feature => feature.properties[property])

        const colorScale = scaleLinear().domain([minProp, maxProp]).range(['red', 'blue'])




        const {width, height} = dimensions || wrapperRef.current.getBoundingClientRect();

        const projection = geoMercator().fitSize([width, height], data).precision(100);
        
        const pathGenerator = geoPath().projection(projection);

        svg
        .selectAll(".country")
        .data(data.features)
        .join("path")
        .on("mouseenter", (event, feature) => {
            setSelectedCountry(feature);
            //console.log(feature);
        })
        .on("mouseleave", () => svg.select(".labelFact").remove())
        .on("click", (event, selected) => console.log(`will scroll with country ${selected.properties.name} selected`))
        .attr("class", "country")
        .transition()
        .attr("fill", feature => colorScale(feature.properties[property]))
        .attr("d", feature => pathGenerator(feature));

        svg
        .selectAll(".labelFact")
        .data([selectedCountry])
        .join("text")
        .attr("class", "labelFact")
        .text(
            feature => {
            if( feature && feature.properties[property]) {
                return feature.properties.name +  ": " + feature.properties[property].toLocaleString()
            }
        } 
        )
        .attr("x", 10)
        .attr("y", 25);

            


    }, [data, dimensions, property, selectedCountry]);

    return (
        <div ref={wrapperRef} style={{marginBottom : "2rem"}} >
            <svg ref={svgRef}/>
        </div>
    );

}


export default WorldMap;