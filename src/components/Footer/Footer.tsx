import * as icon from "../../assets/icons/footerIcons";
import { useState, useEffect } from "react";

import "./Footer.css";
import FooterMobile from "../FooterMobile/FooterMobile";
function Footer() {
    const [width, setWidth] = useState<number>(window.innerWidth);

    useEffect( () => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, [])


    return (
        <>
            {width > 776 ?
            <div className="footer">
                <div className="main--row">
                    <div>
                        <h4>Customer Service</h4>
                        <ul>
                            <li>Contact Us</li>
                            <li>Size Guide</li>
                            <li>Order Tracking</li>
                            <li>Shipping & Delivery</li>
                        </ul>
                    </div>
                    <div>
                        <h4>About The Sneakers</h4>
                        <ul>
                            <li>About Us</li>
                            <li>Careers</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Socials</h4>
                        <div className="img--wrap">
                            <img src={icon.twitter} alt="Twitter" />
                            <img src={icon.facebook} alt="Facebook" />
                            <img src={icon.instagram} alt="Instagram" />
                            <img src={icon.tiktok} alt="TikTok" />
                        </div>
                    </div>
                    <div>
                        <h4>Join The Pack</h4>
                        <p>Turn daily notifications via e-mail to be up to date with our freshly added sneakers.</p>
                        <div className="form--wrap">
                            <input placeholder="Enter your email"></input>
                            <button><img src={icon.sign} alt="Sign into newsletter"/></button>
                        </div>

                    </div>
                </div>
                <div className="payments--row">
                    <h4>Payments Methods</h4>
                    <div className="icons--wrap">
                        <img src={icon.mastercard} alt="Mastercard" />
                        <img src={icon.visa} alt="Visa" />
                        <img src={icon.amex} alt="Amex" />
                        <img src={icon.applePay} alt="Apple Pay" />
                        <img src={icon.payPall} alt="Pay Pall" />
                    </div>
                </div>
            </div>
                : <FooterMobile /> }
        </>
    )
}

export default Footer;