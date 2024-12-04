import { useState, useEffect, FormEvent } from "react";
import { newsletterSingUp } from "../../requests";
import FooterMobile from "../FooterMobile/FooterMobile";
import * as icon from "../../assets/icons/footerIcons";
import "./Footer.css";

function Footer() {
    const [ width, setWidth ] = useState<number>(window.innerWidth);
    const [ newsletter, setNewsletter ] = useState<string>("");

    useEffect( () => {
        const handleWindowResize = () => { setWidth(window.innerWidth) };
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    const newsletterSubmit = async ( event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        if (newsletter) {
            await newsletterSingUp(newsletter);
        } else {
            return;
        }
    };

    return (
        <>
            { width > 776 ?
            <div className="footer">
                <div className="footer__main-row">
                    <div>
                        <h4>Customer Service</h4>
                        <ul className="footer__list">
                            <li>Contact Us</li>
                            <li>Size Guide</li>
                            <li>Order Tracking</li>
                            <li>Shipping & Delivery</li>
                        </ul>
                    </div>
                    <div>
                        <h4>About The Sneakers</h4>
                        <ul className="footer__list">
                            <li>About Us</li>
                            <li>Careers</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Socials</h4>
                        <div className="footer__socials">
                            <img src={ icon.twitter } alt="Twitter" />
                            <img src={ icon.facebook } alt="Facebook" />
                            <img src={ icon.instagram } alt="Instagram" />
                            <img src={ icon.tiktok } alt="TikTok" />
                        </div>
                    </div>
                    <div>
                        <h4>Join The Pack</h4>
                        <p>Turn daily notifications via e-mail to be up to date with our freshly added sneakers.</p>
                        <div className="footer__form">
                            <form onSubmit={ newsletterSubmit }>
                                <input value={newsletter} onChange={( e ) => { setNewsletter(e.target.value) }} placeholder="Enter your email"></input>
                                <button><img className="footer__button-icon" src={icon.sign} alt="Sign into newsletter"/></button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="footer__payments">
                    <h4>Payments Methods</h4>
                    <div className="footer__payments-icons">
                        <img src={ icon.mastercard } alt="Mastercard" />
                        <img src={ icon.visa } alt="Visa" />
                        <img src={ icon.amex } alt="Amex" />
                        <img src={ icon.applePay } alt="Apple Pay" />
                        <img src={ icon.payPall } alt="Pay Pall" />
                    </div>
                </div>
            </div>
            :
            <FooterMobile />
            }
        </>
    )
}

export default Footer;