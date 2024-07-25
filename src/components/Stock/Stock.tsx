import { useParams } from "react-router-dom";
import { getAggregatedData } from "../../requests";
import { useEffect, useState} from "react";
import "./Stock.css";

interface stockObjectTypes {
    _id: string,
    brand: string,
    color: string,
    gender: string,
    img: string,
    name: string,
    price: string,
    sold: number
}

interface Props {
    title: string,
    items: Array<stockObjectTypes>,
    onPress: Function,
    onValueChange: Function,
}

function Stock() {
    // const urlParameter = useParams();
    // const [stockData, setStockData] = useState([]);
    //
    // const cachedStockData = useMemo(() => {
    //     // Ta funkcja wykona się tylko wtedy, gdy urlParameter się zmieni
    //     return async () => {
    //         const data = await getAggregatedData(urlParameter);
    //         setStockData(data);
    //         console.log(data);
    //     };
    // }, [urlParameter]);
    //
    // useEffect(() => {
    //     cachedStockData(); // Wywołanie funkcji zwróconej przez useMemo
    // }, [cachedStockData]); // Zależność od cachedStockData



    const urlParameter = useParams();
    const [ stockData, setStockData ] = useState<Array<object>>([])
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
                    stockData.map((item: Props) => {
                        return (
                            <div className="collection__item" key={item.id}>
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