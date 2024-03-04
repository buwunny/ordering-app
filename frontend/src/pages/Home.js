import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Hello World!</h1>
            <Link to="/form">
                <button>Form</button>
            </Link>
            <Link to="/requests">
                <button>Requests</button>
            </Link>
            <Link to="/orders">
                <button>Orders</button>
            </Link>
        </div>
    );
}

export default Home;
