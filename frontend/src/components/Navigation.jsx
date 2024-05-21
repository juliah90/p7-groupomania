import React from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/navigation.css";

const Navigation = () => {
    const navigate = useNavigate();

    const homeNavClick = () => {
        navigate('/home');
    };

    const profileNavClick = () => {
        navigate('/profile');
    };

    return (
        <div className="navigation">
            <button onClick={homeNavClick} className="navLinks">Home</button>
            <button onClick={profileNavClick} className="navLinks">Profile</button>
        </div>
    );
};

export default Navigation;
