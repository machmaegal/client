import { useState, useContext } from 'react'
import { AuthContext } from '../context/Auth.context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function OrderDetailPage() {
	const navigate = useNavigate()
	const {
		storeToken,
		authenticateUser,
		setOrder,
		order,
		user,
		orderDetail,
		setOrderDetail,
	} = useContext(AuthContext)
	const APIURL = import.meta.env.VITE_APIURL
	// --------------------------
	// update order
	async function handleCreateOrder() {
		const token = localStorage.getItem('authToken')
		let orderCreated = await axios.post(
			`${APIURL}/orders/user/${orderDetail.customer}/make-order`,
			{ data: orderDetail },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		navigate('/user/all-orders')
		setOrderDetail({
			customer: orderDetail.customer,
			food: [],
			drink: [],
		})
		setOrder({
			customer: orderDetail.customer,
			food: [],
			drink: [],
		})
	}

	async function handleUpdateFood(id) {
		let foodArr = orderDetail.food.map((food) => food._id)
		let drinkArr = orderDetail.drink.map((drink) => drink._id)
		let foodArrCopy = [...foodArr]
		let i = foodArrCopy.indexOf(id)
		if (i > -1) {
			foodArrCopy.splice(i, 1)
		}
		let foodDetailArr = []
		for (let i = 0; i < foodArrCopy.length; i++) {
			orderDetail.food.find((food) => {
				if (food._id === foodArrCopy[i]) {
					return foodDetailArr.push(food)
				}
			})
		}
		let orderToDisplay = {
			customer: orderDetail.customer,
			food: foodDetailArr,
			drink: orderDetail.drink,
		}
		console.log(orderToDisplay)
		setOrderDetail(orderToDisplay)
		let orderToSend = {
			customer: orderDetail.customer,
			food: foodArrCopy,
			drink: drinkArr,
		}
		console.log(orderToSend)
		// setOrder(orderToSend)
		// let updateDB = await axios.put(
		// 	`${API_URL}/orders/user/${user._id}/user-order/${updatedOrder._id}`,
		// 	{ data: orderToSend },
		// 	{ headers: { Authorization: `Bearer ${isToken}` } }
		// )
	}
	async function handleUpdateDrink(id) {
		let foodArr = orderDetail.food.map((food) => food._id)
		let drinkArr = orderDetail.drink.map((drink) => drink._id)
		let drinkArrCopy = [...drinkArr]
		let i = drinkArrCopy.indexOf(id)
		if (i > -1) {
			drinkArrCopy.splice(i, 1)
		}
		let drinkDetailArr = []
		for (let i = 0; i < drinkArrCopy.length; i++) {
			orderDetail.drink.find((drink) => {
				if (drink._id === drinkArrCopy[i]) {
					return drinkDetailArr.push(drink)
				}
			})
		}
		let orderToDisplay = {
			customer: orderDetail.customer,
			food: orderDetail.food,
			drink: drinkDetailArr,
		}
		setOrderDetail(orderToDisplay)
		let orderToSend = {
			customer: orderDetail.customer,
			food: foodArr,
			drink: drinkArrCopy,
		}
	}

	// -------------------------------------------

	return (
		<div className='list'>
			<br />
			<h1>Welcome back {user.name.toUpperCase()}!</h1>
			<br />
			<p>Please navigate between food and drink tabs!</p>
			<br />
			{orderDetail.food.length > 0
				? orderDetail.food.map((food) => {
						return (
							<div className='list-item' key={food._id}>
								<div className='name-and-price-tack'>
									<div>{food.name}</div>
									<div>{food.price + `€`}</div>
								</div>
								<div>{food.description}</div>
								<div className='label'>{food.label[0]}</div>
								<button
									onClick={() => {
										handleUpdateFood(food._id)
									}}
								>
									Remove Item
								</button>
							</div>
						)
				  })
				: ''}
			{orderDetail.drink.length > 0
				? orderDetail.drink.map((drink) => {
						return (
							<div className='list-item' key={drink._id}>
								<div className='name-and-price-tack'>
									<div>{drink.name}</div>
									<div>{drink.price + `€`}</div>
								</div>
								<div>{drink.description}</div>
								<div className='label'>{drink.label[0]}</div>
								<button
									className='submit-button'
									onClick={() => {
										handleUpdateDrink(drink._id)
									}}
								>
									Remove Item
								</button>
							</div>
						)
				  })
				: ''}
			{orderDetail.drink.length > 0 ? (
				<button className='submit-button' onClick={handleCreateOrder}>
					Place Order
				</button>
			) : orderDetail.food.length > 0 ? (
				<button className='submit-button' onClick={handleCreateOrder}>
					Place Order
				</button>
			) : (
				''
			)}
		</div>
	)
}

export default OrderDetailPage
