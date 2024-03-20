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
            <div className="table-container">
                <div className="row">
                    {localStorage.getItem('role') === 'user' && (
                        <div className="col">
                            <strong>Status</strong>
                        </div>
                    )}
                    <div className="col">
                        <strong>Description</strong>
                    </div>
                    <div className="col">
                        <strong>Vendor</strong>
                    </div>
                    <div className="col">
                        <strong>Part Number</strong>
                    </div>
                    <div className="col">
                        <strong>Unit Price</strong>
                    </div>
                    <div className="col">
                        <strong>Quantity</strong>
                    </div>
                    <div className="col">
                        <strong>Link</strong>
                    </div>
                    <div className="col">
                        <strong>Notes</strong>
                    </div>
                    <div className="col">
                        <strong>Order Date</strong>
                    </div>
                    <div className="col">
                        <strong>Purpose</strong>
                    </div>
                    <div className="col">
                        <strong>Priority</strong>
                    </div>
                    {localStorage.getItem('role') === 'admin' && (
                        <>
                            <div className="col">
                                <strong>Payee</strong>
                            </div>
                            <div className="col">
                                <strong>Invoice Number</strong>
                            </div>
                            <div className="col">
                                <strong>Carted</strong>
                            </div>
                            <div className="col">
                                <strong>Ordered</strong>
                            </div>
                            <div className="col">
                                <strong>Received</strong>
                            </div>
                        </>
                    )}
                </div>
                {orders.map((order, index) => (
                    <div className="row border-row" key={index}>
                        {localStorage.getItem('role') === 'user' && (
                            <div className="col border-column">
                                <>
                                    {order.Received ? (
                                        Received
                                    ) : order.Ordered ? (
                                        Ordered
                                    ) : order.Carted ? (
                                        Carted
                                    ) : (
                                        <></>
                                    )}
                                </>
                            </div>
                        )}
                        <div className="col border-column">
                            {order.Description}
                        </div>
                        <div className="col border-column">
                            {order.Vendor}
                        </div>
                        <div className="col border-column">
                            {order.Part_Num}
                        </div>
                        <div className="col border-column">
                            {order.Unit_Price}
                        </div>
                        <div className="col border-column">
                            {order.Quantity}
                        </div>
                        <div className="col border-column">
                            {order.Link}
                        </div>
                        <div className="col border-column">
                            {order.Notes}
                        </div>
                        <div className="col border-column">
                            {order.Order_Date}
                        </div>
                        <div className="col border-column">
                            {order.Purpose}
                        </div>
                        <div className="col border-column">
                            {order.Priority}
                        </div>
                        {localStorage.getItem('role') === 'admin' && (
                            <>
                                <div className="col border-column">
                                    <select className="form-select" value={order.Payee} onChange={(e) => handleChange(index, e, "Payee")}>
                                        <option value={null}>None</option>
                                        <option value="McQ">McQuaid</option>
                                        <option value="RCR">RCR</option>
                                        <option value="Donation">Donation</option>
                                        <option value="Voucher">Voucher</option>
                                    </select>
                                </div>
                                <div className="col border-column">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={order.Invoice_Num}
                                        onChange={(e) => handleChange(index, e, "Invoice_Num")}
                                    />
                                </div>
                                <div className="col border-column">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={order.Carted}
                                        onChange={(e) => handleChange(index, { target: { value: e.target.checked } }, "Carted")}
                                    />
                                </div>
                                <div className="col border-column">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={order.Ordered}
                                        onChange={(e) => handleOrderedChange(index, { target: { value: e.target.checked } }, "Ordered")}
                                    />
                                </div>
                                <div className="col border-column">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={order.Received}
                                        onChange={(e) => handleChange(index, { target: { value: e.target.checked } }, "Received")}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default withAuth(Orders);