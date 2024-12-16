import { useState } from 'react';
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
		const isToken = localStorage.getItem("authToken");
		const newDrink = { name, price, description, label };

		axios.post(`${API_URL}/drink/new-drink`, { data: newDrink }, { headers: { 'Authorization': `Bearer ${isToken}` } })
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
			<h1>create drink</h1>
			<div className='form-container'>

				<form className='form' onSubmit={handleSubmit}>
					<label htmlFor='name'></label>
					<input
						className='input'
						name="name" required
						type="text"
						value={name}
						onChange={handleNameInput}
						placeholder="Name" />

					<label htmlFor='price'></label>
					<input
						className='input'
						name="price" required
						type="Number"
						value={price}
						onChange={handlePriceInput}
						placeholder="Price" />

					<label htmlFor='description'></label>
					<textarea
						className='input description'
						name="description"
						type="text"
						value={description}
						onChange={handleDescriptionInput}
						placeholder="Description" />

					<label htmlFor='label'></label>
					special label
					<select className='input' name="label" value={label} onChange={handleLabelInput}>
						<option value="">-- None --</option>
						<option value="soft drink">Vegan</option>
						<option value="alcohol">Vegetarian</option>
						<option value="halal">Halal</option>
						<option value="vegan">Gluten-Free</option>
						<option value="zero sugar">Gluten-Free</option>
						<option value="caffeine">Gluten-Free</option>
					</select>

					<button className='submit-button'>Create Drink</button>
				</form>

			</div>
		</div>
	);
};

export default DrinkCreatePage;
