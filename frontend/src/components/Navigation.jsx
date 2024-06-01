import React from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/navigation.css";

const Navigation = () => {
    const navigate = useNavigate();

    const homeNavClick = () => {
        navigate('/home');
    };

    const accountNavClick = () => {
        navigate('/account');
    };

    return (
        <div className="navigation">
            <button onClick={homeNavClick} className="navLinks" alt="Home">Home</button>
            <button onClick={accountNavClick} className="navLinks" alt="Account">Account</button>
        </div>
    );
};

export default Navigation;
