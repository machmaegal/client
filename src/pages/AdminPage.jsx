import { useState } from 'react'
//import { AuthContext } from '../context/Auth.context';
import FoodCreatePage from './FoodCreatePage'
import DrinkCreatePage from './DrinkCreatePage'
import UserListPage from './UserListPage'
import OrderListPage from './OrderListPage'
import UpdateFoodAndDrink from './UpdateFoodAndDrink'

const AdminPage = () => {
	const [showCrudFood, setShowCrudFood] = useState('')
	const [showCrudDrink, setShowCrudDrink] = useState('')
	const [showCrudUser, setShowCrudUser] = useState('')
	const [showCrudOrder, setShowCrudOrder] = useState('')
	const [showUpdateFoodAndDrink, setShowUpdateFoodAndDrink] = useState('')

	function handleStateOfView(e) {
		switch (true) {
			case e.target.value === 'crud-food':
				setShowCrudFood(true)
				setShowCrudDrink('')
				setShowCrudUser('')
				setShowCrudOrder('')
				setShowUpdateFoodAndDrink('')
				break
			case e.target.value === 'crud-drink':
				setShowCrudFood('')
				setShowCrudDrink(true)
				setShowCrudUser('')
				setShowCrudOrder('')
				setShowUpdateFoodAndDrink('')
				break
			case e.target.value === 'crud-user':
				setShowCrudFood('')
				setShowCrudDrink('')
				setShowCrudUser(true)
				setShowCrudOrder('')
				setShowUpdateFoodAndDrink('')
				break
			case e.target.value === 'crud-order':
				setShowCrudFood('')
				setShowCrudDrink('')
				setShowCrudUser('')
				setShowCrudOrder(true)
				setShowUpdateFoodAndDrink('')
				break
			case e.target.value === 'update-food-and-drink':
				setShowCrudFood('')
				setShowCrudDrink('')
				setShowCrudUser('')
				setShowCrudOrder('')
				setShowUpdateFoodAndDrink(true)
				break
			default:
				break
		}
	}

	return (
		<div className=''>
			<h3>Pick a Category to Display</h3>
			<div id='admin-menu'>
				<label htmlFor='food'>
					<input
						type='radio'
						id='food'
						name='create-view-option'
						value='crud-food'
						onClick={handleStateOfView}
					/>{' '}
					Create Food
				</label>

				<label htmlFor='drink'>
					<input
						type='radio'
						id='drink'
						name='create-view-option'
						value='crud-drink'
						onClick={handleStateOfView}
					/>{' '}
					Create Drink
				</label>

				<label htmlFor='update-food-and-drink'>
					<input
						type='radio'
						id='update-food-and-drink'
						name='create-view-option'
						value='update-food-and-drink'
						onClick={handleStateOfView}
					/>{' '}
					Update Food and Drink
				</label>

				<label htmlFor='user'>
					<input
						type='radio'
						id='user'
						name='create-view-option'
						value='crud-user'
						onClick={handleStateOfView}
					/>{' '}
					User
				</label>
				<label htmlFor='order'>
					<input
						type='radio'
						id='order'
						name='create-view-option'
						value='crud-order'
						onClick={handleStateOfView}
					/>{' '}
					Order
				</label>
			</div>

			{showCrudFood && <FoodCreatePage />}
			{showCrudDrink && <DrinkCreatePage />}
			{showCrudUser && <UserListPage />}
			{showCrudOrder && <OrderListPage />}
			{showUpdateFoodAndDrink && <UpdateFoodAndDrink />}
		</div>
	)
}

export default AdminPage
