import React from "react";
import logo from "../assets/logo-white.png";
import "../styles/header.css"

const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt="Company Logo" className="logo" />
            <h2 className="headerLinks">Login/Sign Up</h2>
        </div>
    );
};

export default Header;
