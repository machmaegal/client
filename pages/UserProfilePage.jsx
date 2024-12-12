import React, { useState, useContext } from "react";
import { AuthContext } from '../context/Auth.context';

const UserProfilePage = () => {
    const API_URL = import.meta.env.VITE_APIURL;
    const [user, setUser] = useState();
    const { id } = useParams();


    /* useEffect(() => {
        axios.get(`${API_URL}/user/:id`)
            .then((response) => setUser(response.data))
            .catch((err) => console.log(err));
    }, [id]); */


    return (
        <div> heeellooo. UserProfilePage</div>
    );
};

export default UserProfilePage;