import {useNavigate, useParams} from "react-router-dom";
import { getAggregatedData } from "../../requests";
import { useRef } from "react";
import "./Stock.css";
import {Oval} from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";

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
    const navigate = useNavigate();
    const itemRef= useRef<HTMLParagraphElement | null>(null);
    const { data: stockData = [], isLoading, error } = useQuery({
        queryKey: ["stockData", urlParameter],
        queryFn: () => getAggregatedData(urlParameter),
        enabled: !!urlParameter,
    });


    const detailedViewHandler = ( id: string ) => {
        navigate(`/items/${id}`)
    }
    return(
        <main className="collection">
            <h4 className="collection__headline">{`${urlParameter.gender?.charAt(0).toUpperCase()}${urlParameter.gender?.slice(1)}`}</h4>
            <div className={`collection__container ${isLoading ? "collection__container--override": ""}`}>
                { isLoading ? (<Oval
                        visible={true}
                        height="80"
                        width="80"
                        color="#6d8f6d"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />)
                :
                    (stockData.map((item : SearchDataItem) => {
                        return (
                            <div onClick={() => {detailedViewHandler(item._id)}} className="collection__item" key={item._id}>
                                <div className="collection__image-wrap">
                                    <img className="collection__image" src={item.img}/>
                                </div>
                                <p ref={itemRef} className="collection__desc">{item.name}</p>
                                <p className="collection__desc">{item.price}</p>
                            </div>
                        )
                    }
                    ))
                }
            </div>
        </main>
    )
}

export default Stock;