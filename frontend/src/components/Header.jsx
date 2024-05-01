import React from "react";
import logo from "../assets/logo-white.png";

const Header = () => {
    return (
        <div style={mergedStyles.header}>
            <img src={logo} alt="Company Logo" style={mergedStyles.logo} />
            <h2 style={mergedStyles.links}>Login/Sign Up</h2>
        </div>
    );
};

const styles = {
    header: {
        backgroundColor: "#121559",
        padding: "20px 0",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    logo: {
        padding: "0 20px",
        width: "190px",
        height: "auto",
        textAlign: "left",
    },
    links: {
        padding: "0 20px",
        textAlign: "right",
    },
};


const mediaStyles = {
    header: {
        flexDirection: "column",
        padding: "0 5px",
    },
    logo: {
        width: "100%",
        padding: "20px 0",
        textAlign: "center",
    },
    links: {
        fontSize: "10px",
        padding: "20px 0",
        textAlign: "center",
    },
};


const mergedStyles = { ...styles, "@media (max-width: 768px)": mediaStyles };

export default Header;
