import { useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { getDataByName } from "../../requests";
import "./SearchView.css"

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

function SearchView() {
    const { name } = useParams();
    const [ searchData, setSearchData ] = useState<SearchDataItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    },[name])

    const fetchData = async () => {
        const searchValue = name?.replaceAll("+"," ");
        if (searchValue) {
            const data  = await getDataByName(searchValue)
            setSearchData(data)
        }
        else {
            navigate('/')
        }
        console.log(searchData)
    }

    return (
        <div className="search">
            <h4 className="search__headline">{`Results for "${name?.replaceAll("+"," ")}"`}</h4>
            <div className="search__container">
                {searchData && searchData.length > 0 ?

                    searchData.map((item) => {
                        return (
                            <div className="search__item" key={item._id}>
                                <div className="search__image-wrap">
                                    <img className="search__image" src={item.img}/>
                                </div>
                                <p className="search__desc">{item.name}</p>
                                <p className="search__desc">{item.price}</p>
                            </div>
                        )
                    })
                    :
                    <div>There is nothing to display here</div>}

            </div>
        </div>


    )
}

export default SearchView;