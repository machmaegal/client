import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Auth.context'
import axios from 'axios'

const UserListPage = () => {
	const { setUserToUpdate } = useContext(AuthContext)
	const navigate = useNavigate()
	const API_URL = import.meta.env.VITE_APIURL
	const token = localStorage.getItem('authToken')
	const [users, setUsers] = useState()

	async function handleDeleteUser(currUser) {
		let updatedUsers = users.filter((user) => {
			if (user._id !== currUser._id) {
				return user
			}
		})
		setUsers(updatedUsers)

		await axios.delete(`${API_URL}/users/${currUser._id}`, {
			headers: { Authorization: `Bearer ${token}` },
		})
	}

	useEffect(() => {
		const fetchUsers = async () => {
			const isToken = localStorage.getItem('authToken')
			try {
				const response = await fetch(`${API_URL}/users`, {
					headers: { Authorization: `Bearer ${isToken}` },
				})
				const { data } = await response.json()
				//console.log(data);

				setUsers(data)
			} catch (error) {
				console.log(error)
			}
		}
		fetchUsers()
	}, [])

	return (
		<div className='main-container'>
			{users &&
				users.map((user) => {
					return (
						<div key={user._id}>
							<div>
								<p>Name: {user.name}</p>
								<p>Email: {user.email}</p>
								<p>Is Admin: {user.admin ? 'Yes' : 'No'}</p>
								<p>{user.address[0]}</p>

								<button
									onClick={() => {
										handleDeleteUser(user)
									}}
								>
									Delete User
								</button>
								<button
									onClick={() => {
										setUserToUpdate(user)

										navigate('/admin/update-user')
									}}
								>
									Update User
								</button>
							</div>
						</div>
					)
				})}
		</div>
	)
}

export default UserListPage
