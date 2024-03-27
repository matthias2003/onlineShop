import { fetchData } from "../../requests";
import ComingSoonImage from "../../assets/images/Air-Jordan-4-Seafoam-AQ9129-103-04.jpg"
import {useEffect, useState} from "react";
import "./HomePage.css";
function HomePage() {
    const [ sneakerData, setSneakerData ] = useState([]);

    useEffect( ()=> {
        fetchAndPrepareData();
    },[]);

    const fetchAndPrepareData = async () => {
        const data = await fetchData();
        setSneakerData(data);
    }

    return(
        <main className="home--page--container">
            <div className="home--banner"></div>
            <div className="new--wrap">
                <h4>Freshly added</h4>
                <div className="tiles--wrap">
                    {sneakerData.map( (element : any) => {
                        return(
                            <div className="tile">
                                <div className="img--wrap">
                                    <img src={element.img} alt="Sneaker preview" />
                                </div>
                                <p>{ element.name }</p>
                                <p>{ element.price }</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="coming--wrap">
                <h4>Coming soon</h4>
                <div className="coming--content">
                    <p>AIR JORDAN 4</p>
                    <img src={ComingSoonImage} alt="Coming soon sneaker"/>
                    <p>SEA FOAM</p>
                </div>
            </div>
            <div className="bestsellers--wrap">
                <h4>Bestsellers</h4>
                <div className="tiles--wrap">
                    {sneakerData.map((element: any) => {
                        return (
                            <div className="tile">
                                <div className="img--wrap">
                                    <img src={element.img} alt="Sneaker preview"/>
                                </div>
                                <p>{element.name}</p>
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