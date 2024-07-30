import "./Nav.css";
import Backdrop from "../Backdrop/Backdrop";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { Link, useNavigate } from "react-router-dom";
import * as icon from "../../assets/icons/navIcons";
import logo from "../../assets/logo/logo.svg";
import { useAuth } from "../../hooks/useAuth"
import Modal from "../Modal/Modal";
import { useLogout } from "../../hooks/useLogout";

function Nav() {
    const [ isActiveLoginPanel, setIsActiveLoginPanel ] = useState<boolean>(false)
    const [ searchValue , setSearchValue ] = useState<string>("");
    const [ isActiveSideNav, setIsActiveSideNav ] = useState<boolean>(false)
    const [ toggleButton, setToggleButton ] = useState<boolean>(false)
    const sideNavRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const logout = useLogout();
    const { auth } = useAuth();

    useEffect(() => {
        if (isActiveSideNav) {
            disableBodyScroll(sideNavRef as unknown as Element | HTMLElement);
        } else {
            enableBodyScroll(sideNavRef as unknown as Element | HTMLElement);
            setToggleButton(false);
        }


    },[isActiveSideNav]);

    const logoutHandler = async () => {
        await logout();
        navigate("/");
    }

    const profileHandler = async () => { // ONLY FOR DEV, NEED TO REWORK IN THE FUTURE
        const loggedIn = auth.token
        if (!loggedIn) {
            setIsActiveLoginPanel(true);
        }
    }

    const searchHandler = () => {
        let searchParam = searchValue.trim().replaceAll(" ","+").toLowerCase();
        if (searchParam) {
            navigate(`/search/${searchParam}`)
        }
    }

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
                        className="aside-nav"
                        variants={optionsSideNav}
                        ref={sideNavRef}
                        initial="initial"
                        transition={{ type: "ease"}}
                        animate="shown"
                        exit="closed">
                        <motion.div>

                            {/*<button className="aside-nav__close" onClick={() => {*/}
                            {/*    setIsActiveSideNav(!isActiveSideNav)*/}
                            {/*}}>*/}
                            {/*    <img className="aside-nav__icon" src={icon.close} alt="Close"/>*/}
                            {/*</button>*/}

                            <div className="aside-nav__logo-wrap">
                                <Link to="/" onClick={() => { setIsActiveSideNav(!isActiveSideNav) }}>
                                    <img className="aside-nav__logo" src={logo} alt="Logo" />
                                </Link>
                            </div>

                            <div className="aside-nav__underline"></div>

                            <div className="nav__mobile">
                                <ul className="nav__mobile-list">
                                    <Link to="/stock/men" onClick={() => {
                                        setIsActiveSideNav(!isActiveSideNav)}} >
                                    <li className="nav__mobile-item">
                                        <div className="nav__mobile-content">
                                            <p className="nav__mobile-p">Men</p>
                                            <img className="nav_mobile-arrow" src={icon.arrow} alt="Arrow icon"/>
                                        </div>
                                    </li>
                                    </Link>
                                        <Link to="/stock/women" onClick={() => {
                                            setIsActiveSideNav(!isActiveSideNav)}} >
                                    <li className="nav__mobile-item">
                                        <div className="nav__mobile-content">
                                            <p className="nav__mobile-p">Women</p>
                                            <img className="nav_mobile-arrow" src={icon.arrow} alt="Arrow icon"/>
                                        </div>
                                    </li>
                                        </Link>
                                    <Link to="/stock/kids" onClick={() => {
                                        setIsActiveSideNav(!isActiveSideNav)}} >
                                        <li className="nav__mobile-item">
                                            <div className="nav__mobile-content">
                                                <p className="nav__mobile-p">Kids</p>
                                                <img className="nav_mobile-arrow" src={icon.arrow} alt="Arrow icon"/>
                                            </div>
                                        </li>
                                    </Link>
                                </ul>
                            </div>

                            <div className="nav__mobile">
                                <ul className="nav__mobile-list">
                                    <Link to="/profile" onClick={() => {
                                        setIsActiveSideNav(!isActiveSideNav)}} >
                                        <li className="nav__mobile-item">
                                            <div className="nav__mobile-content">
                                                <p className="nav__mobile-p">Profile</p>
                                                <img className="nav_mobile-arrow" src={icon.arrow} alt="Arrow icon"/>
                                            </div>
                                        </li>
                                    </Link>
                                    <Link to="/favourites" onClick={() => {
                                        setIsActiveSideNav(!isActiveSideNav)}}>
                                        <li className="nav__mobile-item">
                                            <div className="nav__mobile-content">
                                                <p className="nav__mobile-p">Favourites</p>
                                                <img className="nav_mobile-arrow" src={icon.arrow} alt="Arrow icon"/>
                                            </div>
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                        </motion.div>
                    </motion.aside>
                </Backdrop>
            }
            </AnimatePresence>

        <nav className="nav">
            <div className="nav__container">
                <button className={ !toggleButton ? "nav__burger" : "nav__burger opened"}
                        onClick={() => {
                            setToggleButton(!toggleButton);
                            setIsActiveSideNav(!isActiveSideNav);
                        }}
                >
                    <svg width="100" height="100" viewBox="0 0 100 100">
                        <path className="line line1"
                              d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"/>
                        <path className="line line2" d="M 20,50 H 80"/>
                        <path className="line line3"
                              d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"/>
                    </svg>
                </button>
                <ul className="nav__menu">
                    <Link to="/stock/men" className="nav__menu-link"><li className="nav__menu-item">Men</li></Link>
                    <Link to="/stock/women" className="nav__menu-link"><li className="nav__menu-item">Women</li></Link>
                    <Link to="/stock/kids" className="nav__menu-link"><li className="nav__menu-item">Kids</li></Link>
                </ul>
                <Link to="/" className="nav__logo"><img className="nav__logo" src={logo} alt="Logo"/></Link>
                <div className="nav__icons">
                    <div className="nav__search-wrap">
                        <input className="nav__search-input" type="text" value={searchValue}
                           onChange={(event) => {
                            setSearchValue(event.target.value)}}
                            onKeyDown={ (event) => { if(event.key === "Enter") searchHandler() }}
                            placeholder={"Search"}/>
                        <button onClick={searchHandler} className="nav__button nav__button--search"><img className="nav__icon nav__icon--search"
                                                                                 src={icon.search} alt="Search"/></button>
                    </div>
                    <button className="nav__button nav__button-heart" onClick={() => navigate("/favourites")}><img className="nav__icon"
                                                                                                 src={icon.heart}
                                                                                                 alt="Favourites button"/>
                    </button>
                    <button className="nav__button" onClick={profileHandler}>
                        <img className="nav__icon" src={Object.keys(auth).length ? icon.avatarLoggedIn : icon.avatar} alt="Avatar button"/>
                    </button>
                    { auth.token ?
                    <div className="nav__dropdown">
                        <div className="dropdown__links">
                            <Link to="/profile" className="dropdown__link"><p>Profile</p></Link>
                            <Link to="/favourites" className="dropdown__link"><p>Favourites</p></Link>
                            <Link to="/profile/orders" className="dropdown__link"><p>Orders</p></Link>
                            <Link to="/profile/settings" className="dropdown__link"><p>Settings</p></Link>
                            <p className="dropdown__logout" onClick={logoutHandler}>Logout</p>
                        </div>
                    </div> : "" }
                </div>

                <AnimatePresence>
                {isActiveLoginPanel && <Modal isActiveLoginPanel={isActiveLoginPanel} setIsActiveLoginPanel={setIsActiveLoginPanel}></Modal>}
                </AnimatePresence>
            </div>
        </nav>
    </>
    );
}

export default Nav;