import { useState } from 'react';
//import { AuthContext } from '../context/Auth.context';
import FoodCreatePage from './FoodCreatePage';
import DrinkCreatePage from './DrinkCreatePage';
import UserListPage from './UserListPage';
import OrderListPage from './OrderListPage';

const AdminPage = () => {
    const [showCrudFood, setShowCrudFood] = useState('');
    const [showCrudDrink, setShowCrudDrink] = useState('');
    const [showCrudUser, setShowCrudUser] = useState('');

    function handleStateOfView(e) {

        switch (true) {
            case e.target.value === 'crud-food':
                setShowCrudFood(true);
                setShowCrudDrink('');
                setShowCrudUser('');
                break;
            case e.target.value === 'crud-drink':
                setShowCrudFood('');
                setShowCrudDrink(true);
                setShowCrudUser('');
                break;
            case e.target.value === 'crud-user':
                setShowCrudFood('');
                setShowCrudDrink('');
                setShowCrudUser(true);
                break;
            default:
                break;
        }

    };

    return (
        <div className='main-container'>
            <h3>pick a crud-operation</h3>
            <div id='admin-menu'>
                <label htmlFor="food">
                    <input
                        type="radio"
                        id="food"
                        name="create-view-option"
                        value="crud-food"
                        onClick={handleStateOfView}
                    /> food
                </label>

                <label htmlFor="drink">
                    <input
                        type="radio"
                        id="drink"
                        name="create-view-option"
                        value="crud-drink"
                        onClick={handleStateOfView}
                    /> drink
                </label>

                <label htmlFor="user">
                    <input
                        type="radio"
                        id="user"
                        name="create-view-option"
                        value="crud-user"
                        onClick={handleStateOfView}
                    /> user
                </label>
            </div>

            {showCrudFood && <FoodCreatePage />}
            {showCrudDrink && <DrinkCreatePage />}
            {showCrudUser && <UserListPage />}
            {/* {showCrudOrder && <OrderListPage />} */}

        </div>
    );
};

export default AdminPage;