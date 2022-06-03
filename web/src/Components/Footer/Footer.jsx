import React, { useRef, useEffect } from "react";
import './Footer.css';

export default function Footer(props) {

    return (
        <div id='footer'>
            Made Happily by Mohamed Elasfoury, Andrey Batasov, Stefan Rotarus.<br></br>
            Data Visualization Project, COM-480 course at École Polytechnique Fédérale de Lausanne (EPFL).<br></br>
            Full source code is hosted on <a href='https://github.com/com-480-data-visualization/datavis-project-2022-notafootballteam'>GitHub</a>.
        </div>
    );
};