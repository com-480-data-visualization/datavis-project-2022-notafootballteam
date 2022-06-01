import React, { useRef, useEffect } from "react";
import { select, scaleBand, scaleLinear, max } from "d3";
import useResizeObserver from "../../Utils/useResizeObserver";
import './ScatterPlot.css';

export default function ScatterPlot(props) {
    const svgRef = useRef()
    const wrapperRef = useRef()
    const dimensions = useResizeObserver(wrapperRef)

    useEffect(() => {
        
    }, [props.data, dimensions]);

    return (
        <div id='scatter-plot' ref={wrapperRef}>
            <svg ref={svgRef}></svg>
        </div>
    )

};