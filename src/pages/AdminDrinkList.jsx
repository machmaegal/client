import { useState, useEffect } from 'react';

const AdminDrinkList = () => {
    const [drinks, setDrinks] = useState();
    const API_URL = import.meta.env.VITE_APIURL;

    useEffect(() => {
        const fetchDrinks = async () => {
            try {
                const response = await fetch(`${API_URL}/drink/drinks`);

                const { data } = await response.json();
                //console.log(data);

                setDrinks(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDrinks();
    }, []);

    return (
        <div className='main-container'>
            {drinks &&
                drinks.map((drink) => {
                    return (
                        <div key={drink._id}>
                            <div>{drink.name}</div>
                            <div>{drink.description}</div>
                            <div>{drink.label.at(0)}</div>
                            <div>{drink.price + `€`}</div>
                            <button>update</button>
                            <button>delete</button>
                        </div>
                    );
                })}
        </div>
    );
};

export default AdminDrinkList;