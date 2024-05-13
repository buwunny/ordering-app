import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import withAuth from '../hocs/WithAuth';
import HeaderButtons from '../components/HeaderButtons';
import './styles.css'

const Form = () => {
    const initialFormData = {
        description: '',
        purpose: '',
        vendor: '',
        partNumber: '',
        quantity: '',
        unitPrice: '',
        link: '',
        priority: 'Low',
        requester: '',
        notes: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [message, setMessage] = useState('');

    const [vendors, setVendors] = useState([]);
    const [purposes, setPurposes] = useState([]);

    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.purpose === 'Other') {
            formData.purpose = formData.otherPurpose;
        }
        if (formData.vendor === 'Other') {
            formData.vendor = formData.otherVendor;
        }
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
        fetchVendors();
        fetchPurposes();
    }, []);


    return (
        <div className="container-fluid">
            <header>
                <HeaderButtons></HeaderButtons>
            </header>
            <div className="container-fluid container-center">
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
                            <select 
                                className="form-select"
                                id="purpose"
                                name="purpose"
                                value={formData.purpose}
                                onChange={handleChange}
                                required
                            >
                                <option value=""></option>
                                {purposes.map((purpose) => (
                                    <option key={purpose} value={purpose}>{purpose}</option>
                                ))}
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
                            <label htmlFor="partNumber">Part Number:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="partNumber"
                                name="partNumber"
                                value={formData.partNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="vendor">Vendor:</label>
                            <select 
                                className="form-select"
                                id="vendor"
                                name="vendor"
                                value={formData.vendor}
                                onChange={handleChange}
                                required
                            >
                                <option value=""></option>
                                {vendors.map((vendor) => (
                                    <option key={vendor} value={vendor}>{vendor}</option>
                                ))}
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {formData.vendor === "Other" && (
                            <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                <label htmlFor="otherVendor">Other Vendor:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="otherVendor"
                                    name="otherVendor"
                                    value={formData.otherVendor}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

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
                            <select
                                className="form-select"
                                id="priority"
                                name="priority"
                                value={formData.priority}
                                onChange={(e) => handleChange(e, "priority")}
                                required
                            >
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
