//import 'dotenv/config';
import React from 'react';
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleSignup(e) {
        e.preventDefault();

        const newUser = {
            name,
            email,
            password,
        };
        axios.post(`${APIURL}/auth/signup`, newUser)
            .then((res) => {
                console.log(res.data);
                // navigate("/login");
            })
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <h1>SignUpPage</h1>
            <form onSubmit={handleSignup}>
                <label htmlFor="name">
                    <input
                        type='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </label>
                <label htmlFor="email">
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </label>
                <label htmlFor="password" value={password}>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </label>
                <button>Sign Up</button>
            </form>
            <p>Alredy registered ?</p>
            <Link to="/login">To Login</Link>
        </div>
    );
};

export default SignUpPage;