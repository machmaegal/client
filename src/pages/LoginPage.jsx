import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Auth.context'
import axios from 'axios'

const LoginPage = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState(null)
	const navigate = useNavigate()
	const { storeToken, authenticateUser, setOrder, order, user } =
		useContext(AuthContext)
	const APIURL = import.meta.env.VITE_APIURL

	async function handleCreateOrder(currentOrder, userId) {
		const token = localStorage.getItem('authToken')
		let orderCreated = await axios.post(
			`${APIURL}/orders/user/${userId}/make-order`,
			{ data: currentOrder },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
	}

	async function handleLogin(e) {
		e.preventDefault()

		const currentUser = {
			email,
			password,
		}

		await axios
			.post(`${APIURL}/auth/login`, currentUser)
			.then((res) => {
				storeToken(res.data.data)
				// authenticateUser will return true or false for admin
				return authenticateUser()
			})
			.then((isAdmin) => {
				// value from the function authenticateUser if true is admin
				// if false is regular user

				if (isAdmin) {
					setOrder({ ...order, customer: user._id })
					handleCreateOrder(order, user._id)
					navigate('/admin')
				} else {
					//console.log(user._id)

					setOrder({ ...order, customer: user._id })
					handleCreateOrder(order, user._id)
					navigate('/user')
				}
			})
			.catch((err) => {
				console.log(err)
				setErrorMessage(err.res.data.message)
			})
	}

	return (
		<div className='main-container'>
			<div className='form-container'>
				<form className='form' onSubmit={handleLogin}>
					<label htmlFor='email'></label>
					<input
						className='input'
						id='email'
						type='email'
						value={email}
						placeholder='email address'
						onChange={(e) => setEmail(e.target.value)}
					/>

					<label htmlFor='password'></label>
					<input
						className='input'
						id='password'
						type='password'
						value={password}
						placeholder='password'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className='submit-button'>Login</button>
				</form>
			</div>
			<p>New Here?</p>
			<Link to='/signup'>Sign Up</Link>
		</div>
	)
}

export default LoginPage
