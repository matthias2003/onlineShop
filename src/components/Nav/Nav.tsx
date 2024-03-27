import * as icon from "../../assets/icons/navIcons";
import "./Nav.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { AnimatePresence } from "framer-motion";
function Nav() {
    const [ isActiveLoginPanel, setIsActiveLoginPanel ] = useState<boolean>(false)
    const  [ searchValue , setSearchValue ] = useState<string>("");

    return (
        <nav className="nav--wrap">
                <ul className="menu--wrap">
                    <li>Men</li>
                    <li>Women</li>
                    <li>Kids</li>
                </ul>
            <div className="icons--wrap">
                <div className={"search-box"}>
                        <input type={"text"} value={searchValue} onChange={(event) => {setSearchValue(event.target.value)}} className={"search-bar-input"} placeholder={"Search"} />
                        <button className={"search-button"}><img src={icon.search} alt={"Search"}/></button>
                </div>
                <div><img src={icon.heart} alt="Favourites button"/></div>
                <div><img onClick={() => {setIsActiveLoginPanel(true)}} src={icon.avatar} alt="Avatar button"/></div>
            </div>
            <AnimatePresence>
                {isActiveLoginPanel && <Modal setIsActiveLoginPanel={setIsActiveLoginPanel}></Modal>}
            </AnimatePresence>
        </nav>
    );
}

export default Nav;