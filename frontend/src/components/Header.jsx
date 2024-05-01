import React from "react";
import logo from "../assets/logo-white.png"

const Header = () => {
    return (
      <div style={styles.header}>
        <img src={logo} alt="Company Logo" style={styles.logo} />
      </div>
    );
  };
  
  const styles = {
    header: {
      backgroundColor: '#121559',
      width: '100%',
      textAlign: 'left',
      padding: '20px 10px',
    },
    logo: {
      width: '100px',
      height: 'auto',
    }
  };
  
  export default Header;