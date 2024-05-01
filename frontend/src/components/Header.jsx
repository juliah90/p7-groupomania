import React from "react";
import logo from "../assets/logo-white.png"

const Header = () => {
    return (
        <div style={styles.header}>
            <img src={logo} alt="Company Logo" style={styles.logo} />
            <h2 style={styles.links}>Login/Sign Up</h2>
        </div>
    );
};

const styles = {
    header: {
        backgroundColor: '#121559',
        width: '100%',
        padding: '5px 0',
    },
    logo: {
        display: 'inline-block',
        width: '190px',
        height: 'auto',
        padding: '0px 20px',
        textAlign: 'left',
    },
    links: {
        display: 'inline-block',
        textAlign: 'right',
        padding: '5px 0',
    },
};

export default Header;