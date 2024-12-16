import { useState, useEffect } from 'react';

const AdminFoodList = () => {
    const [foods, setFoods] = useState();
    const API_URL = import.meta.env.VITE_APIURL;

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await fetch(`${API_URL}/food/dishes`);

                const { data } = await response.json();
                //console.log(data);

                setFoods(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchFoods();
    }, []);

    async function handleDeleteFoodOrDrink(id) {
        console.log(id);
        /* await axios.delete(`${API_URL}/food/${user._id}`,
            { headers: { 'Authorization': `Bearer ${isToken}` } })
            .then((res) => {
                console.log(res);
                handleLogout();
            })
            .catch((error) => console.log(error)); */
    }

    return (
        <div className='main-container'>
            {foods &&
                foods.map((food) => {
                    return (
                        <div key={food._id} className='item-card'>
                            <div>{food.name}</div>
                            <div>{food.description}</div>
                            <div>{food.label.at(0)}</div>
                            <div>{food.price + `€`}</div>
                            <button>Update</button>
                            <button onClick={() => handleDeleteFoodOrDrink(food._id)}>delete</button>
                        </div>
                    );
                })}
        </div>
    );
};

export default AdminFoodList;