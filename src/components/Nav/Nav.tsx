import * as icon from "../../assets/icons/icons";
import "./Nav.css";

function Nav() {
    return (
        <div className="nav--wrap">
                <ul className="menu--wrap">
                    <li>Mens</li>
                    <li>Womens</li>
                    <li>Kids</li>
                </ul>
            <div className="icons--wrap">
                <div><img src={icon.search} alt="Search button"/></div>
                <div><img src={icon.heart} alt="Favourites button"/></div>
                <div><img src={icon.avatar} alt="Avatar button"/></div>
            </div>
        </div>
    );
}

export default Nav;