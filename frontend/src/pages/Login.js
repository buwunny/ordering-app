import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './styles.css';

function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { username, password });
            const { access_token } = response.data;
            // Save the token in local storage
            localStorage.setItem('token', access_token);
            
            // Decode the token to get the role
            const decodedToken = jwtDecode(access_token);
            const role = decodedToken.role;
            // Save the role in local storage
            localStorage.setItem('role', role);
            
            navigate('/');
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100%', backgroundColor: 'black'}}>
            <div className="center-content">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username" style={{ color: 'white' }}>Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            style={{ backgroundColor: 'white', color: 'black' }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" style={{ color: 'white' }}>Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{ backgroundColor: 'white', color: 'black' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#FAB532', border: '1px solid black' }}>Log in</button>
                </form>
                {error && <label htmlFor="error" style={{ color: 'white' }}> {error}</label>}
            </div>
        </div>
    );
}

export default LoginPage;