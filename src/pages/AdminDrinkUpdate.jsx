import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Auth.context'
import axios from 'axios'

const AdminDrinkUpdate = () => {
	const API_URL = import.meta.env.VITE_APIURL
	const { drinkToUpdate, setDrinkToUpdate } = useContext(AuthContext)
	const [updatedInfo, setUpdatedInfo] = useState({})
	const token = localStorage.getItem('authToken')
	const navigate = useNavigate()

	function handleUpdateName(e) {
		setDrinkToUpdate({ ...drinkToUpdate, name: e.target.value })
		setUpdatedInfo({ ...drinkToUpdate, name: e.target.value })
	}
	function handleUpdatePrice(e) {
		setDrinkToUpdate({ ...drinkToUpdate, price: e.target.value })
		setUpdatedInfo({ ...drinkToUpdate, price: e.target.value })
	}
	function handleUpdateDescription(e) {
		setDrinkToUpdate({ ...drinkToUpdate, description: e.target.value })
		setUpdatedInfo({ ...drinkToUpdate, description: e.target.value })
	}
	function handleUpdateLabel(e) {
		setDrinkToUpdate({ ...drinkToUpdate, label: e.target.value })
		setUpdatedInfo({ ...drinkToUpdate, label: e.target.value })
	}

	async function handleUpdate(e) {
		e.preventDefault()

		try {
			let res = await axios.put(
				`${API_URL}/drink/edit-drink/${drinkToUpdate._id}`,
				{ data: updatedInfo },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			if (res.status === 200) {
				navigate('/admin')
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div>
			AdminDrinkUpdate
			<div className='form-container'>
				<form className='form' onSubmit={handleUpdate}>
					<label htmlFor='name'></label>
					<input
						className='input'
						name='name'
						required
						value={drinkToUpdate.name}
						onChange={handleUpdateName}
						type='text'
						placeholder='Name'
					/>
					<label htmlFor='price'></label>
					<input
						name='price'
						required
						className='input'
						value={drinkToUpdate.price}
						onChange={handleUpdatePrice}
						type='Number'
						placeholder='Price'
					/>
					<label htmlFor='description'></label>
					<textarea
						className='input description'
						name='description'
						value={drinkToUpdate.description}
						onChange={handleUpdateDescription}
						type='text'
						placeholder='Description'
					/>
					<label htmlFor='label'></label>
					special label
					<select
						className='input'
						name='label'
						value={drinkToUpdate.label}
						onChange={handleUpdateLabel}
					>
						<option value=''>-- None --</option>
						<option value='soft drink'>Soft Drink</option>
						<option value='alcohol'>Alcohol</option>
						<option value='halal'>Halal</option>
						<option value='vegan'>Vegan</option>
						<option value='zero sugar'>Zero Sugar</option>
						<option value='caffeine'>Caffeine</option>
					</select>
					<button className='submit-button'>Update Drink</button>
				</form>
			</div>
			<button
				className='submit-button'
				onClick={() => {
					navigate('/admin')
				}}
			>
				Back to Admin Main Page
			</button>
		</div>
	)
}

export default AdminDrinkUpdate
