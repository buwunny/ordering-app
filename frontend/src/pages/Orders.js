import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../hocs/withAuth';
import axios from 'axios';
import './styles.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
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
        
        // try {
        //     const response = await axios.put(`/api/orders/${orders[index].ID}`, newOrders[index], { headers });
        //     setMessage(response.status);
        // } catch (error) {
        //     console.log(error)
        //     setMessage('An error occurred');
        // }
    }

    async function handleOrderedChange(index, event, field){
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

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <Link to="/">
                        <button className="btn btn-primary">Home</button>
                    </Link>
                    {changed && (<button className="btn btn-primary" onClick={saveChanges}>Save Changes</button>)}
                </div>
            </div>
            <div className="row">
                {localStorage.getItem('role') === 'user' && (
                    <div className="col">
                        <p><strong>Status</strong></p>
                    </div>
                )}
                <div className="col">
                    <p><strong>Description</strong></p>
                </div>
                <div className="col">
                    <p><strong>Vendor</strong></p>
                </div>
                <div className="col">
                    <p><strong>Part Number</strong></p>
                </div>
                <div className="col">
                    <p><strong>Unit Price</strong></p>
                </div>
                <div className="col">
                    <p><strong>Quantity</strong></p>
                </div>
                <div className="col">
                    <p><strong>Link</strong></p>
                </div>
                <div className="col">
                    <p><strong>Notes</strong></p>
                </div>
                <div className="col">
                    <p><strong>Order Date</strong></p>
                </div>
                {localStorage.getItem('role') === 'admin' && (
                    <>
                        <div className="col">
                            <p><strong>Payee</strong></p>
                        </div>
                        <div className="col">
                            <p><strong>Invoice Number</strong></p>
                        </div>
                        <div className="col">
                            <p><strong>Carted</strong></p>
                        </div>
                        <div className="col">
                            <p><strong>Ordered</strong></p>
                        </div>
                        <div className="col">
                            <p><strong>Received</strong></p>
                        </div>
                    </>
                )}
            </div>
            {orders.map((order, index) => (
                <div className="row border-row">
                    {localStorage.getItem('role') === 'user' && (
                        <div className="col border-column">
                            <>
                                {order.Received ? (
                                    <p>Received</p>
                                ) : order.Ordered ? (
                                    <p>Ordered</p>
                                ) : order.Carted ? (
                                    <p>Carted</p>
                                ) : (
                                    <p></p>
                                )}
                            </>
                        </div>
                    )}
                    <div className="col border-column">
                        <p>{order.Description}</p>
                    </div>
                    <div className="col border-column">
                        <p>{order.Vendor}</p>
                    </div>
                    <div className="col border-column">
                        <p>{order.Part_Num}</p>
                    </div>
                    <div className="col border-column">
                        <p>{order.Unit_Price}</p>
                    </div>
                    <div className="col border-column">
                        <p>{order.Quantity}</p>
                    </div>
                    <div className="col border-column">
                        <p>{order.Link}</p>
                    </div>
                    <div className="col border-column">
                        <p>{order.Notes}</p>
                    </div>
                    <div className="col border-column">
                        <p>{order.Order_Date}</p>
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
            {message && <p>{message}</p>}
        </div>
    );
};

export default withAuth(Orders);