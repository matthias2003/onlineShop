import {useNavigate, useParams} from "react-router-dom";
import { getAggregatedData } from "../../requests";
import {useEffect, useRef, useState} from "react";
import "./Stock.css";

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
function Stock() {
    const urlParameter = useParams();
    const [ stockData, setStockData ] = useState<SearchDataItem[]>([])
    const navigate = useNavigate();
    const itemRef= useRef<HTMLParagraphElement | null>(null);
    useEffect(() => {
        fetchData();
    },[urlParameter])

    const fetchData = async () => {
        const data = await getAggregatedData(urlParameter);
        setStockData(data);
    }

    const detailedViewHandler = ( id: string ) => {
        navigate(`/items/${id}`)
    }

    return(
        <main className="collection">
            <h4 className="collection__headline">{`${urlParameter.gender?.charAt(0).toUpperCase()}${urlParameter.gender?.slice(1)}`}</h4>
            <div className="collection__container">
                {
                    stockData.map((item) => {
                        return (
                            <div onClick={() => {detailedViewHandler(item._id)}} className="collection__item" key={item._id}>
                                <div className="collection__image-wrap">
                                    <img className="collection__image" src={item.img}/>
                                </div>
                                <p ref={itemRef} className="collection__desc">{item.name}</p>
                                <p className="collection__desc">{item.price}</p>
                            </div>
                        )
                    })
                }
            </div>
        </main>
    )
}

export default Stock;