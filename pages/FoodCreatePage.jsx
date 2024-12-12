import { useState } from 'react';
import axios from 'axios';

const FoodCreatePage = () => {
    const API_URL = import.meta.env.VITE_APIURL;

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [label, setLabel] = useState('None');

    const handleNameInput = (e) => setName(e.target.value);
    const handlePriceInput = (e) => setPrice(e.target.value);
    const handleDescriptionInput = (e) => setDescription(e.target.value);
    const handleLabelInput = (e) => setLabel(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isToken = localStorage.getItem("authToken");
        const newFood = { name, price, description, label };
        //console.log('token from create Food: ', isToken);

        axios.post(`${API_URL}/food/new-dish`, { data: newFood }, { headers: { 'Authorization': `Bearer ${isToken}` } })
            .then((res) => {
                console.log(res);

                setName('');
                setPrice('');
                setDescription('');
                setLabel('');
            })
            .catch((err) => {
                console.log('the error', err);
            });

    };

    return (
        <div className='a'>
            <h3>create dish</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'></label>
                <input name="name" required value={name} onChange={handleNameInput} type="text" placeholder="Name" />

                <label htmlFor='price'></label>
                <input name="price" required value={price} onChange={handlePriceInput} type="Number" placeholder="Price" />

                <label htmlFor='description'></label>
                <input name="description" value={description} onChange={handleDescriptionInput} type="text" placeholder="Description" />

                <label htmlFor='label'></label>
                special label
                <select name="label" value={label} onChange={handleLabelInput}>
                    <option value="">-- None --</option>
                    <option value="vegan">Vegan</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="halal">Halal</option>
                    <option value="gluten-free">Gluten-Free</option>
                </select>

                <button>Create Food</button>
            </form>
        </div>
    );
};

export default FoodCreatePage;