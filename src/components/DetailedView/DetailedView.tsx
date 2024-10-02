import "./DetailedView.css"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDataById } from "../../requests";
import { useLocalStorage } from 'usehooks-ts'
import * as icons from "../../assets/icons/navIcons";

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

interface CartData {
    id:string
    name: string,
    color: string,
    price: string,
    img: string,
    size: number,
    quantity: number
}

interface Cart {
    [key: string]: CartData;
}

interface Faves {
    [key: string]: SearchDataItem;
}

function DetailedView() {
    const { name } = useParams();
    const [ itemData, setItemData ] = useState<SearchDataItem>({
        _id:'0',brand:"",color:"",gender:"",price:"",sold:0,img:"",name:""
    })
    const sizeArray = [ 36, 36.5, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 45.5, 46, 46.5, 47, 47.5 ]
    const [ toggleFaves, setToggleFaves ] = useState("");
    const [ selected, setSelected ] = useState<number>(0);
    const [ cart, setCart ] = useLocalStorage<Cart>('cart',{})
    const [ faves, setFaves ] = useLocalStorage<Faves>('faves',{})

    useEffect(() => {
        fetchData();
        window.scrollTo(0, 0)
    }, []);



    useEffect(() => {
        console.log("Updated faves:", faves);
    }, [faves]);

    const favesHandler = () => {
        if(toggleFaves === "") {
            setToggleFaves("filter-red ")
            setFaves({
                ...faves,
                [itemData._id]: itemData
            })
        }
        if(toggleFaves === "filter-red ")
        { setToggleFaves("")
            const key : string = itemData._id;
            const { [itemData._id]: _, ...remainingFaves } = faves;
            setFaves(remainingFaves);
        }
    }

    const fetchData = async () => {
        if (name) {
            const data = await getDataById(name);
            setItemData(data[0]);
        }
    }

    const addToCart = (itemData : SearchDataItem ) => {
        if (selected !== 0) {
            setCart((prevCart) => {
                const key = `${itemData._id}_${selected}`;
                if (prevCart[key]) {
                    if (prevCart[key].quantity < 10) {
                        return {
                            ...prevCart,
                            [key]: {
                                ...prevCart[key],
                                quantity: prevCart[key].quantity + 1
                            }
                        };
                    } else {
                        return prevCart
                    }
                } else {
                    return {
                        ...prevCart,
                        [key]: {
                            id: itemData._id,
                            name: itemData.name,
                            color: itemData.color,
                            price: itemData.price,
                            img: itemData.img,
                            size: selected,
                            quantity: 1
                        },
                    };
                }
            });
        }
    };


    return(
        <main className="detailed">
            <div className="detailed__content">
                <div className="detailed__image-wrap">
                    <img className="detailed__image" src={itemData.img} alt="Sneaker"/>
                </div>
                <div className="detailed__info-wrap">
                    <div>
                        <h2 className="detailed__name">{itemData.name}</h2>
                        <p className="detailed__price-tag">{itemData.price}</p>
                        <p className="detailed__color-tag">Color: {itemData.color}</p>
                    </div>

                    <div className="detailed__size-desc">
                        <p>Choose size</p>
                        <p>Size chart</p>
                    </div>
                    <div className="detailed__size-table">
                        {sizeArray.map((item, index) => {
                            return (
                                <div key={index}
                                     className={`detailed__size-item ${selected === item  ? "detailed__size-item--active" : ""}`}
                                     onClick={() => { if(item === selected) setSelected(0)
                                     else setSelected(item) }}
                                >
                                    {item}
                                </div>
                            )
                        })}
                    </div>
                    <div className="detailed__buttons-wrap">
                        <button className="detailed__favourites" onClick={favesHandler}>
                            <span>Favourites</span>
                            <svg className={`detailed__button-icon ${toggleFaves}`} width="25px" height="25px" viewBox="0 0 24 24" role="img"
                                 xmlns="http://www.w3.org/2000/svg" aria-labelledby="favouriteIconTitle"
                                 stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 fill="none" color="#000000"><title id="favouriteIconTitle">Favourite</title>
                                <path
                                    d="M12,21 L10.55,19.7051771 C5.4,15.1242507 2,12.1029973 2,8.39509537 C2,5.37384196 4.42,3 7.5,3 C9.24,3 10.91,3.79455041 12,5.05013624 C13.09,3.79455041 14.76,3 16.5,3 C19.58,3 22,5.37384196 22,8.39509537 C22,12.1029973 18.6,15.1242507 13.45,19.7149864 L12,21 Z"/>
                            </svg>
                        </button>
                        <button onClick={() => {
                            addToCart(itemData)
                        }}
                                className="detailed__button-basket">
                            <span>Add to Bag</span>
                            <img className={`detailed__button-icon filter-white`} src={icons.shoppingBag}
                                 alt="Add to basket icon"/>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default DetailedView;