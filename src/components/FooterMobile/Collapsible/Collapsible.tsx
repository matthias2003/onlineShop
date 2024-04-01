import "./Collapsible.css"
import * as icon from "../../../assets/icons/footerIcons";
import React, { useState } from "react";
function Collapsible( props:any ) {
    const [ isExpanded, setIsExpanded ] = useState(false);

    return (
        <div className={`collapsible ${isExpanded ? "collapsible--expanded":""}`} >
            <div className="collapsible__header" onClick={() => setIsExpanded(!isExpanded)}>
                {props.title}
                <img className={`collapsible__collapse-arrow ${isExpanded ? "collapsible__collapse-arrow--down":"collapsible__collapse-arrow--up"}`}
                     src={icon.arrowDown} alt="Arrow down"/>
            </div>
            <div className="collapsible__content">
                {props.children}
            </div>
        </div>
    )
}

export default Collapsible;