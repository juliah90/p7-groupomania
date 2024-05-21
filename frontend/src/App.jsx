import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './pages/SignUpPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import Header from './components/Header';
import PrivateRoutes from './components/PrivateRoutes';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/signup" element={<SignUpPage onLogin={handleLogin} />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Route>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}
//check for token
export default App;
