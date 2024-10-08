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
import Stock from "./components/Stock/Stock";
import SearchView from "./components/SearchView/SearchView";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import DetailedView from "./components/DetailedView/DetailedView";
import Settings from "./components/Settings/Settings";

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route element={ <UserStatus /> }>
                <Route path="/" element={ <HomePage/> }></Route>
                <Route path="/favourites" element={ <Favourites/> }></Route>
                <Route path="/stock/:gender" element={ <Stock/> }></Route>
                <Route path="/search/:name" element={ <SearchView/> }></Route>
                <Route path="/items/:name" element={ <DetailedView/> }></Route>
                <Route path="/cart" element={ <ShoppingCart/> }></Route>
                <Route element={ <AuthGate/> }>
                    <Route path="/profile" element={ <Profile/> }></Route>
                    <Route path="profile/settings" element={ <Settings/> }></Route>
                </Route>
                </Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
