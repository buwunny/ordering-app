import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('/api/requests');
                setRequests(response.data);
            } catch (error) {
                setMessage('An error occurred');
            }
        };
        fetchRequests();
    }, []);

    return (
        <div>
            <h1>Requests</h1>
            <ul>
                {requests.map((request) => (
                    <li key={request._id}>
                        {request.description} - {request.vendor}
                    </li>
                ))}
            </ul>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Requests;
