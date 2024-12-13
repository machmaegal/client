import { useState, useEffect } from 'react'

const FoodListPage = () => {
	const API_URL = import.meta.env.VITE_APIURL
	const [foodCart, setFoodCart] = useState([])
	function handdleAddToCart(item) {
		setFoodCart([item, ...foodCart])
	}
	// --------------------------
	// function to convert to camel case
	String.prototype.camelCase = function () {
		let newString = ''

		this.split(' ').forEach(function (str) {
			newString = `${newString} ${str
				.substring(0, 1)
				.toUpperCase()}${str.substring(1)}` //XD
		})

		return newString.substring(1)
	}
	// ---------------------------------------
	const [foods, setFoods] = useState()

	useEffect(() => {
		const fetchFoods = async () => {
			try {
				const response = await fetch(`${API_URL}/food/dishes`)

				const { data } = await response.json()
				//console.log(data);

				setFoods(data)
			} catch (error) {
				console.log(error)
			}
		}
		fetchFoods()
	}, [])

	return (
		<div className='main-container'>
			{foods &&
				foods.map((food) => {
					return (
						<div key={food._id} className='item-card'>
							<div>{food.name.camelCase()}</div>
							<div>{food.description.camelCase()}</div>
							<div>{food.label[0].camelCase()}</div>
							<div>{food.price + `€`}</div>
							<button
								onClick={() => {
									console.log(isLoggedIn)

									handdleAddToCart(food._id)
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

export default FoodListPage
