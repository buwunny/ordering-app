import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await axios.post('/api/form', formData);
                setFormData(initialFormData);
                setMessage('Form submitted successfully');
            } catch (error) {
                setMessage('An error occurred');
            }
        };

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Vendor:
                        <input
                            type="text"
                            name="vendor"
                            value={formData.vendor}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Part Number:
                        <input
                            type="text"
                            name="partNumber"
                            value={formData.partNumber}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Quantity:
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Unit Price:
                        <input
                            type="number"
                            name="unitPrice"
                            value={formData.unitPrice}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Link:
                        <input
                            type="text"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Notes:
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>
                <Link to="/">
                    <button>Home</button>
                </Link>
                {message && <p>{message}</p>}
            </div>
        );
    };

export default Form;