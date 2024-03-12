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
        <div className="container-fluid" style={{padding: '0px'}}>
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
            <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <div>
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
                            <label htmlFor="purpose">Purpose:</label>
                            <select className="form-select" value={formData.purpose} onChange={handleChange} name="purpose" required>
                                <option value="Robot Parts">Robot Parts</option>
                                <option value="Tools">Tools</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {formData.purpose === "Other" && (
                            <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                <label htmlFor="otherPurpose">Other Purpose:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="otherPurpose"
                                    name="otherPurpose"
                                    value={formData.otherPurpose}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        
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
                        <div className="form-group" style={{ gridColumn: 'span 2' }}>
                            <label htmlFor="link ">Link:</label>
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
                        <div className="form-group">
                            <label htmlFor="priority">Priority:</label>
                            <select className="form-select" value={formData.priority} onChange={(e) => handleChange(e, "priority")} required>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="requester">Your Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="requester"
                                name="requester"
                                value={formData.requester}
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
        </div>
    );
};

export default withAuth(Form);
