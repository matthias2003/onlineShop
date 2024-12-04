import { useAuth } from "../../hooks/useAuth";
import { useLocalStorage } from "usehooks-ts";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Faves} from "../../utilities/interfaces";
import heart from "../../assets/images/broken-heart.svg";
import "./Favourites.css";

function Favourites() {
    const { auth } = useAuth();
    const [ faves, setFaves ] = useLocalStorage<Faves>('faves', {});
    const navigate = useNavigate();
    const [ toggleFaves, setToggleFaves ] = useState("filter-red");

    const detailedViewHandler = ( id: string ) => {
        navigate(`/items/${id}`);
    };

    const favesHandler = ( e:React.MouseEvent<HTMLElement, MouseEvent>, id: string ) => {
        e.stopPropagation();
        if(toggleFaves === "filter-red") {
            const { [id]: _, ...remainingFaves } = faves;
            setFaves(remainingFaves);
        }
    };

    return (
        <main className="favourites">
            <h4 className="collection__headline">Favourites</h4>
            { auth.token && Object.entries(faves).length > 0 ?
                <div className="favourites__container">
                    { Object.entries(faves).map((item) =>
                        (
                            <div onClick={() => { detailedViewHandler(item[1]._id) }} className="favourites__item" key={item[1]._id}>
                                <div className="favourites__image-wrap">
                                    <img className="favourites__image" src={item[1].img} alt="Favourites sneaker"/>
                                    <figure className="favourites__icon-heart" onClick={( e ) => { favesHandler(e,item[1]._id) }}>
                                        <svg className={`favourites__heart ${toggleFaves}`}
                                             viewBox="0 0 24 24" role="img"
                                             xmlns="http://www.w3.org/2000/svg" aria-labelledby="favouriteIconTitle"
                                             stroke="#000000" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round"
                                             fill="none" color="#000000">
                                            <title id="favouriteIconTitle">Favourite</title>
                                            <path d="M12,21 L10.55,19.7051771 C5.4,15.1242507 2,12.1029973 2,8.39509537 C2,5.37384196 4.42,3 7.5,3 C9.24,3 10.91,3.79455041 12,5.05013624 C13.09,3.79455041 14.76,3 16.5,3 C19.58,3 22,5.37384196 22,8.39509537 C22,12.1029973 18.6,15.1242507 13.45,19.7149864 L12,21 Z"/>
                                        </svg>
                                    </figure>
                                </div>
                                <p className="favourites__desc">{ item[1].name }</p>
                                <p className="favourites__desc">{ item[1].price }</p>
                            </div>
                        ))}
                </div>
                :
                <div className="favourites__container empty">
                    <div className="favourites__empty-content">
                        <img className="favourites__image-empty" src={heart} alt="Broken heart"/>
                        <h2 className="favourites__headline">{ auth.token ? "Nothing to display here!" : "You have to login first!" }</h2>
                    </div>
                </div>
            }
        </main>
    )
}

export default Favourites;