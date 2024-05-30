// src/components/PartsTable.js
import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';

const PartsTable = () => {
    const [parts, setParts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchParts = async () => {
            try {
                const response = await apiClient.get('https://localhost:7142/api/Kdb/parts');
                setParts(response.data);
            } catch (error) {
                console.error('Error fetching parts data:', error);
                setError('Error fetching parts data');
            }
        };

        fetchParts();
    }, []);

    return (
        <div>
            <h1>Parts List</h1>
            {error && <p>{error}</p>}
            <table>
                <thead>
                    <tr>
                        {parts.length > 0 && Object.keys(parts[0]).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {parts.map((part, index) => (
                        <tr key={index}>
                            {Object.values(part).map((value, idx) => (
                                <td key={idx}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PartsTable;
