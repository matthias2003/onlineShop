import React from 'react';
import Nav from "./components/Nav/Nav";
import HomePage from "./components/HomePage/HomePage";
import './App.css';

function App() {
  return (
    <div className="container">
        <Nav />
        <HomePage />
    </div>
  );
}

export default App;
