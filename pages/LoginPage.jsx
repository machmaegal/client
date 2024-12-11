import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/Auth.context';
import axios from "axios";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext(AuthContext);
    const APIURL = import.meta.env.VITE_APIURL;

    function handleLogin(e) {
        e.preventDefault();

        const currentUser = {
            email,
            password,
        };

        axios.post(`${APIURL}/auth/login`, currentUser)
            .then((res) => {
                storeToken(res.data.data);
                // authenticateUser will return true or false for admin
                return authenticateUser();
            })
            .then((isAdmin) => {
                // value from the function authenticateUser if true is admin 
                // if false is regular user
                console.log(isAdmin);
                if (isAdmin) {
                    navigate("/admin");

                } else {
                    navigate("/user");

                }
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage(err.res.data.message);
            });
    }

    return (<div className='main-container'>
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
        {/* <Link to="/">Signup</Link> */}
    </div>);
};

export default LoginPage;