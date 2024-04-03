import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../hocs/withAuth';
import axios from 'axios';
import './styles.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [originalOrders, setOriginalOrders] = useState([]);
    const [message, setMessage] = useState('');
    const [changed, setChanged] = useState(false);

    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    const currency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('/api/orders', { headers });
                console.log(response.data); // Print response to console
                setOriginalOrders(response.data);
                setOrders(response.data); // Make requests a 2D array
            } catch (error) {
                setMessage('An error occurred');
            }
        };
        fetchRequests();
    }, []);

    async function handleChange(index, event, field) {
        const newOrders = [...orders];
        newOrders[index][field] = event.target.value;
        setOrders(newOrders);
        setChanged(true);
    }

    async function handleOrderedChange(index, event, field) {
        if (event.target.value) {
            handleChange(index, { target: { value: new Date().toISOString().split('T')[0] } }, "Order_Date");
        } else {
            handleChange(index, { target: { value: '' } }, "Order_Date");
        }
        handleChange(index, event, field);
    }

    async function saveChanges() {
        try {
            for (let i = 0; i < orders.length; i++) {
                const response = await axios.put(`/api/orders/${orders[i].ID}`, orders[i], { headers });
                console.log(response.data); // Print response to console
            }
            setMessage('Changes saved successfully');
        } catch (error) {
            console.log(error);
            setMessage('An error occurred while saving changes');
        }
    }

    function cancelChanges() {
        setOrders([...originalOrders]);
        setChanged(false);
        setMessage('Changes cancelled');
    }

    return (
        <div className="container-fluid">
            <div>
                <Link to="/">
                    <button className="btn btn-primary">Home</button>
                </Link>
                <Link to="/form">
                    <button className="btn btn-primary">Form</button>
                </Link>
                <Link to="/requests">
                    <button className="btn btn-primary">Requests</button>
                </Link>
                <Link to="/orders">
                    <button className="btn btn-primary">Orders</button>
                </Link>
                <Link to="/upload">
                    <button className="btn btn-primary">Upload</button>
                </Link>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th><div className='cell-content medium'>Description</div></th>
                            {localStorage.getItem('role') === 'user' && (<th><div className='cell-content small'>Status</div></th>)}
                            <th><div className='cell-content small'>Priority</div></th>
                            <th><div className='cell-content medium'>Purpose</div></th>
                            <th><div className='cell-content medium'>Vendor</div></th>
                            <th><div className='cell-content medium'>Part Number</div></th>
                            <th><div className='cell-content small'>Price</div></th>
                            <th><div className='cell-content small'>Quantity</div></th>
                            <th><div className='cell-content large'>Link</div></th>
                            <th><div className='cell-content large'>Notes</div></th>
                            <th><div className='cell-content medium'>Order Date</div></th>
                            {localStorage.getItem('role') === 'admin' && (
                            <>
                                <th><div className='cell-content medium'>Payee</div></th>
                                <th><div className='cell-content small'>Invoice Number</div></th>
                                <th><div className='cell-content small'>Carted</div></th>
                                <th><div className='cell-content small'>Ordered</div></th>
                                <th><div className='cell-content small'>Received</div></th>
                            </>)}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td><div className='cell-content'>{order.Description}</div></td>
                                {localStorage.getItem('role') === 'user' && (
                                    <td>
                                        <div className='cell-content small'>
                                            {order.Received ? (
                                                'Received'
                                            ) : order.Ordered ? (
                                                'Ordered'
                                            ) : order.Carted ? (
                                                'Carted'
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </td>
                                )}
                                <td><div className='cell-content small'>{order.Priority}</div></td>
                                <td><div className='cell-content medium'>{order.Purpose}</div></td>
                                <td><div className='cell-content medium'>{order.Vendor}</div></td>
                                <td><div className='cell-content medium'>{order.Part_Num}</div></td>
                                <td><div className='cell-content small'>{currency.format(order.Unit_Price)}</div></td>
                                <td><div className='cell-content small'>{order.Quantity}</div></td>
                                <td><div className='cell-content large'><a href={order.Link} target="_blank" rel="noopener noreferrer">{order.Link}</a></div></td>                                <td><div className='cell-content medium'>{order.Notes}</div></td>
                                <td><div className='cell-content medium'>{order.Order_Date}</div></td>
                                {localStorage.getItem('role') === 'admin' && (
                                    <>
                                        <td>
                                            <div className='cell-content medium'>
                                                <select className="form-select" value={order.Payee} onChange={(e) => handleChange(index, e, "Payee")}>
                                                    <option value={null}>None</option>
                                                    <option value="McQ">McQuaid</option>
                                                    <option value="RCR">RCR</option>
                                                    <option value="Donation">Donation</option>
                                                    <option value="Voucher">Voucher</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-content small'>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={order.Invoice_Num}
                                                    onChange={(e) => handleChange(index, e, "Invoice_Num")}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-content small'>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    checked={order.Carted}
                                                    onChange={(e) => handleChange(index, { target: { value: e.target.checked } }, "Carted")}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-content small'>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    checked={order.Ordered}
                                                    onChange={(e) => handleOrderedChange(index, { target: { value: e.target.checked } }, "Ordered")}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-content small'>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    checked={order.Received}
                                                    onChange={(e) => handleChange(index, { target: { value: e.target.checked } }, "Received")}
                                                />
                                            </div>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                {changed && (
                    <>
                        <button className="btn btn-primary" onClick={saveChanges}>
                            Save Changes
                        </button>
                        <button className="btn btn-primary" onClick={cancelChanges}>
                            Cancel Changes
                        </button>
                    </>
                )}
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default withAuth(Orders);