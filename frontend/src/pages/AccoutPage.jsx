import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import UserAccount from '../components/Account'; 
import "../styles/account.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/auth/${user.userId}`, {
      headers: { 'Authorization': `Bearer ${user.token}` }
    })
      .then(response => {
        setAccountData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching account data', error);
        setError('Failed to load account data');
        setLoading(false);
      });
  }, [user.userId, user.token]);

  const handleDeleteAccount = () => {
    axios.delete(`http://localhost:3000/api/auth/${user.userId}`, {
      headers: { 'Authorization': `Bearer ${user.token}` }
    })
      .then(() => {
        // Clear user data from local storage
        localStorage.removeItem('user');
        // Redirect to signup or home page after account deletion
        navigate('/signup');
      })
      .catch(error => {
        console.error('Error deleting account', error);
        setError('Failed to delete account');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='accountLayout'>
      <Navigation />
      <UserAccount accountData={accountData} />
      <div>
        <button className='deleteButton' onClick={handleDeleteAccount}>Delete Account</button>
      </div>
    </div>
  );
};

export default AccountPage;
