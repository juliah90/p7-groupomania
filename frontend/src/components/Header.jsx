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
        padding: '20px 0',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        padding: '0 20px',
        width: '190px',
        height: 'auto',
        textAlign: 'left',
    },
    links: {
        padding: '0 20px',
        textAlign: 'right',
    },
};

export default Header;