import React from 'react'
import './Box.css'

export default function Box(props) {
    return (
        <div className='box' id={props.id}>
            {props.children}
        </div>
    )
}