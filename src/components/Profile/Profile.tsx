import { Link } from "react-router-dom";
import { useUserData } from "../../hooks/useUserData";
import * as icon from "../../assets/icons/profileIcons";
import "./Profile.css";

function Profile() {
    const { userData } = useUserData();

    return(
        <main className="profile">
            <div className="profile__dashboard-wrap">
                <div className="profile__avatar">
                    <div className="avatar__image-wrap">
                        <img className="profile__avatar-img" src={userData.profilePicture} alt="Profile picture"/>
                    </div>
                    <p className="profile__name">
                        { userData.name + " " + userData.surname }
                    </p>
                </div>
                <div className="profile__action-box">
                    <h2 className="profile__headline margin-bottom">Hi, { userData.name }!</h2>
                    <p className="profile__with-us">With us since 2018!</p>
                    <div className="profile__menu-wrap">
                        <div className="profile__menu-item">
                            <img className="profile__menu-img" src={icon.location} alt="Saved addresses"/>
                            <Link to="/profile/settings" className="profile__menu-link"><p>Saved addresses</p></Link>
                        </div>
                        <div className="profile__menu-item">
                            <img className="profile__menu-img" src={icon.orders} alt="Orders"/>
                            <Link to="/profile/orders" className="profile__menu-link"><p>Orders</p></Link>
                        </div>
                        <div className="profile__menu-item">
                            <img className="profile__menu-img" src={icon.heart} alt="Favourites"/>
                            <Link to="/favourites" className="profile__menu-link"><p>Favourites</p></Link>
                        </div>
                        <div className="profile__menu-item">
                            <img className="profile__menu-img" src={icon.payment} alt="Payment methods"/>
                            <Link to="/profile/settings" className="profile__menu-link"><p>Saved payment methods</p></Link>
                        </div>
                        <div className="profile__menu-item">
                            <img className="profile__menu-img" src={icon.settings} alt="Settings"/>
                            <Link to="/profile/settings" className="profile__menu-link"><p>Settings</p></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile__last-orders">
                <h2 className="profile__headline">Last orders</h2>
                <div className="profile__orders-wrap">
                    <div className="profile__order">
                    </div>
                    <div className="profile__order">
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Profile;
