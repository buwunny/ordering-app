import React, { useState } from 'react';

const Form = () => {
    const [formData, setFormData] = useState({
        description: '',
        vendor: '',
        partNumber: '',
        quantity: '',
        price: '',
        link: '',
        notes: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Description:
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
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
                />
            </label>
            <br />
            <label>
                Price:
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
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
    );
};

export default Form;
