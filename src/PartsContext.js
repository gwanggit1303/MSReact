// src/PartsContext.js
import React, { createContext, useState, useEffect } from 'react';
import apiClient from './services/api';

const PartsContext = createContext();

export const PartsProvider = ({ children }) => {
    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParts = async () => {
            try {
                const response = await apiClient.get('https://localhost:7142/api/Kdb/parts');
                setParts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching parts data');
                setLoading(false);
            }
        };

        fetchParts();
    }, []);

    return (
        <PartsContext.Provider value={{ parts, loading, error }}>
            {children}
        </PartsContext.Provider>
    );
};

export default PartsContext;
