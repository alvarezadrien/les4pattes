import React from "react";
import '../Home/HomePage.css';
import Navbar from "../Navbar/Navbar";

const HomePage = () => {
    return (
        <div>
            <Navbar />
        <div className="container_home">
            <h1>Hello world!</h1>
        </div>
        </div>
    );
};

export default HomePage;
