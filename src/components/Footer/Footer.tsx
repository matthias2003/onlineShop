import * as icon from "../../assets/icons/footerIcons";

import "./Footer.css";
function Footer() {
    return (
        <div className="footer">
            <div className="main--row">
                <div>
                    <p>Customer Service</p>
                    <ul>
                        <li>Contact Us</li>
                        <li>Size Guide</li>
                        <li>Order Tracking</li>
                        <li>Shipping & Delivery</li>
                    </ul>
                </div>
                <div>
                    <p>About The Sneakers</p>
                    <ul>
                        <li>About Us</li>
                        <li>Careers</li>
                    </ul>
                </div>
                <div>
                    <p>Socials</p>
                    <div className="img--wrap">
                        <img src={icon.twitter} alt="Twitter" />
                        <img src={icon.facebook} alt="Facebook" />
                        <img src={icon.instagram} alt="Instagram" />
                        <img src={icon.tiktok} alt="TikTok" />
                    </div>
                </div>
                <div>
                    <p>Join The Pack</p>
                    <p>Turn daily notifications via e-mail to be up to date with our freshly added sneakers.</p>
                    <input placeholder="Enter your email"></input>
                    <button>Sign Up</button>
                </div>
            </div>
            <div className="payments--row">
                <p>Payments Methods</p>
                <div className="icons--wrap">
                    <img src={icon.mastercard} alt="Mastercard" />
                    <img src={icon.visa} alt="Visa" />
                    <img src={icon.amex} alt="Amex" />
                    <img src={icon.applePay} alt="Apple Pay" />
                    <img src={icon.payPall} alt="Pay Pall" />
                </div>
            </div>
        </div>
    )
}

export default Footer;