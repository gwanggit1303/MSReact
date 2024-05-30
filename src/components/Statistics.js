import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import apiClient from '../services/api';
import 'chart.js/auto';

const Statistics = () => {
    const [data, setData] = useState({});
    const [error, setError] = useState('');
    const [partQuantities, setPartQuantities] = useState([]);
    const [selectedPart, setSelectedPart] = useState(''); // State to track selected part

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await apiClient.get('https://localhost:7142/api/Kdb/statistics');
                const partQuantities = response.data;
                setPartQuantities(partQuantities);

                const labels = partQuantities.map(item => item.name);
                const quantities = partQuantities.map(item => item.qty);

                setData({
                    labels,
                    datasets: [{
                        label: 'Part Quantities',
                        data: quantities,
                        backgroundColor: [
                            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                        ],
                    }]
                });
            } catch (error) {
                console.error('Error fetching part quantities:', error);
                setError('Error fetching part quantities');
            }
        };

        fetchStatistics();
    }, []);


    const fetchSupplierData = async (part) => {
	        try {
	            const response = await apiClient.get(`https://localhost:7142/api/Kdb/suppliers?part=${part}`);
	            const supplierData = response.data;

	            const labels = supplierData.map(item => item.name);
	            const quantities = supplierData.map(item => item.qty);

	            setData({
	                labels,
	                datasets: [{
	                    label: `Quantities of ${part}`,
	                    data: quantities,
	                    backgroundColor: [
	                        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
	                    ],
	                }]
	            });
	        } catch (error) {
	            console.error('Error fetching supplier data:', error);
	            setError('Error fetching supplier data');
	        }
    };

    // Function to handle dropdown change
    const handlePartChange = (event) => {
        const selectedPartName = event.target.value;
		const selectedPartP = event.target.selectedOptions[0].getAttribute('data-part-p');
		setSelectedPart(selectedPartName);

        if (selectedPartName === '') {
            // If "Please select the part" is selected, reset to show overall quantities
            const labels = partQuantities.map(item => item.name);
            const quantities = partQuantities.map(item => item.qty);

            setData({
                labels,
                datasets: [{
                    label: 'Part Quantities',
                    data: quantities,
                    backgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                    ],
                }]
            });
        } else {
               // Fetch supplier data for the selected part
            fetchSupplierData(selectedPartP);
        }
    };

    return (
        <div>
            <h1>Part Quantities</h1>
            {error && <p>{error}</p>}
            <select value={selectedPart} onChange={handlePartChange}>
                <option value="" data-part-p="">Please select the part</option>
                {partQuantities.map(part => (
                    <option key={part.p} value={part.name}  data-part-p={part.p}>{part.name}</option>
                ))}
            </select>
            {Object.keys(data).length > 0 && (
                <Pie data={data} />
            )}
        </div>
    );
};

export default Statistics;
