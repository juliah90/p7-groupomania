import React from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import "../styles/profile.css"

function UserProfilePage() {
    return (
        <div style={{ padding: 10 }}>
            <Header />
            { }
            <Navigation />
            { }
            <div className='profilePictureAndName'>
                <img className='profileImage'></img>
                <h1 className='profileName'>Jane Doe</h1>
                <h2 className='companyPosition'>General Merchandiser</h2>
                <p className='editProfile'>Edit Profile</p>
            </div>
            <div className='aboutMe'>About Me</div>
        </div>
    );
};

export default UserProfilePage;