import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Hello World!</h1>
            <Link to="/requests">
                <button>Requests</button>
            </Link> 
        </div>
    );
}

export default Home;
