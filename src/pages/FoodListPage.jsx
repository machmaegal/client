import { useState, useEffect } from 'react'

const FoodListPage = () => {
	const API_URL = import.meta.env.VITE_APIURL

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
							<div>{food.name}</div>
							<div>{food.name}</div>
							<div>{food.name}</div>
							<div>{food.name}</div>
						</div>
					)
				})}
		</div>
	)
}

export default FoodListPage
