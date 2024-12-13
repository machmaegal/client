import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../context/Auth.context';
import { useParams } from 'react-router';
import axios from "axios";
const UserProfilePage = () => {
    const API_URL = import.meta.env.VITE_APIURL;
    const [user, setUser] = useState();
    const { id } = useParams();

    useEffect(() => {
        const isToken = localStorage.getItem("authToken");
        axios.get(`${API_URL}/users/user`, { headers: { 'Authorization': `Bearer ${isToken}` } })
            .then((res) => setUser(res.data.data))
            /* .then((res) => console.log(res.data.data)) */
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className='main-container'>
            {user &&
                <div> user: {user.name}</div>
            }
        </div>
    );
};

export default UserProfilePage;