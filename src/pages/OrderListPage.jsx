import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Auth.context'
import axios from 'axios'
const OrderListPage = () => {
	// const navigate = useNavigate()
	const { user, isLoggedIn, isAdmin /*setOrder, order */ } =
		useContext(AuthContext)

	const [orderDisplayed, setOrderdisplayed] = useState('')
	// --------------------------
	// update order
	const [updatedOrder, setUpdatedOrder] = useState({})

	async function handleUpdateFood(id) {
		let foodArr = updatedOrder.food.map((food) => food._id)
		let drinkArr = updatedOrder.drink.map((drink) => drink._id)
		let foodArrCopy = [...foodArr]
		let i = foodArrCopy.indexOf(id)
		if (i > -1) {
			foodArrCopy.splice(i, 1)
		}

		let orderToSend = {
			customer: updatedOrder.customer._id,
			food: foodArrCopy,
			drink: drinkArr,
		}

		let updateDB = await axios.put(
			`${API_URL}/orders/user/${user._id}/user-order/${updatedOrder._id}`,
			{ data: orderToSend },
			{ headers: { Authorization: `Bearer ${isToken}` } }
		)
		setUpdatedOrder({})
	}
	async function handleUpdateDrink(id) {
		let foodArr = updatedOrder.food.map((food) => food._id)
		let drinkArr = updatedOrder.drink.map((drink) => drink._id)
		let drinkArrCopy = [...drinkArr]
		let i = drinkArrCopy.indexOf(id)
		if (i > -1) {
			drinkArrCopy.splice(i, 1)
		}

		let drinkUp = []

		let orderToSend = {
			customer: updatedOrder.customer._id,
			food: foodArr,
			drink: drinkArrCopy,
		}

		let updateDB = await axios.put(
			`${API_URL}/orders/user/${user._id}/user-order/${updatedOrder._id}`,
			{ data: orderToSend },
			{ headers: { Authorization: `Bearer ${isToken}` } }
		)
		setUpdatedOrder({})
	}

	// -------------------------------------------
	const API_URL = import.meta.env.VITE_APIURL
	const isToken = localStorage.getItem('authToken')

	// --------------------------
	// delete order
	async function hadleDelete(id) {
		let deletedOrder = await axios.delete(
			`${API_URL}/orders/user/${user._id}/user-order/${id}`,
			{ headers: { Authorization: `Bearer ${isToken}` } }
		)
		let orders = orderDisplayed.filter((order) => {
			if (order._id === id) {
				// console.log(order._id, id)
			} else {
				return order
			}
		})
		setOrderdisplayed(orders)
	}
	// ---------------------
	// user getting one order after click
	async function getOneOrder(id) {
		const data = await axios.get(
			`${API_URL}/orders/user/${user._id}/user-order/${id}`,
			{ headers: { Authorization: `Bearer ${isToken}` } }
		)
		console.log(data.data.data)
	}
	// ---------------------
	// admin getting one order after click
	async function adminGetOneOrder(id) {
		const data = await axios.get(
			`${API_URL}/orders/admin/user-order/${id}`,
			{
				headers: { Authorization: `Bearer ${isToken}` },
			}
		)
		console.log(data.data.data)
	}
	// ------------------------
	useEffect(() => {
		const fetchOrders = async () => {
			try {
				if (isAdmin) {
					const response = await fetch(
						`${API_URL}/orders/admin/all-orders`,
						{ headers: { Authorization: `Bearer ${isToken}` } }
					)
					const { data } = await response.json()
					// console.log(data)
					return setOrderdisplayed(data)
				} /*if (order.drink.length > 0 || order.food.length > 0) */ else {
					const data = await axios.get(
						`${API_URL}/orders/user/${user._id}/user-orders`,
						{ headers: { Authorization: `Bearer ${isToken}` } }
					)
					setOrderdisplayed(data.data.data)
				}
			} catch (error) {
				console.log(error)
			}
		}
		fetchOrders()
	}, [user._id, updatedOrder._id])

	return (
		<div>
			{isLoggedIn ? <h1>Hi {user.name}</h1> : <h1>Please Log in</h1>}

			<div className='main-container'>
				{orderDisplayed &&
					orderDisplayed.map((order) => {
						return (
							<div
								key={order._id}
								onMouseEnter={() => {
									setUpdatedOrder(order)
									// setFinalUpdate('')
								}}
							>
								<div>{order._id}</div>
								<div>{order.customer.name}</div>
								<div>{order.customer.email}</div>

								{order.food.map((food, i) => {
									return (
										<div key={i}>
											<p>{food.name}</p>
											<p>{food.price}</p>
											<button
												onClick={() => {
													handleUpdateFood(food._id)
												}}
											>
												Remove item
											</button>
										</div>
									)
								})}
								{order.drink.map((drink, i) => {
									return (
										<div key={i}>
											<p>{drink.name}</p>
											<p>{drink.price}</p>
											<button
												onClick={() => {
													handleUpdateDrink(drink._id)
												}}
											>
												Remove item
											</button>
										</div>
									)
								})}

								<button
									onClick={() => {
										hadleDelete(order._id)
									}}
								>
									Delete Order
								</button>
							</div>
						)
					})}
			</div>
		</div>
	)
}

export default OrderListPage
