import React from 'react';
import '../styles/profile.css';

const UserProfile = () => {
  return (
    <div className="profileWrapper">
                <div className="profile">
                    <div className="profilePicture">
                        <img src="user-profile-image.jpg" alt="Profile" className="profileImage" />
                    </div>
                    <div className="profileInfo">
                        <h1 className="profileName">Jane Doe</h1>
                        <h2 className="companyPosition">General Merchandiser</h2>
                    </div>
                </div>
                <div className="aboutMe">
                    <h3>About Me:</h3>
                    <textarea className="aboutMeInput" placeholder="Write something about yourself..."></textarea>
                </div>
            </div>
  );
};

export default UserProfile;
