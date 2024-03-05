import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../hocs/withAuth';


import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState('');
    
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('/api/orders', { headers });
                console.log(response.data); // Print response to console
                setOrders(response.data); // Make requests a 2D array
            } catch (error) {
                setMessage('An error occurred');
            }
        };
        fetchRequests();
    }, []);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr', gap: '5px'}}>
                <p><strong>Description</strong></p>
                <p><strong>Vendor</strong></p>
                <p><strong>Part Number</strong></p>
                <p><strong>Unit Price</strong></p>
                <p><strong>Quantity</strong></p>
                <p><strong>Link</strong></p>
                <p><strong>Notes</strong></p>
                <p><strong>Order Date</strong></p>
                <p><strong>Payee</strong></p>
                <p><strong>Invoice Number</strong></p>
                <p><strong>Carted</strong></p>
                <p><strong>Ordered</strong></p>
                <p><strong>Recieved</strong></p>
            </div>
            {orders.map((order, index) => (
                <div key={index} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr', gap: '5px' }}>
                    <p>{order.Description}</p>
                    <p>{order.Vendor}</p>
                    <p>{order.Part_Num}</p>
                    <p>{order.Unit_Price}</p>
                    <p>{order.Quantity}</p>
                    <p>{order.Link}</p>
                    <p>{order.Notes}</p>
                    <p>{order.Order_Date}</p>
                    <p>{order.Payee}</p>
                    <p>{order.Invoice_Num}</p>
                    <p>{order.Carted ? 'True' : 'False'}</p>
                    <p>{order.Ordered ? 'True' : 'False'}</p>
                    <p>{order.Recieved ? 'True' : 'False'}</p>
                    {/* Add more <p> elements as needed */}
                </div>
            ))}
            <Link to="/">
                    <button>Home</button>
                </Link>
            {message && <p>{message}</p>}
        </div>
    );
};

export default withAuth(Orders);
