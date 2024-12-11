import React from 'react';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../context/Auth.context';
import FoodCreatePage from './FoodCreatePage';
import DrinkCreatePage from './DrinkCreatePage';

const AdminPage = () => {



    return (
        <div>
            <DrinkCreatePage />
            <FoodCreatePage />
        </div>
    );
};

export default AdminPage;