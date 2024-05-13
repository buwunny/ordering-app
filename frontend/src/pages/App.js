import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';

const Home = React.lazy(() => import('./Home'));
const Login = React.lazy(() => import('./Login'));
const Requests = React.lazy(() => import('./Requests'));
const Form = React.lazy(() => import('./Form'));
const Orders = React.lazy(() => import('./Orders'));
const Upload = React.lazy(() => import('./Upload'));

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/requests" element={<Requests />} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/upload" element={<Upload />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
