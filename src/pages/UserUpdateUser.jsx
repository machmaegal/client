import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Auth.context'
import axios from 'axios'
const UserUpdateUser = () => {
	const API_URL = import.meta.env.VITE_APIURL
	const { userToUpdate, setUserToUpdate } = useContext(AuthContext)
	const [updatedInfo, setUpdatedInfo] = useState({})
	const token = localStorage.getItem('authToken')
	const navigate = useNavigate()

	function handleUpdateName(e) {
		setUserToUpdate({ ...userToUpdate, name: e.target.value })
		setUpdatedInfo({ ...userToUpdate, name: e.target.value })
	}
	function handleUpdateEmail(e) {
		setUserToUpdate({ ...userToUpdate, email: e.target.value })
		setUpdatedInfo({ ...userToUpdate, email: e.target.value })
	}
	async function handleUpdateUser(e) {
		e.preventDefault()

		try {
			let res = await axios.put(
				`${API_URL}/users/${userToUpdate._id}`,
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
			UserUpdateUser
			<div>
				<div className='form-container'>
					<form className='form' onSubmit={handleUpdateUser}>
						<label htmlFor='name'></label>
						<input
							className='input'
							name='name'
							required
							type='text'
							value={userToUpdate.name}
							onChange={handleUpdateName}
							// placeholder='Name'
						/>
						<label htmlFor='price'></label>
						<input
							className='input'
							name='email'
							required
							type='email'
							value={userToUpdate.email}
							onChange={handleUpdateEmail}
							// placeholder='Price'
						/>

						<button className='submit-button'>Update!</button>
					</form>
				</div>
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

export default UserUpdateUser
