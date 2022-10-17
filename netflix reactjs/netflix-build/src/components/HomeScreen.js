import React from "react";
import './component-styles/HomeScreen.css';
import Nav from './Nav.js';
import Banner from "./Banner.js";

function HomeScreen() {
    return (
    <div className="homeScreen">
            <Nav />
            
            
            <Banner />

            {/* Row */}
    </div>
    );

}

export default HomeScreen;
