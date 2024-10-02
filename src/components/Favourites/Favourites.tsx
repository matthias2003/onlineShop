import "./Favourites.css"
import heart from "../../assets/images/broken-heart.png";
import { useAuth } from "../../hooks/useAuth";
import {useLocalStorage} from "usehooks-ts";
import {useEffect} from "react";

interface SearchDataItem {
    _id: string,
    brand: string,
    color: string,
    gender: string,
    price: string,
    sold: number,
    img: string
    name: string
}

interface Faves {
    [key: string]: SearchDataItem;
}

function Favourites() {
    const { auth } = useAuth();
    const [ faves, setFaves ] = useLocalStorage<Faves>('faves',{})

    return (
        <main className="favourites">
            <h4 className="collection__headline">Favourites</h4>
            {auth.token && Object.entries(faves).length > 0 ?
                <div className="favourites__container">
                    {Object.entries(faves).map((item) =>
                        (
                            <div className="favourites__item" key={item[1]._id}>
                                <div className="favourites__image-wrap">
                                    <img className="favourites__image" src={item[1].img}/>
                                </div>
                                <p className="favourites__desc">{item[1].name}</p>
                                <p className="favourites__desc">{item[1].price}</p>
                            </div>
                        ))}
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