import React from 'react';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../context/Auth.context';

const AdminPage = () => {

    const { user } = useContext(AuthContext);
    useEffect(() => {
        const getUserData = async () => {
            try {
                const userData = await axios.get(
                    `${APIURL}/auth/admin/${user._id}`
                );
                console.log(
                    "user from context",
                    user,
                    "user after get route",
                    userData.data
                );
            } catch (error) {
                console.log(error);
            }
        };
        getUserData();
    }, [user._id]);

    return (
        <div>AdminPage</div>
    );
};

export default AdminPage;