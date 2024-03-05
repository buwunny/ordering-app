import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

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
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <input type="submit" value="Log in" />
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default LoginPage;