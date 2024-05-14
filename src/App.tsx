import React, {useEffect, useState} from 'react';
import Nav from "./components/Nav/Nav";
import HomePage from "./components/HomePage/HomePage";
import Profile from "./components/Profile/Profile";
import './App.css';
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { checkLoginStatus } from "./requests";

function App() {
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false)

    // useEffect(() => {
    //     cookieHandler();
    // }, []);
    //
    // const cookieHandler = async () => {
    //     const data = await checkLoginStatus();
    //     console.log(data)
    // }

    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
