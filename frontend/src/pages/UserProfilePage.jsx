import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import UserProfile from '../components/ProfilePage'; 
import "../styles/profile.css";
import axios from 'axios';

const UserProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/profile', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        setProfileData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching profile data', error);
        setError('Failed to load profile data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: 10 }}>
      <Navigation />
      <UserProfile profileData={profileData} />
    </div>
  );
};

export default UserProfilePage;
