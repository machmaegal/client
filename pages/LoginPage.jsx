//import 'dotenv/config';
import React from 'react';
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext(AuthContext);

    function handleLogin(e) {
        e.preventDefault();

        const currentUser = {
            email,
            password,
        };

        axios.post(`${APIURL}/auth/login`, currentUser)
            .then((res) => {
                console.log(res.data);

                storeToken(res.data.authToken);
                return authenticateUser();
            })
            .then(() => {
                navigate("/home");// home should be list of dishes, login should navigate to profile -> add profile/user details page 
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage(err.response.data.errorMessage);
            });
    }

    <div>
        <h1>Login Page</h1>
        <form onSubmit={handleLogin}>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                Password :
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button>Login</button>
        </form>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <p>New Here?</p>
        <Link to="/">Signup</Link>
    </div>;
};

export default LoginPage;