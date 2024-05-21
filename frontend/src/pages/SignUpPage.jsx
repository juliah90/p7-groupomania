import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import "../styles/login.css";

function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous error message

        try {
            const response = await axios.post("http://localhost:3000/api/auth/signup", { email, password });
            // Store user information in local storage
            localStorage.setItem('user', JSON.stringify(response.data.user));
            // Redirect to home page
            Navigate('/home');
        } catch (error) {
            console.error("Signup error:", error);
            if (error.response && error.response.status === 409) {
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
