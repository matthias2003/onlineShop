import { fetchData } from "../../requests";
import ComingSoonImage from "../../assets/images/Air-Jordan-4-Seafoam-AQ9129-103-04.jpg"
import { useEffect, useState } from "react";
import "./HomePage.css";

function HomePage() {
    const [ sneakerData, setSneakerData ] = useState<Array<object>>([]);

    useEffect( ()=> {
        fetchAndPrepareData();
    },[]);

    const fetchAndPrepareData = async () => {
        const data = await fetchData();
        setSneakerData(data);
        console.log(sneakerData)
    }

    return(
        <main className="home__container">
            <div className="home__banner"></div>
            <div className="home__new">
                <h4>Freshly added</h4>
                <div className="home__tiles">
                    {sneakerData.map( (element : any ) => {
                        return(
                            <div className="home__tile">
                                <div className="home__image-wrap">
                                    <img className="home__sneaker-image" src={element.img} alt="Sneaker preview" />
                                </div>
                                <p>{ element.name }</p>
                                <p>{ element.price }</p>
                            </div>
                        )
                    })}
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
                    {sneakerData.map((element:any ) => {
                        return (
                            <div className="home__tile">
                                <div className="home__image-wrap">
                                    <img className="home__sneaker-image" src={element.img} alt="Sneaker preview"/>
                                </div>
                                <p>{element.name}</p>
                                {/*TODO: interface for object*/}
                                <p>{element.price}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    );
}

export default HomePage;