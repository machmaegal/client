import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/Auth.context'
const DrinkListPage = () => {
	const { user, isLoggedIn, setOrder, order, orderDetail, setOrderDetail } =
		useContext(AuthContext)
	const API_URL = import.meta.env.VITE_APIURL
	function handdleAddToCart(item) {
		setOrder({
			...order,
			drink: [item._id, ...order.drink],
			customer: user._id,
		})
		setOrderDetail({
			...orderDetail,
			drink: [item, ...orderDetail.drink],
			customer: user._id,
		})
	}
	const [drinks, setDrinks] = useState()
	// --------------------------
	// function to convert to camel case
	/* String.prototype.camelCase = function () {
        let newString = '';

        this.split(' ').forEach(function (str) {
            newString = `${newString} ${str.substring(0, 1).toUpperCase()}${str
                .substring(1)
                .toLowerCase()}`; //XD
        });

        return newString.substring(1);
    }; */
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
							<div>{drink.name}</div>
							<div>{drink.description}</div>
							<div>{drink.label[0]}</div>
							<div>{drink.price + `€`}</div>
							<button
								onClick={() => {
									if (isLoggedIn) {
										handdleAddToCart(drink)
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

export default DrinkListPage
