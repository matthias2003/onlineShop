import { useParams } from "react-router-dom";
import { getAggregatedData } from "../../requests";
import { useEffect, useState} from "react";
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
    useEffect(() => {
        fetchData();
    },[urlParameter])

    const fetchData = async () => {
        const data = await getAggregatedData(urlParameter);
        setStockData(data);
        console.log(data)

    }
    return(
        <div className="collection">
            <h4 className="collection__headline">{`${urlParameter.gender?.charAt(0).toUpperCase()}${urlParameter.gender?.slice(1)}`}</h4>
            <div className="collection__container">
                {
                    stockData.map((item) => {
                        return (
                            <div className="collection__item" key={item._id}>
                                <div className="collection__image-wrap">
                                    <img className="collection__image" src={item.img}/>
                                </div>
                                <p className="collection__desc">{item.name}</p>
                                <p className="collection__desc">{item.price}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Stock;