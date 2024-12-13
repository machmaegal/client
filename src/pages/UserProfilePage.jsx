import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/Auth.context';
import axios from "axios";

const UserProfilePage = () => {
    const { user } = useContext(AuthContext);
    const API_URL = import.meta.env.VITE_APIURL;
    const isToken = localStorage.getItem("authToken");
    const navigate = useNavigate();

    const [profileUser, setProfileUser] = useState();

    useEffect(() => {
        axios.get(`${API_URL}/users/${user._id}`, { headers: { 'Authorization': `Bearer ${isToken}` } })
            .then((res) => setProfileUser(res.data.data))

            .catch((err) => console.log(err));
    }, []);

    //handle form inputs
    function handleChange(e) {
        const whatWasTyped = e.target.value;
        const inputThatIsUsed = e.target.name;
        setProfileUser({ ...profileUser, [inputThatIsUsed]: whatWasTyped });
    }

    function handleUpdate(e) {
        e.preventDefault();

        axios.put(`${API_URL}/users/${user._id}`, profileUser, { headers: { 'Authorization': `Bearer ${isToken}` } })
            .then((res) => {
                console.log(res);

            })
            .catch((err) => console.log(err));
    }

    function handleDelete() {
        try {
            axios.delete(`${API_URL}/users/${user._id}`, profileUser, { headers: { 'Authorization': `Bearer ${isToken}` } });
            //navigate('/');

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='main-container'>
            {profileUser &&
                <form onSubmit={handleUpdate}>
                    <label htmlFor="name"></label>
                    <input
                        type='text'
                        name='name'
                        value={profileUser.name}
                        placeholder='Name'
                        onChange={handleChange}
                    />
                    <label htmlFor='email'></label>
                    <input
                        type='email'
                        name='email'
                        value={profileUser.email}
                        placeholder='Email'
                        onChange={handleChange}
                    />

                    <label htmlFor='password'></label>
                    <input
                        type='password'
                        name='password'
                        value={profileUser.password}
                        placeholder='Password'
                        onChange={handleChange}
                    />

                    <button>Update</button>
                    <button
                        onClick={() => { handleDelete(); }}>
                        Delete
                    </button>
                </form>
            }
        </div>
    );
};

export default UserProfilePage;