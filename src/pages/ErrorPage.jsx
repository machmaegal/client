import { Link } from 'react-router-dom'

const ErrorPage = () => {
	return (
		<>
			<h1>
				Sorry ! We Could Not Find What You Were Looking For <br></br>
				... Please Don't Starve
			</h1>
			<h2>Error 404</h2>
			<Link to='/'>
				Click Here To Go Back An Order Some Delicious Food !
			</Link>
		</>
	)
}

export default ErrorPage
