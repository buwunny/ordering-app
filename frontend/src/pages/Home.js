import React from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../hocs/withAuth';

function Home() {
    return (
        <div className="container-fluid">
            <h1>Hello World!</h1>
            <Link to="/form">
                <button className="btn">Form</button>
            </Link>
            <Link to="/requests">
                <button className="btn">Requests</button>
            </Link>
            <Link to="/orders">
                <button className="btn">Orders</button>
            </Link>
            <Link to="/upload">
                <button className="btn">Upload</button>
            </Link>
        </div>
    );
}

export default withAuth(Home);
