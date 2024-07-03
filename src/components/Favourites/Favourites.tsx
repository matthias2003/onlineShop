import "./Favourites.css"
import heart from "../../assets/images/broken-heart.png";
import { useAuth } from "../../hooks/useAuth";

function Favourites() {
    const { auth } = useAuth();
    return (
        <main className="favourites">
            {auth.token ?
                <div className="favourites__container">
                    <img className="favourites__image-empty" src={heart} alt="Broken heart"/>
                    <h2 className="favourites__headline">Nothing to display here!</h2>
                </div>
                :
                <div className="favourites__container">
                    <img className="favourites__image-empty" src={heart} alt="Broken heart"/>
                    <h2 className="favourites__headline">You have to login first!</h2>
                </div>
            }

        </main>
    )
}

export default Favourites;