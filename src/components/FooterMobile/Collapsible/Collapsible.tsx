import "./Collapsible.css"
import * as icon from "../../../assets/icons/footerIcons";
import React, { useEffect, useRef, useState } from "react";

function Collapsible( props:any ) {
    const [ isExpanded, setIsExpanded ] = useState(false);
    const endDivRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        if (isExpanded) {
            setTimeout(() => {
                endDivRef.current?.scrollIntoView({
                    behavior: "smooth",
                });
            },100);
        }
    }, [isExpanded]);

    return (
        <div className="collapsible">
            <div className="collapsible__header" onClick={() => setIsExpanded(!isExpanded)}>
                {props.title}
                <img className={`collapsible__collapse-arrow ${isExpanded ? "collapsible__collapse-arrow--down":"collapsible__collapse-arrow--up"}`}
                     src={icon.arrowDown} alt="Arrow down"/>
            </div>
            <div ref={endDivRef} className={`collapsible__content ${isExpanded ? "collapsible--expanded":""}`}>
                {props.children}
            </div>
        </div>
    )
}

export default Collapsible;