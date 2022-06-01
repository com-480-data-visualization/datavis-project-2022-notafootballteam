import React, { useRef, useEffect } from "react";
import { select, scaleBand, scaleLinear, max } from "d3";
import useResizeObserver from "../../Utils/useResizeObserver";
import './ScatterPlot.css';

export default function ScatterPlot(props) {
    const svgRef = useRef()
    const wrapperRef = useRef()
    const dimensions = useResizeObserver(wrapperRef)

    // props.data == []

    useEffect(() => {
        const svg = select(svgRef.current)
        if (!dimensions) return;



    }, [props.data, dimensions]);

    return (
        <div id='scatter-plot' ref={wrapperRef}>
            <h2>Scatterplot</h2>
            <svg ref={svgRef}></svg>
        </div>
    )

};