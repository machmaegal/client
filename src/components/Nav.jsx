import { Link, useNavigate } from 'react-router'
import { AuthContext } from '../context/Auth.context'
import { useContext, useState } from 'react'

const Nav = () => {
	const { isLoggedIn, handleLogout } = useContext(AuthContext)

	/* async function logout() {
		setUserIsLoggedIn(isLoggedIn);
		handleLogout();
		console.log('hello');
	} */

	return (
		<nav>
			<div className='nav-select'>
				<Link to='/'>Food</Link>
				<Link to='/drinks'>Drink</Link>
				{isLoggedIn ? <Link to='/user/my-order'>Order</Link> : ''}
				{isLoggedIn ? (
					<Link to='/user/all-orders'>All Orders</Link>
				) : (
					''
				)}
				{isLoggedIn ? <Link to='/user'>Profile Page</Link> : ''}
			</div>
			<div>
				{isLoggedIn ? (
					<button
						className='submit-button'
						onClick={() => handleLogout()}
					>
						Sign out
					</button>
				) : (
					<Link to='/login'>Sign In</Link>
				)}
			</div>
		</nav>
	)
}

export default Nav
