import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/login.css";

function SignUpPage({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous error message

        try {
            const response = await axios.post("http://localhost:3000/api/auth/signup", { email, password });
            // store user information and token in local storage
            localStorage.setItem('user', JSON.stringify({ userId: response.data.userId, token: response.data.token }));
            // trigger the login state
            onLogin();
            navigate('/home');
        } catch (error) {
            console.error("Signup error:", error);
            if (error.response && error.response.status === 400) {
                setError('Email already exists.');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <div>
                <form id="signup" onSubmit={handleSubmit}>
                    <h1>New User Sign Up</h1>
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
                        <input type="submit" value="Sign up" />
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignUpPage;
