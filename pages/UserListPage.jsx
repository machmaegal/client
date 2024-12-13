import { useState, useEffect } from 'react';

const UserListPage = () => {
    const API_URL = import.meta.env.VITE_APIURL;

    const [users, setUsers] = useState();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const isToken = localStorage.getItem("authToken");
                const response = await fetch(`${API_URL}/users`, { headers: { 'Authorization': `Bearer ${isToken}` } });
                const { data } = await response.json();
                //console.log(data);

                setUsers(data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className='main-container'>
            {users &&
                users.map((user, i) => {
                    return (
                        <div key={i}>
                            {user.name}
                        </div>);

                })
            }
        </div>
    );
};

export default UserListPage;