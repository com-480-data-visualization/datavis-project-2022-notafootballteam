import React, { useRef, useEffect } from "react";
import './Header.css';

export default function Header(props) {

    return (
        <div id='header'>
            <a href='#top'>Home</a>
            <a href='#box-2'>World Map</a>
            <a href='#box-3'>Country Card</a>
        </div>
    );
};