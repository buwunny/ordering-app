import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Requests from './Requests';
import Form from './Form';
function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/form" element={<Form />} />
            </Routes>
        </Router>
    );
}

export default App;
