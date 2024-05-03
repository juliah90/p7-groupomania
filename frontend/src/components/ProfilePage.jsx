import React from 'react';
import '../styles/profile.css';

const UserProfile = () => {
  return (
    <div className="profileContainer">
      <div className="profilePictureAndName">
        <div className="profilePicture"></div>
        <div className="profileInfo">
          <h1 className="profileName">Jane Doe</h1>
          <h2 className="companyPosition">General Merchandiser</h2>
          <p className="editProfile">Edit Profile</p>
        </div>
      </div>
      <div className="aboutMe">About Me</div>
    </div>
  );
};

export default UserProfile;
