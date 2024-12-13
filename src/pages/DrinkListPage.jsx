import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/Auth.context'
const DrinkListPage = () => {
	const { isLoggedIn, setOrder, order } = useContext(AuthContext)
	const API_URL = import.meta.env.VITE_APIURL
	function handdleAddToCart(item) {
		setOrder({ ...order, drink: [item, ...order.drink] })
	}
	const [drinks, setDrinks] = useState()
	// --------------------------
	// function to convert to camel case
	String.prototype.camelCase = function () {
		let newString = ''

		this.split(' ').forEach(function (str) {
			newString = `${newString} ${str.substring(0, 1).toUpperCase()}${str
				.substring(1)
				.toLowerCase()}` //XD
		})

		return newString.substring(1)
	}
	// ---------------------------------------

	useEffect(() => {
		const fetchDrinks = async () => {
			try {
				const response = await fetch(`${API_URL}/drink/drinks`)

				const { data } = await response.json()
				//console.log(data);

				setDrinks(data)
			} catch (error) {
				console.log(error)
			}
		}
		fetchDrinks()
	}, [])

	return (
		<div className='main-container'>
			{drinks &&
				drinks.map((drink) => {
					return (
						<div key={drink._id}>
							<div>{drink.name.camelCase()}</div>
							<div>{drink.description.camelCase()}</div>
							<div>{drink.label[0].camelCase()}</div>
							<div>{drink.price + `€`}</div>
							<button
								onClick={() => {
									handdleAddToCart(drink._id)
								}}
							>
								Add to Cart!
							</button>
						</div>
					)
				})}
		</div>
	)
}

export default DrinkListPage
