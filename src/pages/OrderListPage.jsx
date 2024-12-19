import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Auth.context';
import axios from 'axios';
const OrderListPage = () => {
	// const navigate = useNavigate()
	const { user, isLoggedIn, isAdmin /*setOrder, order */ } =
		useContext(AuthContext);

	const [orderDisplayed, setOrderdisplayed] = useState('');
	// --------------------------
	// update order
	const [updatedOrder, setUpdatedOrder] = useState({});
	const [total, setTotal] = useState(0);

	// -------------------------------------------
	const API_URL = import.meta.env.VITE_APIURL;
	const isToken = localStorage.getItem('authToken');

	// --------------------------
	// delete order
	async function hadleDelete(id) {
		let deletedOrder = await axios.delete(
			`${API_URL}/orders/user/${user._id}/user-order/${id}`,
			{ headers: { Authorization: `Bearer ${isToken}` } }
		);
		let orders = orderDisplayed.filter((order) => {
			if (order._id === id) {
				// console.log(order._id, id)
			} else {
				return order;
			}
		});
		setOrderdisplayed(orders);
	}
	// ---------------------
	// user getting one order after click
	/* 	async function getOneOrder(id) {
			const data = await axios.get(
				`${API_URL}/orders/user/${user._id}/user-order/${id}`,
				{ headers: { Authorization: `Bearer ${isToken}` } }
			);
			console.log(data.data.data);
		}
		// ---------------------
		// admin getting one order after click
		async function adminGetOneOrder(id) {
			const data = await axios.get(
				`${API_URL}/orders/admin/user-order/${id}`,
				{
					headers: { Authorization: `Bearer ${isToken}` },
				}
			);
			console.log(data.data.data);
		} */
	// ------------------------
	useEffect(() => {
		const fetchOrders = async () => {
			try {
				if (isAdmin) {
					const response = await fetch(
						`${API_URL}/orders/admin/all-orders`,
						{ headers: { Authorization: `Bearer ${isToken}` } }
					);
					const { data } = await response.json();
					//console.log(data);
					return setOrderdisplayed(data);
				} /*if (order.drink.length > 0 || order.food.length > 0) */ else {
					const data = await axios.get(
						`${API_URL}/orders/user/${user._id}/user-orders`,
						{ headers: { Authorization: `Bearer ${isToken}` } }
					);
					setOrderdisplayed(data.data.data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchOrders();
	}, [user._id, updatedOrder._id]);
	// -----------------------------
	// total function
	function totalBill(order) {
		let total = 0;
		order.food.forEach((food) => (total += food.price));
		order.drink.forEach((drink) => (total += drink.price));
		return total;
	}
	// ----------------------------
	return (
		<div className='list'>
			<br />
			{isLoggedIn ? <h1>Hi {user.name}</h1> : <h1>Please Log in!</h1>}
			<br />
			<div className='list'>
				{orderDisplayed &&
					orderDisplayed.map((order) => {
						return (
							<div
								className='list-item'
								key={order._id}
								onMouseEnter={() => {
									setUpdatedOrder(order);
								}}
							>
								<p className='name-and-price-tack'>order id:</p>
								<div className='id-tack'>{order._id}</div>
								<br />
								<p className='name-and-price-tack'>Customer:</p>
								<div>{order.customer.name}</div>
								<div>{order.customer.email}</div>
								<br />

								<p className='name-and-price-tack'>Items:</p>
								{order.food.map((food, i) => {
									return (
										<div key={i}>
											<div className='name-price-format-container'>
												<p>{food.name}</p>
												<p>{food.price}€</p>
											</div>
											{/* <button
												onClick={() => {
													handleUpdateFood(food._id)
												}}
											>
												Remove item
											</button> */}
										</div>
									);
								})}
								{order.drink.map((drink, i) => {
									return (
										<div key={i}>
											<div className='name-price-format-container'>
												<p>{drink.name}</p>
												<p>{drink.price}€</p>
											</div>
											{/* <button
												onClick={() => {
													handleUpdateDrink(drink._id)
												}}
											>
												Remove item
											</button> */}
										</div>
									);
								})}
								<br />
								<div className='name-price-format-container'>
									<p className='name-and-price-tack'>
										Total:
									</p>
									<p>{totalBill(order)}€</p>
								</div>
								<br />
								<button
									className='submit-button'
									onClick={() => {
										hadleDelete(order._id);
									}}
								>
									Delete Order
								</button>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default OrderListPage;
