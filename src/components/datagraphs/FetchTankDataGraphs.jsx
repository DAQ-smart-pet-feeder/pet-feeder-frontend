import React, { useState, useEffect } from 'react';
import BarChart from "../charts/BarChart";
import LineChart from "../charts/LineChart";
import "../../styles/TankData.css";
import { useNavigate } from 'react-router-dom';

const TankDataGraphs = () => {
    const [temperatureData, setTemperatureData] = useState({
        labels: [],
        datasets: []
    });
    const [humidityData, setHumidityData] = useState({
        labels: [],
        datasets: []
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/pet-feeder-api/v3/visual/food-tank-data')
            .then(response => response.json())
            .then(data => {
                processChartData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const processChartData = (data) => {
        const tempLabels = Object.keys(data.temp);
        const tempMinData = tempLabels.map(label => data.temp[label].min);
        const tempMaxData = tempLabels.map(label => data.temp[label].max);

        const humLabels = Object.keys(data.hum);
        const humAvgData = humLabels.map(label => (data.hum[label].min + data.hum[label].max) / 2);

        setTemperatureData({
            labels: tempLabels,
            datasets: [
                {
                    label: 'Min Temperature (°C)',
                    data: tempMinData,
                    backgroundColor: 'rgba(102, 217, 255, 0.5)',
                },
                {
                    label: 'Max Temperature (°C)',
                    data: tempMaxData,
                    backgroundColor: 'rgba(255, 102, 102, 0.5)',
                }
            ],
        });

        setHumidityData({
            labels: humLabels,
            datasets: [
                {
                    label: 'Average Humidity (%)',
                    data: humAvgData,
                    borderColor: 'rgba(191, 191, 191, 1)',
                    backgroundColor: 'rgba(255, 153, 153, 0.5)',
                    fill: true,
                }
            ],
        });
    };

    const navigateBack = () => {
        navigate('/'); // Navigate back to the homepage
    };

    return (
        <div className='lock-font'>
            <button onClick={navigateBack}>Back to Homepage</button>
            <div className='tank-data-header'>
                <h1>Tank Data Graphs</h1>
                <div className='chart-container'>
                    <h2>Temperature</h2>
                    <BarChart data={temperatureData} className="small-chart" />

                    <h2>Humidity</h2>
                    <LineChart data={humidityData} className="small-chart" />
                </div>
            </div>
        </div>
    );
};

export default TankDataGraphs;
