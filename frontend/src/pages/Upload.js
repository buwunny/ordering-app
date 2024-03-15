import React, { useState } from 'react';
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
                setMessage("Error uploading file. Ensure the file follows the correct format.");
            }
        } else {
            console.log('No file selected');
        }
    };

    return (
        <div className='container-fluid'>
            <p>Upload CSV File</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fileInput">Select File:</label>
                </div>
                <div className="form-group">
                    <input type="file" className="form-control-file" id="fileInput" onChange={handleFileChange} accept=".csv" />
                </div>
                <div className="form-group">
                    <label htmlFor="textInput">Requester:</label>
                    <input type="text" className="form-control" id="textInput" value={textInput} onChange={handleTextChange} />
                </div>
                <button type="submit" className="btn btn-primary">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default withAuth(Upload);
