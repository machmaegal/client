import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Auth.context'
import axios from 'axios'

const AdminFoodUpdate = () => {
	const API_URL = import.meta.env.VITE_APIURL
	const { foodToUpdate, setFoodToUpdate } = useContext(AuthContext)
	const [updatedInfo, setUpdatedInfo] = useState({})
	const token = localStorage.getItem('authToken')
	const navigate = useNavigate()

	function handleUpdateName(e) {
		setFoodToUpdate({ ...foodToUpdate, name: e.target.value })
		setUpdatedInfo({ ...foodToUpdate, name: e.target.value })
	}
	function handleUpdatePrice(e) {
		setFoodToUpdate({ ...foodToUpdate, price: e.target.value })
		setUpdatedInfo({ ...foodToUpdate, price: e.target.value })
	}
	function handleUpdateDescription(e) {
		setFoodToUpdate({ ...foodToUpdate, description: e.target.value })
		setUpdatedInfo({ ...foodToUpdate, description: e.target.value })
	}
	function handleUpdateLabel(e) {
		setFoodToUpdate({ ...foodToUpdate, label: e.target.value })
		setUpdatedInfo({ ...foodToUpdate, label: e.target.value })
	}

	async function handleUpdate(e) {
		e.preventDefault()

		try {
			let res = await axios.put(
				`${API_URL}/food/edit-dish/${foodToUpdate._id}`,
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
			AdminFoodUpdate
			<div className='form-container'>
				<form className='form' onSubmit={handleUpdate}>
					<label htmlFor='name'></label>
					<input
						className='input'
						name='name'
						required
						value={foodToUpdate.name}
						onChange={handleUpdateName}
						type='text'
						placeholder='Name'
					/>
					<label htmlFor='price'></label>
					<input
						name='price'
						required
						className='input'
						value={foodToUpdate.price}
						onChange={handleUpdatePrice}
						type='Number'
						placeholder='Price'
					/>
					<label htmlFor='description'></label>
					<textarea
						className='input description'
						name='description'
						value={foodToUpdate.description}
						onChange={handleUpdateDescription}
						type='text'
						placeholder='Description'
					/>
					<label htmlFor='label'></label>
					special label
					<select
						className='input'
						name='label'
						value={foodToUpdate.label}
						onChange={handleUpdateLabel}
					>
						<option value=''>-- None --</option>
						<option value='vegan'>Vegan</option>
						<option value='vegetarian'>Vegetarian</option>
						<option value='halal'>Halal</option>
						<option value='gluten-free'>Gluten-Free</option>
					</select>
					<button className='submit-button'>Update Food</button>
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

export default AdminFoodUpdate
