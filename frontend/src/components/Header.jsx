import React from "react";
import logo from "../assets/logo-white.png";
import "../styles/header.css";
import { useNavigate } from "react-router-dom";

function Header({ isLoggedIn, onLogout }) {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login'); // Navigate to the login page
    };

    const handleSignUp = () => {
        navigate('/signup'); // Navigate to the signup page
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        onLogout();
        navigate('/login');
    };

    return (
        <div className="containerHead">
            <img src={logo} alt="Groupomania Logo" className="logo" />
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
