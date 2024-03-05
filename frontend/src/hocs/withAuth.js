import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function withAuth(Component) {
    return function ProtectedComponent(props) {
        const token = localStorage.getItem('token');
        const navigate = useNavigate();

        useEffect(() => {
            if (!token) {
                navigate('/login');
            }
        }, [token, navigate]);

        if (!token) {
            return null;
        }

        return <Component {...props} />;
    };
}

export default withAuth;