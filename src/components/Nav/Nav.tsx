import * as icon from "../../assets/icons/navIcons";
import "./Nav.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { AnimatePresence } from "framer-motion";
function Nav() {
    const [ isActiveLoginPanel, setIsActiveLoginPanel ] = useState<boolean>(false)
    const  [ searchValue , setSearchValue ] = useState<string>("");

    return (
        <nav className="nav">
                <ul className="nav__menu">
                    <li className="nav__menu-item">Men</li>
                    <li className="nav__menu-item">Women</li>
                    <li className="nav__menu-item">Kids</li>
                </ul>
            <div className="nav__icons">
                <div className="nav__search-wrap">
                        <input className="nav__search-input" type="text" value={searchValue} onChange={(event) => {setSearchValue(event.target.value)}} placeholder={"Search"} />
                        <button className="nav__button nav__button--search"><img className="nav__icon nav__icon--search" src={icon.search} alt="Search" /></button>
                </div>
                <button className="nav__button"><img className="nav__icon" src={icon.heart} alt="Favourites button"/></button>
                <button className="nav__button" onClick={() => {setIsActiveLoginPanel(true)}}><img className="nav__icon" src={icon.avatar} alt="Avatar button"/></button>
            </div>
            <AnimatePresence>
                { isActiveLoginPanel && <Modal setIsActiveLoginPanel={setIsActiveLoginPanel}></Modal> }
            </AnimatePresence>
        </nav>
    );
}

export default Nav;