import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import withAuth from '../hocs/withAuth';
import { jwtDecode } from 'jwt-decode';
import './styles.css';

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [message, setMessage] = useState('');

    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`
    }
    const decoded = jwtDecode(token);
    const role = decoded.role;

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('/api/requests', { headers });
                setRequests(response.data); // Make requests a 2D array
                console.log(response.data); // Print response to console
            } catch (error) {
                setMessage('An error occurred');
                console.log(response.data);
            }
        };
        fetchRequests();
    }, []);

    const acceptRequest = async (requestId) => {
        try {
            const response = await axios.post(`/api/requests/accept/${requestId}`, {}, { headers });
            setMessage('Accepted');
            console.log(response.data);
            setRequests(requests.map(request => request.ID === requestId ? { ...request, Status: true } : request));
        } catch (error) {
            setMessage('An error occurred');
            console.log(error);
        }
    };

    const denyRequest = async (requestId) => {
        try {
            const response = await axios.post(`/api/requests/deny/${requestId}`, {}, { headers });
            setMessage('Denied');
            console.log(response.data);
            setRequests(requests.map(request => request.ID === requestId ? { ...request, Status: false } : request));
        } catch (error) {
            setMessage('An error occurred');
            console.log(error);
        }
    };

    return (
        <div className="container-fluid">
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
            <div>
                {message && <p>{message}</p>}
            </div>

            <div className='table-container'>

                <div className="row">
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
                        <strong>Status</strong>
                    </div>
                    <div className="col">
                        <strong>Purpose</strong>
                    </div>
                    <div className="col">
                        <strong>Priority</strong>
                    </div>
                    <div className="col">
                        <strong>Requester</strong>
                    </div>
                    {localStorage.getItem('role') === 'admin' && (
                        <div className="col">
                            <strong>Actions</strong>
                        </div>
                    )}
                </div>
                {requests.map((request, index) => (
                    <div className="row border-row" key={index}>
                        <div className="col border-column">{request.Description}</div>
                        <div className="col border-column">{request.Vendor}</div>
                        <div className="col border-column">{request.Part_Num}</div>
                        <div className="col border-column">{request.Unit_Price}</div>
                        <div className="col border-column">{request.Quantity}</div>
                        <div className="col border-column">{request.Link}</div>
                        <div className="col border-column">{request.Notes}</div>
                        <div className="col border-column">{request.Purpose}</div>
                        <div className="col border-column">{request.Priority}</div>
                        <div className="col border-column">{request.Requester}</div>
                        <div className="col border-column">{request.Status === null ? 'Awaiting Decision...' : request.Status ? 'Accepted' : 'Denied'}</div>
                        {localStorage.getItem('role') === 'admin' && (
                            <div className="col border-column">
                                {request.Status === null && (
                                    <>
                                        <button className="btn btn-primary" onClick={() => { acceptRequest(request.ID); }}>Accept</button>
                                        <button className="btn btn-danger" onClick={() => { denyRequest(request.ID); }}>Deny</button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default withAuth(Requests);
