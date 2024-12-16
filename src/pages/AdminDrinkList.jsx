import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Auth.context'

const AdminDrinkList = () => {
	const [drinks, setDrinks] = useState()
	const { setDrinkToUpdate } = useContext(AuthContext)
	const navigate = useNavigate()
	const API_URL = import.meta.env.VITE_APIURL
	const token = localStorage.getItem('authToken')
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
	async function handleDeleteFoodOrDrink(item) {
		try {
			let updatedItems = drinks.filter((drink) => {
				if (drink._id !== item._id) {
					return drink
				}
			})
			setDrinks(updatedItems)
			await axios.delete(`${API_URL}/drink/remove-drink/${item._id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className='main-container'>
			{drinks &&
				drinks.map((drink) => {
					return (
						<div key={drink._id}>
							<div>{drink.name}</div>
							<div>{drink.description}</div>
							<div>{drink.label.at(0)}</div>
							<div>{drink.price + `€`}</div>
							<button
								onClick={() => handleDeleteFoodOrDrink(drink)}
							>
								Delete Drink
							</button>
							<button
								onClick={() => {
									setDrinkToUpdate(drink)

									navigate('/admin/update-drink')
								}}
							>
								update Drink
							</button>
						</div>
					)
				})}
		</div>
	)
}

export default AdminDrinkList
