import { Link, useNavigate } from 'react-router'

const Nav = () => {
	return (
		<nav>
			<Link to='/'>food</Link>
			<Link to='/drinks'>drink</Link>
			<Link to='/login'>Sign In</Link>
			<Link to='/order'>Order</Link>
		</nav>
	)
}

export default Nav
