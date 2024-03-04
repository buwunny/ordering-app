import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [message, setMessage] = useState('');
    
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('/api/requests');
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
            const response = await axios.post(`/api/requests/accept/${requestId}`);
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
            const response = await axios.post(`/api/requests/deny/${requestId}`);
            setMessage('Denied');
            console.log(response.data);
            setRequests(requests.map(request => request.ID === requestId ? { ...request, Status: false } : request));
        } catch (error) {
            setMessage('An error occurred');
            console.log(error);
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr', gap: '5px' }}>
                <p><strong>Description</strong></p>
                <p><strong>Vendor</strong></p>
                <p><strong>Part Number</strong></p>
                <p><strong>Unit Price</strong></p>
                <p><strong>Quantity</strong></p>
                <p><strong>Link</strong></p>
                <p><strong>Notes</strong></p>
                <p><strong>Status</strong></p>
            </div>
            {requests.map((request, index) => (
                <div key={index} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr', gap: '5px' }}>
                    <p>{request.Description}</p>
                    <p>{request.Vendor}</p>
                    <p>{request.Part_Num}</p>
                    <p>{request.Unit_Price}</p>
                    <p>{request.Quantity}</p>
                    <p>{request.Link}</p>
                    <p>{request.Notes}</p>
                    <p>{request.Status === null ? 'Awaiting Decision...' : request.Status ? 'Accepted' : 'Denied'}</p>
                    {request.Status === null && (
                        <p>
                            <button onClick={() => { acceptRequest(request.ID); }}>Accept</button>
                            <button onClick={() => { denyRequest(request.ID); }}>Deny</button>
                        </p>
                    )}
                </div>
            ))}
            <Link to="/">
                <button>Home</button>
            </Link>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Requests;
