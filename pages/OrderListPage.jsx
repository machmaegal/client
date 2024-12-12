import { useState, useEffect } from 'react';

const OrderListPage = () => {
    const API_URL = import.meta.env.VITE_APIURL;

    const [orders, setOrders] = useState();

    /*  useEffect(() => {
         const fetchOrders = async () => {
             try {
                 const response = await fetch(`${API_URL}/`); //route ?
 
                 const { data } = await response.json();
                 console.log(data);
 
                 setOrders(data);
 
             } catch (error) {
                 console.log(error);
             }
         };
         fetchOrders();
     }, []); */

    return (
        <div className='main-container'>
            {orders &&
                orders.map((order, i) => {
                    return (
                        <div key={i}>
                            {order.name}
                        </div>);
                })
            }
        </div>
    );
};

export default OrderListPage;