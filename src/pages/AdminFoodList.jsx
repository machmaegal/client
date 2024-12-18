import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Auth.context'

const AdminFoodList = () => {
	const [foods, setFoods] = useState()
	const { setFoodToUpdate } = useContext(AuthContext)
	const navigate = useNavigate()
	const API_URL = import.meta.env.VITE_APIURL
	const token = localStorage.getItem('authToken')
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

	async function handleDeleteFoodOrDrink(item) {
		try {
			let updatedItems = foods.filter((food) => {
				if (food._id !== item._id) {
					return food
				}
			})
			setFoods(updatedItems)
			await axios.delete(`${API_URL}/food/remove-dish/${item._id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='list'>
			{foods &&
				foods.map((food) => {
					return (
						<div className='list-item' key={food._id}>
							<div className='name-and-price-tack'>
								<div>{food.name}</div>
								<div>{food.price + `€`}</div>
							</div>
							<div>{food.description}</div>
							<div className='label'>
								<div>{food.label.at(0)}</div>
							</div>
							<div className='button-container'>
								<button
									className='submit-button'
									onClick={() =>
										handleDeleteFoodOrDrink(food)
									}
								>
									Delete Food
								</button>
								<button
									className='submit-button'
									onClick={() => {
										setFoodToUpdate(food)

										navigate('/admin/update-food')
									}}
								>
									Update Food
								</button>
							</div>
						</div>
					)
				})}
		</div>
	)
}

export default AdminFoodList
