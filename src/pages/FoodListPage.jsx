import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/Auth.context'
const FoodListPage = () => {
	const { user, isLoggedIn, setOrder, order, orderDetail, setOrderDetail } =
		useContext(AuthContext)
	const API_URL = import.meta.env.VITE_APIURL

	function handdleAddToCart(item) {
		setOrder({
			...order,
			food: [item._id, ...order.food],
			customer: user._id,
		})
		setOrderDetail({
			...orderDetail,
			food: [item, ...orderDetail.food],
			customer: user._id,
		})
	}

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
		<div className='list'>
			{foods &&
				foods.map((food) => {
					return (
						<div key={food._id} className='list-item'>
							<div className='name-and-price-tack'>
								<p>{food.name}</p>
								<p>{food.price + `€`}</p>
							</div>
							<div>{food.description}</div>
							<div>{food.label[0]}</div>
							<button
								className='submit-button'
								onClick={() => {
									if (isLoggedIn) {
										handdleAddToCart(food)
									} else {
										alert('Please Login!!')
									}
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
