// src/components/HelloWorld.js
import React, { useState } from 'react';
import apiClient from '../services/api';

const HelloWorld = () => {
    const [message, setMessage] = useState('');

    const fetchHelloWorld = async () => {
        try {
            const response = await apiClient.get('https://localhost:7142/api/Kdb/hello');
            setMessage(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setMessage('Error fetching data');
        }
    };

    return (
        <div>
            <button onClick={fetchHelloWorld}>Get Hello World</button>
            <p>{message}</p>
        </div>
    );
};

export default HelloWorld;
