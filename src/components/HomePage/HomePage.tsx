import { fetchData, getBestsellers } from "../../requests";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SearchDataItem } from "../../utilities/interfaces";
import ComingSoonImage from "../../assets/images/Air-Jordan-4-Seafoam-AQ9129-103-04.jpg";
import "./HomePage.css";

function HomePage() {
    const navigate = useNavigate();

    const { data: sneakerData = [] } = useQuery<SearchDataItem[]>({
        queryKey: ["sneakerData", "featured"],
        queryFn: () =>  fetchData()
    });

    const { data: bestsellersData = [] } = useQuery<SearchDataItem[]>({
        queryKey: ["sneakerData", "bestsellers"],
        queryFn: () =>  getBestsellers()
    });

    const detailedViewHandler = ( id: string ) => {
        navigate(`/items/${id}`);
    };

    return(
        <main className="home__container">
            <div className="home__banner"></div>
            <div className="home__new">
                <h4>Freshly added</h4>
                <div className="home__tiles">
                    { sneakerData.map( (element  ) => {
                        return(
                            <div onClick={() => { detailedViewHandler(element._id) }} className="home__tile" key={element._id}>
                                <div className="home__image-wrap">
                                    <img className="home__sneaker-image" src={element.img} alt="Sneaker preview" />
                                </div>
                                <p>{ element.name }</p>
                                <p>{ element.price }</p>
                            </div>
                        )})
                    }
                </div>
            </div>
            <div className="home__coming">
                <h4>Coming soon</h4>
                <div className="home__coming-content">
                    <p>AIR JORDAN 4</p>
                    <img className="home__coming-image" src={ComingSoonImage} alt="Coming soon sneaker"/>
                    <p>SEA FOAM</p>
                </div>
            </div>
            <div className="home__bestsellers">
                <h4>Bestsellers</h4>
                <div className="home__tiles">
                    { bestsellersData.map((element ) => {
                        return (
                            <div onClick={() => { detailedViewHandler(element._id) }} className="home__tile" key={element._id}>
                                <div className="home__image-wrap">
                                    <img className="home__sneaker-image" src={element.img} alt="Sneaker preview"/>
                                </div>
                                <p>{ element.name }</p>
                                <p>{ element.price }</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Outlet />
        </main>
    );
}

export default HomePage;