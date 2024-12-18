import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Auth.context'
import axios from 'axios'

const UserProfilePage = () => {
	const { user, handleLogout } = useContext(AuthContext)
	const API_URL = import.meta.env.VITE_APIURL
	const isToken = localStorage.getItem('authToken')
	const [profileUser, setProfileUser] = useState()

	//get the user data from the database and store the data in user state
	useEffect(() => {
		axios
			.get(`${API_URL}/users/${user._id}`, {
				headers: { Authorization: `Bearer ${isToken}` },
			})
			.then((res) => setProfileUser(res.data.data))
			.catch((err) => console.log(err))
	}, [])

	//handle form inputs the user wants to update
	function handleChange(e) {
		const whatWasTyped = e.target.value
		const inputThatIsUsed = e.target.name
		setProfileUser({ ...profileUser, [inputThatIsUsed]: whatWasTyped })
	}

	//store the updated data in user state and send the changes to database
	function handleUpdate(e) {
		e.preventDefault()
		axios
			.put(`${API_URL}/users/${user._id}`, profileUser, {
				headers: { Authorization: `Bearer ${isToken}` },
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err))
	}

	//send delete request for user to database and remove token from browser/sign out
	async function handleDelete(e) {
		e.preventDefault()
		await axios
			.delete(`${API_URL}/users/${user._id}`, {
				headers: { Authorization: `Bearer ${isToken}` },
			})
			.then((res) => {
				console.log(res)
				handleLogout()
			})
			.catch((error) => console.log(error))
	}

	return (
		<div className='list'>
			<br />
			{profileUser && (
				<div className='form-container'>
					<form className='form' onSubmit={handleUpdate}>
						<label htmlFor='name'></label>
						<input
							className='input'
							id='name'
							type='text'
							name='name'
							value={profileUser.name}
							placeholder='Name'
							onChange={handleChange}
						/>

						<label htmlFor='email'></label>
						<input
							className='input'
							id='email'
							type='email'
							name='email'
							value={profileUser.email}
							placeholder='Email'
							onChange={handleChange}
						/>

						{/* <label htmlFor='password'></label>
						<input
							id='password'
							type='password'
							name='password'
							value={profileUser.password}
							placeholder='New Password'
							onChange={handleChange}
						/> */}

						<div className='button-container'>
							<button className='submit-button'>Update</button>
							<button
								className='submit-button'
								onClick={handleDelete}
							>
								Delete
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	)
}

export default UserProfilePage
