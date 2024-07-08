import React from 'react';
import Nav from "./components/Nav/Nav";
import HomePage from "./components/HomePage/HomePage";
import Profile from "./components/Profile/Profile";
import './App.css';
import Footer from "./components/Footer/Footer";
import Register from "./components/Modal/Register/Register";
import UserStatus from "./components/UserStatus/UserStatus";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/Modal/Login/Login";
import Favourites from "./components/Favourites/Favourites";
import { AuthGate } from "./components/AuthGate/AuthGate";

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route element={<UserStatus/>}>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/favourites" element={<Favourites />}></Route>
                <Route element={<AuthGate />}>
                    <Route path="/profile" element={<Profile />}></Route>
                </Route>
                </Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
