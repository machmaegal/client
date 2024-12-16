import { Link, useNavigate } from 'react-router';

const Nav = () => {
	return (
		<nav>
			<div className='nav-select'>
				<Link to='/'>food</Link>
				<Link to='/drinks'>drink</Link>
				<Link to='/order'>Order</Link>
			</div>
			<Link to='/login'>Sign In</Link>
		</nav>
	);
};

export default Nav;
