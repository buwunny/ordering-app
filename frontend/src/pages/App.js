import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Requests from './Requests';
import Form from './Form';
import Orders from './Orders';
import Upload from './Upload';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/form" element={<Form />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/upload" element={<Upload />} />
            </Routes>
        </Router>
    );
}

export default App;
