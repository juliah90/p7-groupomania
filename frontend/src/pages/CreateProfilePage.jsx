import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProfilePage = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('position', position);
    formData.append('aboutMe', aboutMe);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const token = JSON.parse(localStorage.getItem('user')).token;
      await axios.post(`http://localhost:3000/api/auth/${user.userId}`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`,
          },
      });
      navigate('/profile'); // navigate to profile page
  } catch (error) {
      console.error('Error creating profile:', error);
      // show error message
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <input className="NameField" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input className="PositionField"type="text" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Position" required />
      <textarea className="TextField" value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} placeholder="About Me" maxLength={200} required />
      <input className="PictureField" type="file" onChange={(e) => setProfilePicture(e.target.files[0])} />
      <button className="SubmitButton" type="submit">Submit</button>
    </form>
  );
};

export default CreateProfilePage;
