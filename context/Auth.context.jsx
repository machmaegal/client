import React from 'react';
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.APIURL;
const AuthContext = React.createContext();

const AuthContextWrapper = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    function storeToken(token) {
        localStorage.setItem("authToken", token);
    }

    async function authenticateUser() {

        const isToken = localStorage.getItem("authToken");

        if (isToken) {
            try {
                //validate
                const { data } = await axios.get(`${API_URL}/auth/verify`, {
                    headers: {
                        authorization: `Bearer ${isToken}`,
                    },
                });
                console.log("User verified !", data);
                setIsLoading(false);
                setIsLoggedIn(true);
                setUser(data.currentUser); //did we call it currentUser ?!
                //setUser(data.newUser); 
            } catch (error) {
                console.log("ERROR: verification went wrong", error);
                setIsLoading(false);
                setIsLoggedIn(false);
                setUser(null);
            }
        } else {
            console.log("auth context: no token ?");
            setIsLoading(false);
            setIsLoggedIn(false);
            setUser(null);
            //navigate("/login");
        }
    }

    function handleLogout() {
        localStorage.removeItem("authToken");
        navigate("/login");
    }

    //useEffect to validate the token on every refresh
    useEffect(() => {
        authenticateUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                storeToken,
                authenticateUser,
                user,
                isLoading,
                isLoggedIn,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextWrapper };
