import React from 'react';
import Nav from "./components/Nav/Nav";
import HomePage from "./components/HomePage/HomePage";
import './App.css';
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="container">
        <Nav />
        <HomePage />
        <Footer />
    </div>
  );
}

export default App;
