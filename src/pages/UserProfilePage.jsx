import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../context/Auth.context';
import axios from "axios";

const UserProfilePage = () => {
    const { user } = useContext(AuthContext);
    const API_URL = import.meta.env.VITE_APIURL;
    const [profileUser, setProfileUser] = useState();

    useEffect(() => {
        const isToken = localStorage.getItem("authToken");
        axios.get(`${API_URL}/users/${user._id}`, { headers: { 'Authorization': `Bearer ${isToken}` } })
            .then((res) => setProfileUser(res.data.data))

            .catch((err) => console.log(err));
    }, []);

    return (
        <div className='main-container'>
            {profileUser &&
                <div> user: {profileUser.name}</div>
            }
        </div>
    );
};

export default UserProfilePage;