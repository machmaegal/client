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

        axios.post(`${API_URL}/food/new-dish`, { data: newFood }, { headers: { 'Authorization': `Bearer ${isToken}` } })
            .then((res) => {
                console.log(res);

                setName('');
                setPrice('');
                setDescription('');
                setLabel('');
            })
            .catch((err) => {
                console.log(err);
            });

    };

    return (
        <div className='main-container'>

            <h1>create dish</h1>
            <div className='form-container'>

                <form className='form' onSubmit={handleSubmit}>
                    <label htmlFor='name'></label>
                    <input
                        className='input'
                        name="name" required
                        value={name}
                        onChange={handleNameInput}
                        type="text" placeholder="Name"
                    />

                    <label htmlFor='price'></label>
                    <input
                        name="price" required
                        className='input'
                        value={price}
                        onChange={handlePriceInput}
                        type="Number"
                        placeholder="Price" />

                    <label htmlFor='description'></label>
                    <textarea
                        className='input description'
                        name="description"
                        value={description}
                        onChange={handleDescriptionInput}
                        type="text"
                        placeholder="Description" />

                    <label htmlFor='label'></label>
                    special label
                    <select className='input' name="label" value={label} onChange={handleLabelInput}>
                        <option value="">-- None --</option>
                        <option value="vegan">Vegan</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="halal">Halal</option>
                        <option value="gluten-free">Gluten-Free</option>
                    </select>

                    <button className='submit-button'>Create Food</button>
                </form>

            </div>
        </div>
    );
};

export default FoodCreatePage;