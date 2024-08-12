import "./DetailedView.css"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as icons from "../../assets/icons/navIcons";
import image from "./air-jordan-4-retro-sb-pine-green-tnrs8GeNwpUbX2iP0eAUK8neMftEH9.png";

interface SearchDataItem {
    _id: string,
    brand: string,
    color: string,
    gender: string,
    price: string,
    sold: string,
    img: string
    name: string
}

function DetailedView() {
    const { name } = useParams();
    const [ itemData, setItemData ] = useState<SearchDataItem | {}>({})
    const sizeArray = [ 36, 36.5, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 45.5, 46, 46.5, 47, 47.5 ]
    const [ toggleFaves, setToggleFaves ] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const favesHandler = () => {
        if(toggleFaves === "") setToggleFaves("detailed__favourites-active")
        if(toggleFaves === "detailed__favourites-active") setToggleFaves("")
    }
    const fetchData = async () => {
        if (name) {

        }
    }
    return(
        <main className="detailed">
            <div className="detailed__content">
                <div className="detailed__image-wrap">
                    <img className="detailed__image" src={image} alt="Sneaker" />
                </div>
                <div className="detailed__info-wrap">
                    <div>
                        <h2 className="detailed__name">Air Jordan 4 SB</h2>
                        <p className="detailed__price-tag">1299,99 zł</p>
                        <p className="detailed__color-tag">Color: green / white</p>
                    </div>
                        <div className="detailed__size-desc">
                            <p>Choose size</p>
                            <p>Size chart</p>
                        </div>
                        <div className="detailed__size-table">
                            {sizeArray.map((item, index) => {
                                return (
                                    <div key={index} className="detailed__size-item">
                                        {item}
                                    </div>
                                )
                            })}
                        </div>
                    <div className="detailed__buttons-wrap">
                        <button className={`detailed__favourites ${toggleFaves}`} onClick={favesHandler}>
                            <span>Favourites</span>
                            <img className="detailed__button-icon basket" src={icons.heart} alt="Add to favourites icon"/>
                        </button>
                        <button className="detailed__button-basket">
                            <span>Add to Bag</span>
                            <img className="detailed__button-icon basket filter-white" src={icons.shoppingBag} alt="Add to basket icon"/>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default DetailedView;