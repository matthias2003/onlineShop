import { useNavigate, useParams} from "react-router-dom";
import { getDataByName } from "../../requests";
import { Oval } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";
import { SearchDataItem } from "../../utilities/interfaces";
import "./SearchView.css";

function SearchView() {
    const { name } = useParams();
    const navigate = useNavigate();

    const { data: searchData = [], isLoading } = useQuery({
        queryKey: ["searchData", name],
        queryFn: () => getDataByName(name!),
        enabled: !!name
    });

    const detailedViewHandler = ( id: string ) => {
        navigate(`/items/${id}`);
    };

    return (
        <div className="search">
            <h4 className="search__headline">{`Results for "${name?.replaceAll("+"," ")}"`}</h4>
            <div className={`search__container ${isLoading || searchData?.length === 0 ? "search__container--override": ""}`}>
                { isLoading ?
                    ( <Oval visible={true} height="80" width="80" color="#6d8f6d" ariaLabel="oval-loading" wrapperStyle={{}} wrapperClass=""/> )
                    :
                    ( searchData && searchData.length > 0 ?
                    searchData.map((item : SearchDataItem) => {
                        return (
                            <div onClick={() => {detailedViewHandler(item._id) }} className="search__item" key={item._id}>
                                <div className="search__image-wrap">
                                    <img className="search__image" src={item.img} alt="Searched sneaker preview"/>
                                </div>
                                <p className="search__desc">{ item.name }</p>
                                <p className="search__desc">{ item.price }</p>
                            </div>
                        )
                    })
                    :
                    <div>There is nothing to display here!</div>
                    )
                }
            </div>
        </div>
    )
}

export default SearchView;