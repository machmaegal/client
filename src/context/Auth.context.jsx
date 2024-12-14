import React from 'react';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = React.createContext();

const AuthContextWrapper = ({ children }) => {
    const API_URL = import.meta.env.VITE_APIURL;
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [order, setOrder] = useState({
        customer: '',
        food: [],
        drink: [],
    });
    const navigate = useNavigate();

    function storeToken(token) {
        localStorage.setItem('authToken', token);
    }

    async function authenticateUser() {
        const isToken = localStorage.getItem('authToken');

        if (isToken) {
            try {
                //validate
                const { data } = await axios.get(
                    `${API_URL}/auth/verify-user`,
                    {
                        headers: {
                            Authorization: `Bearer ${isToken}`,
                        },
                    }
                );
                let currentUser = data['final point']['All Users'];

                setIsLoading(false);
                setIsLoggedIn(true);
                setUser(currentUser);
                setIsAdmin(currentUser.admin);
                return currentUser.admin;
            } catch (error) {
                setIsLoading(false);
                setIsLoggedIn(false);
                setUser(null);
                setIsAdmin(false);
            }
        } else {
            setIsLoading(false);
            setIsLoggedIn(false);
            setUser(null);
            navigate('/login');
        }
    }

    function handleLogout() {
        localStorage.removeItem('authToken');
        navigate('/');
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
                isAdmin,
                order,
                setOrder,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextWrapper };
