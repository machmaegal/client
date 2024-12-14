import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Auth.context';
import axios from 'axios';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);
	const navigate = useNavigate();
	const { storeToken, authenticateUser, setOrder, order, user } =
		useContext(AuthContext);
	const APIURL = import.meta.env.VITE_APIURL;

	function handleLogin(e) {
		e.preventDefault();

		const currentUser = {
			email,
			password,
		};

		axios
			.post(`${APIURL}/auth/login`, currentUser)
			.then((res) => {
				storeToken(res.data.data);
				// authenticateUser will return true or false for admin
				return authenticateUser();
			})
			.then((isAdmin) => {
				// value from the function authenticateUser if true is admin
				// if false is regular user

				if (isAdmin) {
					setOrder({ ...order, customer: user._id });
					navigate('/admin');
				} else {
					//console.log(user._id)

					setOrder({ ...order, customer: user._id });
					navigate('/user');
				}
			})
			.catch((err) => {
				console.log(err);
				setErrorMessage(err.res.data.message);
			});
	}

	return (
		<div className='main-container'>
			<section>
				<form className='form' onSubmit={handleLogin}>
					<label htmlFor='email'>email</label>
					<input
						className='input'
						id='email'
						type='email'
						value={email}
						placeholder='email address'
						onChange={(e) => setEmail(e.target.value)}
					/>

					<label htmlFor='password'>Password</label>
					<input
						className='input'
						id='password'
						type='password'
						value={password}
						placeholder='password'
						onChange={(e) => setPassword(e.target.value)}
					/>

					<button>Login</button>
				</form>
			</section>
			<p>New Here?</p>
			<Link to='/signup'>Sign Up</Link>
		</div>
	);
};

export default LoginPage;
