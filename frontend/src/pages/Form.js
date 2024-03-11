import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import withAuth from '../hocs/withAuth';
import './styles.css'

const Form = () => {
    const initialFormData = {
        description: '',
        vendor: '',
        partNumber: '',
        quantity: '',
        unitPrice: '',
        link: '',
        notes: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [message, setMessage] = useState('');

    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/form', formData, { headers });
            setFormData(initialFormData);
            setMessage('Form submitted successfully');
            console.log(response.status);
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
            <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', justifyContent: 'center' }}>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="vendor">Vendor:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="vendor"
                            name="vendor"
                            value={formData.vendor}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="partNumber">Part Number:</label>
                        <input
                            type="text"
                            className="form-control" 
                            id="partNumber"
                            name="partNumber"
                            value={formData.partNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="number"
                            className="form-control" 
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="unitPrice">Unit Price:</label>
                        <input
                            type="number"
                            className="form-control" 
                            id="unitPrice"
                            name="unitPrice"
                            value={formData.unitPrice}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="link">Link:</label>
                        <input
                            type="text"
                            className="form-control" 
                            id="link"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                        <label htmlFor="notes">Notes:</label>
                        <textarea
                            className="form-control" 
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'center' }}>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                {message && <p>{message}</p>}
            </div>

        </div>
    );
};

export default withAuth(Form);