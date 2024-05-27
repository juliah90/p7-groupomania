import React from 'react';
import '../styles/profile.css';

const UserProfile = ({ profileData }) => {
  return (
    <div className="profileWrapper">
      <div className="profile">
        {/* TODO use real profile picture */}
        {/* <div className="profilePicture">
          <img src={profileData.profilePicture || "default-profile-image.jpg"} alt="Profile" className="profileImage" />
        </div> */}
        <div className="profileInfo">
          <h1 className="profileName">{profileData.name || "Jane Doe"}</h1>
          <h2 className="companyPosition">{profileData.position || "General Merchandiser"}</h2>
        </div>
      </div>
      <div className="aboutMe">
        <h3>About Me:</h3>
        <p>{profileData.aboutMe || "Write something about yourself..."}</p>
      </div>
    </div>
  );
};

export default UserProfile;
