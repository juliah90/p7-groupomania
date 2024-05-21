import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/login.css";

function LoginPage({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous error message

        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", { email, password });
            // Store user information in local storage
            localStorage.setItem('user', JSON.stringify(response.data));
            onLogin();
            // Redirect to home page
            Navigate('/home');
        } catch (error) {
            console.error("Login error:", error);
            if (error.response && error.response.status === 401) {
                setError('Incorrect username or password.');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <div>
                <form id="login" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    {error && <div className="error">{error}</div>}
                    <p className="item">
                        <label htmlFor="email"> Email </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </p>
                    <p className="item">
                        <label htmlFor="password"> Password </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </p>
                    <p className="item">
                        <input type="submit" value="Login" />
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
