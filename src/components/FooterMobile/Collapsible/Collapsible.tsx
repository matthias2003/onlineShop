import "./Collapsible.css"
import * as icon from "../../../assets/icons/footerIcons";
import React, {useState} from "react";

function Collapsible(props:any) {
    const [ isExpanded, setIsExpanded ] = useState(false);

    return (
        <div className={`collapsible ${isExpanded ? "expanded":""}`} >
            <div className="header" onClick={() => setIsExpanded(!isExpanded)}>
                {props.title}
                <img className={`collapse--arrow ${isExpanded ? "collapse--arrow--down":"collapse--arrow--up"}`}
                     src={icon.arrowDown} alt={"Arrow down"}/>
            </div>
            <div className="content">
                {props.children}
            </div>
        </div>
    )
}

export default Collapsible;