import * as icon from "../../assets/icons/navIcons";
import "./Nav.css";
import {useState} from "react";

function Nav() {

    const  [ searchValue , setSearchValue ] = useState("");

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
                <div><img src={icon.avatar} alt="Avatar button"/></div>
            </div>
        </div>
    );
}

export default Nav;