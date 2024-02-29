import * as icon from "../../assets/icons/navIcons";
import "./Nav.css";
import LoginModal  from "../LoginModal/LoginModal"
import { useState } from "react";
import { createPortal } from "react-dom";

function Nav() {
    const [ isActiveLoginPanel, setIsActiveLoginPanel ] = useState<boolean>(false)
    const  [ searchValue , setSearchValue ] = useState<string>("");

    return (
        <div className="nav--wrap">
                <ul className="menu--wrap">
                    <li>Mens</li>
                    <li>Womens</li>
                    <li>Kids</li>
                </ul>
            <div className="icons--wrap">
                    <div className="search-box">
                        <button className="btn-search"><img src={icon.search} alt="Search button"/></button>
                        <input type="text" className="input-search" placeholder="Type to search..."/>
                    </div>
                <div><img src={icon.heart} alt="Favourites button"/></div>
                <div><img onClick={() => {setIsActiveLoginPanel(true)}} src={icon.avatar} alt="Avatar button"/></div>
            </div>
            { isActiveLoginPanel && createPortal(<LoginModal setIsActiveLoginPanel={setIsActiveLoginPanel} />, document.body)}
        </div>
);
}

export default Nav;