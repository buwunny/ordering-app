import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import withAuth from '../hocs/WithAuth';
import { jwtDecode } from 'jwt-decode';
import './styles.css';
import HeaderButtons from '../components/HeaderButtons';

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [showFooter, setShowFooter] = useState(false);
    const [message, setMessage] = useState('');

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

    useEffect(() => {
        fetchRequests();
    }, []);

    useEffect(() => {
        if (message) {
            setShowFooter(true);
            setTimeout(() => {
                setShowFooter(false);
                setMessage('');
            }, 5000);
        }
    }, [message]);
    
    const fetchRequests = async () => {
        try {
            const response = await axios.get('/api/requests', { headers });
            setRequests(response.data); // Make requests a 2D array
            console.log(response.data); // Print response to console
        } catch (error) {
            setMessage('An error occurred');
            console.log(error.response.data);
        }
    };

    const acceptRequest = async (requestId) => {
        setShowFooter(true);
        try {
            const response = await axios.post(`/api/requests/accept/${requestId}`, {}, { headers });
            setMessage('Accepted');
            console.log(response.data);
            setRequests(requests.map(request => request.ID === requestId ? { ...request, Status: true } : request));
        } catch (error) {
            setMessage('An error occurred');
            console.log(error.response.data);
        }
    };

    const denyRequest = async (requestId) => {
        setShowFooter(true);
        try {
            const response = await axios.post(`/api/requests/deny/${requestId}`, {}, { headers });
            setMessage('Denied');
            console.log(response.data);
            setRequests(requests.map(request => request.ID === requestId ? { ...request, Status: false } : request));
        } catch (error) {
            setMessage('An error occurred');
            console.log(error.response.data);
        }
    };

    return (
        <div className="container-fluid">
            <header>
                <HeaderButtons></HeaderButtons>
            </header>
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th><div className='cell-content medium'>Description</div></th>
                            <th><div className='cell-content small'>Status</div></th>
                            <th><div className='cell-content small'>Priority</div></th>
                            <th><div className='cell-content medium'>Purpose</div></th>
                            <th><div className='cell-content medium'>Vendor</div></th>
                            <th><div className='cell-content medium'>Part Number</div></th>
                            <th><div className='cell-content small'>Price</div></th>
                            <th><div className='cell-content small'>Quantity</div></th>
                            <th><div className='cell-content large'>Link</div></th>
                            <th><div className='cell-content large'>Notes</div></th>
                            <th><div className='cell-content medium'>Requester</div></th>
                            {role === 'admin' && (
                                <th><div className='cell-content medium'>Actions</div></th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request, index) => (
                            <tr  key={index}>
                                <td><div className='cell-content medium'>{request.Description}</div></td>
                                <td><div className='cell-content small'>{request.Status === null ? 'Awaiting Decision...' : request.Status ? 'Accepted' : 'Denied'}</div></td>
                                <td><div className='cell-content small'>{request.Priority}</div></td>
                                <td><div className='cell-content medium'>{request.Purpose}</div></td>
                                <td><div className='cell-content medium'>{request.Vendor}</div></td>
                                <td><div className='cell-content medium'>{request.Part_Num}</div></td>
                                <td><div className='cell-content small'>{currency.format(request.Unit_Price)}</div></td>
                                <td><div className='cell-content small'>{request.Quantity}</div></td>
                                <td><div className='cell-content large'><a href={request.Link} target="_blank" rel="noopener noreferrer">{request.Link}</a></div></td>
                                <td><div className='cell-content large'>{request.Notes}</div></td>
                                <td><div className='cell-content medium'>{request.Requester}</div></td>
                                {role === 'admin' && (
                                    <td><div className='cell-content medium'>
                                        {request.Status === null && (
                                            <>
                                                <button className="btn btn-primary" onClick={() => { acceptRequest(request.ID); }}>Accept</button>
                                                <button className="btn btn-danger" onClick={() => { denyRequest(request.ID); }}>Deny</button>
                                            </>
                                        )}
                                    </div></td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showFooter && <footer>
                {message && <p>{message}</p>}
            </footer>}
        </div>
    );
};

export default withAuth(Requests);
