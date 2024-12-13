import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/Auth.context'
import axios from 'axios'
const OrderListPage = () => {
	const { user, isLoggedIn, isAdmin, setOrder, order } =
		useContext(AuthContext)
	const [orderDisplayed, setOrderdisplayed] = useState('')
	const API_URL = import.meta.env.VITE_APIURL

	// const [orders, setOrders] = useState()

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const isToken = localStorage.getItem('authToken')
				if (isAdmin) {
					const response = await fetch(
						`${API_URL}/orders/admin/all-orders`,
						{ headers: { Authorization: `Bearer ${isToken}` } }
					)
					const { data } = await response.json()
					console.log(data)
					setOrderdisplayed(data)
				} else {
					const storeOrder = await axios.post(
						`${API_URL}/user/:userId/make-order`
					)
				}
			} catch (error) {
				console.log(error)
			}
		}
		fetchOrders()
	}, [])

	return (
		<div>
			{isLoggedIn ? <h1>Hi {user.name}</h1> : <h1>Please Log in</h1>}

			<div className='main-container'>
				{orderDisplayed &&
					orderDisplayed.map((order) => {
						return <div key={order._id}>{order}</div>
					})}
			</div>
		</div>
	)
}

export default OrderListPage
