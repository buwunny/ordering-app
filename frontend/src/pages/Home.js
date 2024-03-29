import React from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../hocs/withAuth';

function Home() {
    return (
        <div className="container-fluid container-center">
            <div>
                <h1>Welcome IgKnighter!</h1>
            </div>
            <div>
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
        </div>
    );
}

export default withAuth(Home);
