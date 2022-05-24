import React, { useRef, useEffect} from "react";
import {select, scaleBand, scaleLinear, max} from "d3";
import useResizeObserver from "./useResizeObserver";



function AnimatedBarChart({data}) {
    const svgRef = useRef()
    const wrapperRef = useRef()
    const dimensions = useResizeObserver(wrapperRef)

    useEffect(() => {
        const svg = select(svgRef.current)
        if(!dimensions) return;

        // sort the data
        data.sort((a, b) => b.value - a.value)

        const yScale = scaleBand()
                        .domain(data.map((value, index) => index))
                        .range([0, dimensions.height])
                        .paddingInner(0.1)

        const xScale = scaleLinear()
                        .domain([0, max(data, entry => entry.value)])
                        .range([0, dimensions.width])
        
        
        const START_LOC = 230
        const MAIN_ANIMATION_DURATION = 3000
        const REMOVE_ANIMATION_DURATION = 1000

        // draw the bars
        svg.selectAll(".bar")
            .data(data, (entry, index) => entry.name)
            .join(enter => enter.append("rect").attr("y", START_LOC).transition().duration(REMOVE_ANIMATION_DURATION).attr("y", (entry, index) => yScale(index)), undefined, 
            elemToRemove => elemToRemove.transition().duration(REMOVE_ANIMATION_DURATION).attr("y", START_LOC).remove())
            .attr("fill", entry => entry.color)
            .attr("class", "bar")
            .attr("x", 0)
            .attr("height", yScale.bandwidth())
            .transition()
            .duration(MAIN_ANIMATION_DURATION)
            .attr("width", entry => xScale(entry.value))
            .attr("y", (entry, index) => yScale(index))

        // draw the labels 
        svg
        .selectAll(".label")
        .data(data, (entry, index) => entry.name)
        .join(enter => enter.append("text").attr("y", START_LOC).transition().duration(REMOVE_ANIMATION_DURATION).attr("y", (entry, index) => yScale(index) + yScale.bandwidth()/ 2 + 5), undefined, 
        elemToRemove => elemToRemove.transition().duration(REMOVE_ANIMATION_DURATION).attr("y", START_LOC).remove()
        )
        .text(entry => `${entry.flag} ${entry.name}`)
        .attr("class", "label")
        .attr('x', 10)
        .transition()
        .duration(MAIN_ANIMATION_DURATION)
        .attr("y", (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5 )

            
    }, [data, dimensions]);

    return (
        <div ref={wrapperRef} style={{marginBottom: "2rem"}}>
            <svg ref={svgRef}></svg>
        </div>
    )

}

export default AnimatedBarChart