import React from "react";
import logo from "../assets/logo-white.png";
import "../styles/header.css";
import { useNavigate } from "react-router-dom";

function Header({ isLoggedIn, onLogout }) {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/home');//after login redirect
    };

    const handleSignUp = () => {
        navigate('/home');//after signup, redirect
    };

    const handleLogout = () => {
        //TODO clear user info from local storage
        navigate('/login');// after log out, redirect
    };
    return (
        <div className="containerHead">
            <img src={logo} alt="Company Logo" className="logo" />
            <div className="headerLinks">
                {isLoggedIn ? (
                    <button className="signOutButton" onClick={handleLogout}>Sign Out</button>
                ) : (
                    <>
                        <button className="loginButton" onClick={handleLogin}>Login</button>
                        <button className="signUpButton" onClick={handleSignUp}>Sign Up</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
