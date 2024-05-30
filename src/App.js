// src/App.js
import React from 'react';
import './App.css';
import { PartsProvider } from './PartsContext'; // Import PartsProvider
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import HelloWorld from './components/HelloWorld';
import PartsTable from './components/PartsTable';
import Statistics from './components/Statistics';

const HomePage = () => (
    <div>
        <h1>Welcome to the Home Page</h1>
        <p>This is the main landing page of your application.</p>
    </div>
);

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/hello-world">Hello World</Link>
                        </li>
                        <li>
                            <Link to="/system-tables">System Tables</Link>
                        </li>
                        <li>
                            <Link to="/statistics">Statistics</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/hello-world" element={<HelloWorld />} />
                    <Route path="/system-tables" element={<PartsTable />} />
                    <Route path="/statistics" element={<Statistics />} />
                </Routes>
            </div>
        </Router>

    );
}

export default App;
