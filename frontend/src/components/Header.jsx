import React from "react";
import logo from "../assets/logo-black.png"

const Header = () => {
    return (
      <div style={styles.header}>
        <img src={logo} alt="Company Logo" style={styles.logo} />
        <h1 style={styles.groupomania}>Groupomania</h1>
      </div>
    );
  };
  
  const styles = {
    header: {
      backgroundColor: '#007bff',
      width: '100%',
      textAlign: 'center',
      padding: '20px 0',
    },
    logo: {
      width: '100px',
      height: 'auto',
    },
    groupomania: {
      color: '#fff',
      marginTop: '10px',
    },
  };
  
  export default Header;