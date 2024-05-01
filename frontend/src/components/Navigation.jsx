import React from "react";

const Navigation = () => {
    return (
        <div style={styles.navigation}>
            <h2 style={styles.links}>Home Profile</h2>
        </div>
    )
};

const styles = {
    navigation: {
        width: '100%',
        textAlign: 'center',
        padding: '5px 0',
    },
    links: {
        textAlign: 'center',
        width: '100%',
        padding: '10px 0',
    },
}

export default Navigation;