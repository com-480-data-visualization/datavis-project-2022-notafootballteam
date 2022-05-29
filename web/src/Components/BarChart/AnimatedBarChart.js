import React, { useRef, useEffect, useState} from "react";
import {select, scaleBand, scaleLinear, max, csv, scalePow} from "d3";
import useResizeObserver from "../../Utils/useResizeObserver";
import Please from "pleasejs"

const getFlagEmoji = (countryCode) => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }



const randomColors =  Please.make_color({
        golden: true,
        saturation : 0.5,
        value: 0.8,
        colors_returned: 10,
        format: 'rgb-string'
    });


function AnimatedBarChart({data}) {
    const svgRef = useRef()
    const wrapperRef = useRef()
    const dimensions = useResizeObserver(wrapperRef)

    useEffect(() => {
        const svg = select(svgRef.current)
        if(!dimensions) return;

        // sort the data
       // data.sort((a, b) => b.value - a.value)
       // const top10 = data.slice(0, 10)
        //top10.sort((a, b) => b.value - a.value)



        const yScale = scaleBand()
                        .domain(data.map((value, index) => index))
                        .range([0, dimensions.height])
                        .paddingInner(0.1)

        const xScale = scaleLinear()
                        .domain([0, max(data, entry => Math.pow(2, 8))])
                        .range([0, dimensions.width])
        
        
        const START_LOC = 230
        const MAIN_ANIMATION_DURATION = 3000
        const REMOVE_ANIMATION_DURATION = 1000

        // draw the bars
        svg.selectAll(".bar")
            .data(data, (entry, index) => {
                return Math.pow(2,entry['Life Ladder'])
            })
            .join(enter => enter.append("rect").attr("y", START_LOC).transition().duration(REMOVE_ANIMATION_DURATION).attr("y", (entry, index) => yScale(index)), undefined, 
            elemToRemove => elemToRemove.transition().duration(REMOVE_ANIMATION_DURATION).attr("y", START_LOC).remove())
            .attr("fill", (entry, index) => `${randomColors[index]}`)
            .attr("class", "bar")
            .attr("x", 0)
            .attr("height", yScale.bandwidth())
            .transition()
            .duration(MAIN_ANIMATION_DURATION)
            .attr("width", entry => xScale(Math.pow(2,entry['Life Ladder'])))
            .attr("y", (entry, index) => yScale(index));

        // draw the labels 
        svg
        .selectAll(".label")
        .data(data, (entry, index) => entry['Country name'])
        .join(enter => enter.append("text").attr("y", START_LOC).transition().duration(REMOVE_ANIMATION_DURATION).attr("y", (entry, index) => yScale(index) + yScale.bandwidth()/ 2 + 5), undefined, 
        elemToRemove => elemToRemove.transition().duration(REMOVE_ANIMATION_DURATION).attr("y", START_LOC).remove()
        )
        .text(entry => `${getFlagEmoji(entry['iso_2'])} ${entry['Country name']}`)
        .attr("class", "label")
        .attr('x', 10)
        .raise()
        .transition()
        .duration(MAIN_ANIMATION_DURATION)
        .attr("y", (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5 );

            
    }, [data, dimensions]);

    return (
        <div ref={wrapperRef} style={{marginBottom: "2rem"}}>
            <svg ref={svgRef}></svg>
        </div>
    )

}

export default AnimatedBarChart