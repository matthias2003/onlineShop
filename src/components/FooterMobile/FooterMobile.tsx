import "./FooterMobile.css";
import * as icon from "../../assets/icons/footerIcons";
import { useCollapse } from "react-collapsed";
import React, { useRef, useState} from "react";
import Collapsible from "./Collapsible/Collapsible";
function FooterMobile() {
    const [ height, setHeight] = useState(0);

    return (
    <div className={"footer--mobile"}>
        <Collapsible title={<h4>Customer Service</h4>}>
        <ul>
                <li>Contact Us</li>
                <li>Size Guide</li>
                <li>Order Tracking</li>
                <li>Shipping & Delivery</li>
            </ul>
        </Collapsible>

        <Collapsible title={<h4>About The Sneakers</h4>}>
            <ul>
            <li>About Us</li>
                <li>Careers</li>
            </ul>
        </Collapsible>

        <Collapsible title={<h4>Socials</h4>}>
            <div className="img--wrap--mobile">
                <img src={icon.twitter} alt="Twitter"/>
                <img src={icon.facebook} alt="Facebook"/>
                <img src={icon.instagram} alt="Instagram"/>
                <img src={icon.tiktok} alt="TikTok"/>
            </div>
        </Collapsible>

        <Collapsible title={<h4>Join The Pack</h4>}>
            <p>Turn daily notifications via e-mail to be up to date with our freshly added sneakers.</p>
            <div className="form--wrap--mobile">
                <input placeholder="Enter your email"></input>
                <button><img src={icon.sign} alt="Sign into newsletter"/></button>
            </div>
        </Collapsible>

        <Collapsible title={<h4>Payments Methods</h4>}>
            <div className="icons--wrap--mobile">
                <img src={icon.mastercard} alt="Mastercard"/>
                <img src={icon.visa} alt="Visa"/>
                <img src={icon.amex} alt="Amex"/>
                <img src={icon.applePay} alt="Apple Pay"/>
                <img src={icon.payPall} alt="Pay Pall"/>
            </div>
        </Collapsible>
    </div>
    )
}

export default FooterMobile;