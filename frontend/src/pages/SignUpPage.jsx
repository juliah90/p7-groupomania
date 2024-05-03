import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import "../styles/login.css"

function SignUpPage() {
    return (
        <div style={{ padding: 20 }}>
            <Header />
            { }
            <div>
                <form action="" id="login" method="post">
                    <h1>New User Sign Up</h1>
                    <p className="item">
                        <label for="email"> Email </label>
                        <input type="email" name="email" id="email" />
                    </p>
                    <p className="item">
                        <label for="password"> Password </label>
                        <input type="password" name="password" id="password" />
                    </p>
                    <p className="item">
                        <input type="submit" value="Sign up" />
                    </p>
                </form>
            </div>
            <div className='signInRedirect'>Already have an account? Sign in here.</div>
        </div>
    );
}

export default SignUpPage;
