import background from "../../assets/images/background.jpg";
import { fetchData } from "../../requests";
import "./HomePage.css";
import {useEffect, useState} from "react";

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
        <div className="home--page--container">
            <div className="home--baner">
                <img src={background} alt="Background"/>
            </div>
            <div className="new--wrap">
                <p>Freshly added</p>
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
                <p>Coming soon</p>
                <div></div>
            </div>
            <div className="bestsellers--wrap">
                <p>Bestsellers</p>
                <div></div>
            </div>
        </div>
    );
}

export default HomePage;