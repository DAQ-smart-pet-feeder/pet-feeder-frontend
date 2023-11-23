import React from 'react';
import BarChart from "../charts/BarChart";
import LineChart from "../charts/LineChart";
import "../../styles/TankData.css"
import { useNavigate } from 'react-router-dom';

const TankDataGraphs = () => {
    const temperatureData = {
        labels: ['17 Nov', '18 Nov', '19 Nov', '20 Nov', '21 Nov', '22 Nov', '23 Nov'], // 7 วันย้อนหลัง
        datasets: [
            {
                label: 'Min Temperature (°C)',
                data: [20, 19, 21, 18, 22, 19, 20],
                backgroundColor: 'rgba(102, 217, 255, 0.5)',
            },
            {
                label: 'Max Temperature (°C)',
                data: [25, 26, 24, 27, 25, 26, 24],
                backgroundColor: 'rgba(255, 102, 102, 0.5)',
            }
        ],
    };

    const humidityData = {
        labels: ['17 Nov', '18 Nov', '19 Nov', '20 Nov', '21 Nov', '22 Nov', '23 Nov'],
        datasets: [
            {
                label: 'Average Humidity (%)',
                data: [50, 55, 53, 60, 58, 62, 57],
                borderColor: 'rgba(191, 191, 191, 1)',
                backgroundColor: 'rgba(255, 153, 153, 0.5)',
                fill: false,
            }
        ],
    };

    const navigate = useNavigate();

    const navigateBack = () => {
        navigate('/');
    };

    return (
        <div className='lock-font'>
            <button className="button-74" onClick={navigateBack}>Back to Homepage</button>
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
