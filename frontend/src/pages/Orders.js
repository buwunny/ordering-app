import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../hocs/withAuth';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './styles.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [purposes, setPurposes] = useState([]);
    const [originalOrders, setOriginalOrders] = useState([]);
    const [message, setMessage] = useState('');
    const [changed, setChanged] = useState(false);
    const [filter, setFilter] = useState('');
    const [filterChanged, setFilterChanged] = useState(false);

    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`
    }
    const decoded = jwtDecode(token);
    const role = decoded.role;

    const currency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    async function fetchOrders() {
        try {
            const response = await axios.get('/api/orders', { headers });
            console.log(response.data); // Print response to console
            setOriginalOrders(response.data);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
            setMessage('An error occurred');
        }
    }

    async function fetchVendors(){
        try {
            const response = await axios.get('/api/vendors', { headers });
            console.log(response.data);
            setVendors(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
            setMessage('An error occurred');
        }
    }

    async function fetchPurposes(){
        try {
            const response = await axios.get('/api/purposes', { headers });
            console.log(response.data);
            setPurposes(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
            setMessage('An error occurred');
        }
    }

    useEffect(() => {
        fetchOrders();
        fetchVendors();
        fetchPurposes();

        if (filterChanged && filter === '') {
            fetchOrders();
        }
    }, [filter]);

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

    async function handleFilter(field, value) {
        setFilterChanged(true)
        let response;
        try {
            if (value === '') {
                response = await axios.get('/api/orders', { headers });
            } else {
                response = await axios.get(`/api/orders/filter?field=${field}&value=${value}`, { headers });
            }
                console.log(response.data);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
            setMessage('An error occurred');
        }
    }
    
    async function saveChanges() {
        try {
            const response = await axios.put('/api/orders', orders, { headers });
            console.log(response.data);
            setOriginalOrders([...orders]);
            setChanged(false);
            setMessage('Changes saved successfully');
        } catch (error) {
            console.log(error);
            setChanged(false);
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
            <div className='flex'>
                <p>Filter:</p>
                <select className="form-select filter" onChange={(e) => setFilter(e.target.value)}>
                    <option value="">None</option>
                    <option value="Status">Status</option>
                    <option value="Priority">Priority</option>
                    <option value="Purpose">Purpose</option>
                    <option value="Vendor">Vendor</option>
                    {role === 'admin' && (
                        <option value="Payee">Payee</option>
                    )}
                </select>
                
                {filter === 'Status' && (
                    <select className="form-select filter" onChange={(e) => handleFilter('Status', e.target.value)}>
                        <option value="">All</option>
                        <option value="Carted">Carted</option>
                        <option value="Ordered">Ordered</option>
                        <option value="Received">Received</option>
                    </select>
                )}
                {filter === 'Priority' && (
                    <select className="form-select filter" onChange={(e) => handleFilter('Priority', e.target.value)}>
                        <option value="">All</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                )}
                {filter === 'Purpose' && (
                    <select className="form-select filter" onChange={(e) => handleFilter('Purpose', e.target.value)}>
                        <option value="">All</option>
                        {purposes.map((purpose, index) => (
                            <option key={index} value={purpose}>{purpose}</option>
                        ))}
                        <option value="Other">Other</option>
                    </select>
                )}
                {filter === 'Vendor' && (
                    <select className="form-select filter" onChange={(e) => handleFilter('Vendor', e.target.value)}>
                        <option value="">All</option>
                        {vendors.map((vendor, index) => (
                            <option key={index} value={vendor}>{vendor}</option>
                        ))}
                        <option value="Other">Other</option>
                    </select>
                )}
                {role === 'admin' && filter === 'Payee' && (
                    <select className="form-select filter" onChange={(e) => handleFilter('Payee', e.target.value)}>
                        <option value="">All</option>
                        <option value={null}>None</option>
                        <option value="McQ">McQuaid</option>
                        <option value="RCR">RCR</option>
                        <option value="Donation">Donation</option>
                        <option value="Voucher">Voucher</option>
                    </select>
                )}
            </div>
            <div className="table-container order-table">
                <table>
                    <thead>
                        <tr>
                            <th><div className='cell-content medium'>Description</div></th>
                            {role === 'user' && (<th><div className='cell-content small'>Status</div></th>)}
                            <th><div className='cell-content small'>Priority</div></th>
                            <th><div className='cell-content medium'>Purpose</div></th>
                            <th><div className='cell-content medium'>Vendor</div></th>
                            <th><div className='cell-content medium'>Part Number</div></th>
                            <th><div className='cell-content small'>Price</div></th>
                            <th><div className='cell-content small'>Quantity</div></th>
                            <th><div className='cell-content large'>Link</div></th>
                            <th><div className='cell-content large'>Notes</div></th>
                            <th><div className='cell-content medium'>Order Date</div></th>
                            {role === 'admin' && (
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
                                {role === 'user' && (
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
                                {role === 'admin' && (
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
            <div className='flex'>
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