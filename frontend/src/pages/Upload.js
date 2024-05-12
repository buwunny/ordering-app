import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../hocs/withAuth';
import axios from 'axios';
import './styles.css';

function Upload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');
    const [textInput, setTextInput] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleTextChange = (event) => {
        setTextInput(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('requester', textInput);

            try {
                const headers = {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data', // Add multipart/form-data header
                };

                const response = await axios.post('/api/upload', formData, { headers });
                console.log('File uploaded successfully:', response.data);
                setMessage(response.data.message);
            } catch (error) {
            console.error('Error uploading file:', error);
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Error uploading file. Ensure the file follows the correct format.");
            }
}
        } else {
            console.log('No file selected');
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
            <Link to="/upload">
                <button className="btn btn-primary">Upload</button>
            </Link>
            <div className='container-fluid container-center'>

                <h1>Upload CSV File</h1>
                <a href="https://docs.google.com/spreadsheets/d/1bc-ZjdRssMCrsjsN_NM3h2pa43gHvyCkElZ1hrHr7UM/copy" target="_blank" rel="noopener noreferrer">Template</a>
                <p>File&gt;Download&gt;.csv</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fileInput">Select CSV File:</label>
                    </div>
                    <div className="form-group">
                        <input type="file" className="form-control-file" id="fileInput" onChange={handleFileChange} accept=".csv" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="textInput">Your Name:</label>
                        <input type="text" className="form-control" id="textInput" value={textInput} onChange={handleTextChange} required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Upload</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default withAuth(Upload);
