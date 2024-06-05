import React from 'react';
import Nav from "./components/Nav/Nav";
import HomePage from "./components/HomePage/HomePage";
import Profile from "./components/Profile/Profile";
import './App.css';
import Footer from "./components/Footer/Footer";
import Register from "./components/Register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/profile" element={<Profile />}></Route> {/*HAS TO BE PROTECTED*/}
                <Route path="/register" element={<Register />}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
