import * as icon from "../../assets/icons/navIcons";
import "./Nav.css";
import LoginModal  from "../LoginModal/LoginModal"
import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "../LoginModal/Modal/Modal";
import { AnimatePresence } from "framer-motion";
function Nav() {
    const [ isActiveLoginPanel, setIsActiveLoginPanel ] = useState<boolean>(false)
    const  [ searchValue , setSearchValue ] = useState<string>("");

    return (
        <div className="nav--wrap">
                <ul className="menu--wrap">
                    <li>Men</li>
                    <li>Women</li>
                    <li>Kids</li>
                </ul>
            <div className="icons--wrap">
                    <div className="search-box">
                        <button onClick={(event) => {event.currentTarget.focus()}} className="btn-search"><img src={icon.search} alt="Search button"/></button>
                        <input type="text" className="input-search" placeholder="Type to search..."/>
                    </div>
                <div><img src={icon.heart} alt="Favourites button"/></div>
                <div><img onClick={() => {setIsActiveLoginPanel(true)}} src={icon.avatar} alt="Avatar button"/></div>
            </div>
            <AnimatePresence>
                {isActiveLoginPanel && <Modal setIsActiveLoginPanel={setIsActiveLoginPanel}></Modal>}
            </AnimatePresence>
        </div>
    );
}

export default Nav;