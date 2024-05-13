import React from 'react';
import { Link } from 'react-router-dom';

function HeaderButtons() {
    return (
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
            <Link to="/upload">
                <button className="btn btn-primary">Upload</button>
            </Link>
        </div>
    );
}

export default HeaderButtons;