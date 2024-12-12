import React from 'react';
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const APIURL = import.meta.env.VITE_APIURL;

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
                navigate("/login");

            })
            .catch((err) => console.log('frontend Error signup', err));
    }

    return (
        <div className='main-container'>
            <h1>create an account</h1>
            <form onSubmit={handleSignup}>
                <label htmlFor="name"> Name
                    <input
                        type='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </label>
                <label htmlFor="email"> Email
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </label>
                <label htmlFor="password" value={password}> Password
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </label>
                <button>Sign Up</button>
            </form>
            <p>Alredy registered ?</p>
            <Link to="/login">Login</Link>
        </div>
    );
};

export default SignUpPage;