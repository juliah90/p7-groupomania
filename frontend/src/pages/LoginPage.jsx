import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import "../styles/login.css"

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        // Prevent the default form submission and page reload
        e.preventDefault();

        try {
            // Make an HTTP POST request to your login endpoint
            const response = await axios.post("https://example.com/login", { email, password });
            
            // Handle the response from the server
            console.log(response.data); // For example, log the response data to the console
        } catch (error) {
            // Handle any errors that occur during the request
            console.error(error);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <Header />
            { }
            <div>
            <form id="login" onSubmit={handleSubmit}>
                    <h1>Login</h1>
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
            <div className='newUserRedirect'>New user? Sign up here!</div>
        </div>
    );
};

export default LoginPage;