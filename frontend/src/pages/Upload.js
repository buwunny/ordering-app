import React, { useState } from 'react';
import withAuth from '../hocs/withAuth';
import axios from 'axios';
import './styles.css';

function Upload() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                const response = await axios.post('/api/upload', formData);
                console.log('File uploaded successfully:', response.data);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            console.log('No file selected');
        }
    };

    return (
        <div className='container-fluid'>
            <h1>Upload CSV File</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fileInput">Select File:</label>
                    <input type="file" className="form-control-file" id="fileInput" onChange={handleFileChange} accept=".csv" />
                </div>
                <button type="submit" className="btn btn-primary">Upload</button>
            </form>
        </div>
    );
}

export default Upload;
