import * as icon from "../../assets/icons/navIcons";
import "./Nav.css";
import Backdrop from "../Backdrop/Backdrop";
import {useEffect, useRef, useState} from "react";
import Modal from "../Modal/Modal";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
function Nav() {
    const [ isActiveLoginPanel, setIsActiveLoginPanel ] = useState<boolean>(false)
    const  [ searchValue , setSearchValue ] = useState<string>("");
    const [ isActiveSideNav, setIsActiveSideNav ] = useState<boolean>(false)
    const sideNavRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isActiveSideNav) {
            disableBodyScroll(sideNavRef as unknown as Element | HTMLElement);
        } else {
            enableBodyScroll(sideNavRef as unknown as Element | HTMLElement);
        }
    },[isActiveSideNav]);


    const optionsSideNav = {
        initial: {
            x: "-100vw",
        },
        shown: {
            x:"0",
        },
        closed: {
            x:"-100vw",
        }
    };

    return (
        <>
            <AnimatePresence>
            { isActiveSideNav &&
                <Backdrop setIsActive={setIsActiveSideNav}>
                    <motion.aside
                        onClick={( event ) => { event.stopPropagation() }}
                        className={"aside-nav"}
                        variants={optionsSideNav}
                        ref={sideNavRef}
                        initial="initial"
                        transition={{ type: "ease"}}
                        animate="shown"
                        exit="closed">
                        <motion.div
                        >
                            <button className="aside-nav__close" onClick={() => {
                                setIsActiveSideNav(!isActiveSideNav)
                            }}>
                                <img className="aside-nav__icon" src={icon.arrow} alt="Close"/>
                            </button>
                            <ul className="nav__mobile">
                                <li className="nav__mobile-item">Men</li>
                                <li className="nav__mobile-item">Women</li>
                                <li className="nav__mobile-item">Kids</li>
                            </ul>
                        </motion.div>
                    </motion.aside>
                </Backdrop>
            }
            </AnimatePresence>
            <nav className="nav">
                <button className="nav__burger" onClick={() => {
                    setIsActiveSideNav(!isActiveSideNav)}}>
                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 18H10" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M4 12L16 12" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M4 6L20 6" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>
                <ul className="nav__menu">
                    <li className="nav__menu-item">Men</li>
                    <li className="nav__menu-item">Women</li>
                    <li className="nav__menu-item">Kids</li>
                </ul>
                <div className="nav__icons">
                    <div className="nav__search-wrap">
                        <input className="nav__search-input" type="text" value={searchValue} onChange={(event) => {
                            setSearchValue(event.target.value)
                        }} placeholder={"Search"}/>
                        <button className="nav__button nav__button--search"><img className="nav__icon nav__icon--search"
                                                                                 src={icon.search} alt="Search"/></button>
                    </div>
                    <button className="nav__button"><img className="nav__icon" src={icon.heart} alt="Favourites button"/>
                    </button>
                    <button className="nav__button" onClick={() => {
                        setIsActiveLoginPanel(true)
                    }}><img className="nav__icon" src={icon.avatar} alt="Avatar button"/></button>
                </div>
                <AnimatePresence>
                    {isActiveLoginPanel && <Modal isActiveLoginPanel={isActiveLoginPanel} setIsActiveLoginPanel={setIsActiveLoginPanel}></Modal>}
                </AnimatePresence>
            </nav>
        </>
    );
}

export default Nav;