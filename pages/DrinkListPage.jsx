import { useState, useEffect } from 'react';

const DrinkListPage = () => {
    const API_URL = import.meta.env.VITE_APIURL;

    const [drinks, setDrinks] = useState();

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
                drinks.map((drink, i) => {
                    return (
                        <div key={i}>
                            {drink.name}
                        </div>);

                })
            }
        </div>
    );
};

export default DrinkListPage;