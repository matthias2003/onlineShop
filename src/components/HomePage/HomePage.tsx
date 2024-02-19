import background from "../../assets/images/background.jpg";
import { getData } from "../../requests"
import "./HomePage.css";
import {useEffect, useState} from "react";

function HomePage() {
    const [ shoeData , setShoeData] = useState({});
    useEffect(() => {
        fetchData();
    },[]);
    const fetchData = async () => {
        const data = await getData();
    }



    return(
        <div className="home--page--container">
            <div className="home--baner">
                <img src={background} alt="Background"/>
            </div>
            <div className="new--wrap">
                <p>Freshly added</p>
                <div className="tiles--wrap">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
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