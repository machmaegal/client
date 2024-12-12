import React, { useState } from 'react';
import axios from 'axios';

const DrinkCreatePage = () => {
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

		const newDrink = { name, price, description, label };

		axios.post(`${API_URL}/food/new-drink`, newDrink)
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
		<div className='mainContainer'>
			<h3>create drink</h3>
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
					<option value="soft drink">Vegan</option>
					<option value="alcohol">Vegetarian</option>
					<option value="halal">Halal</option>
					<option value="vegan">Gluten-Free</option>
					<option value="zero sugar">Gluten-Free</option>
					<option value="caffeine">Gluten-Free</option>
				</select>


				<button>Create Drink</button>
			</form>
		</div>
	);
};

export default DrinkCreatePage;
