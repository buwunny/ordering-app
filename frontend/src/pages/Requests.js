import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('/api/requests');
                console.log(response.data); // Print response to console
                setRequests(response.data); // Make requests a 2D array
            } catch (error) {
                setMessage('An error occurred');
            }
        };
        fetchRequests();
    }, []);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr', gap: '5px'}}>
                <p><strong>Description</strong></p>
                <p><strong>Vendor</strong></p>
                <p><strong>Part Number</strong></p>
                <p><strong>Unit Price</strong></p>
                <p><strong>Quantity</strong></p>
                <p><strong>Link</strong></p>
                <p><strong>Notes</strong></p>
                <p><strong>Accepted</strong></p>
            </div>
            {requests.map((request, index) => (
                <div key={index} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr', gap: '5px' }}>
                    <p>{request.Description}</p>
                    <p>{request.Vendor}</p>
                    <p>{request.Part_Num}</p>
                    <p>{request.Unit_Price}</p>
                    <p>{request.Quantity}</p>
                    <p>{request.Link}</p>
                    <p>{request.Notes}</p>
                    <p>{request.Accepted ? 'True' : 'False'}</p>
                    {/* Add more <p> elements as needed */}
                </div>
            ))}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Requests;
