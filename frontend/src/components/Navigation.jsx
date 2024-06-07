import React from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/navigation.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faHome, faUser } from '@fortawesome/free-solid-svg-icons';

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
            <FontAwesomeIcon icon={faHome} className="homeIcon" alt="Navigate to Home" onClick={homeNavClick} />
            <FontAwesomeIcon icon={faUser} className="accountIcon" alt="Navigate to account" onClick={accountNavClick} />
        </div>
    );
};

export default Navigation;
