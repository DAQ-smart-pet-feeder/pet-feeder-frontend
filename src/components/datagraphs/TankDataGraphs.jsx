import React, { useState, useEffect } from 'react';
import BarChart from "../charts/BarChart";
import LineChart from "../charts/LineChart";
import "../../styles/TankData.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

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

    const navigateBack = () => {
        navigate('/');
    };

    useEffect(() => {
        axios.get('http://localhost:8080/pet-feeder-api/v3/visual/food-tank-data')
            .then(response => {
                const tankData = response.data;

                // Sort the tankData by date in ascending order
                tankData.sort((a, b) => new Date(a.date) - new Date(b.date));

                const temperatureChartData = {
                    labels: tankData.map(entry => entry.date),
                    datasets: [
                        {
                            label: 'Min Temperature (°C)',
                            data: tankData.map(entry => entry.temp_min),
                            backgroundColor: 'rgba(102, 217, 255, 0.5)',
                        },
                        {
                            label: 'Max Temperature (°C)',
                            data: tankData.map(entry => entry.temp_max),
                            backgroundColor: 'rgba(255, 102, 102, 0.5)',
                        }
                    ],
                };

                const humidityChartData = {
                    labels: tankData.map(entry => entry.date),
                    datasets: [
                        {
                            label: 'Average Humidity (%)',
                            data: tankData.map(entry => entry.hum_avg),
                            borderColor: 'rgba(191, 191, 191, 1)',
                            backgroundColor: 'rgba(255, 153, 153, 0.5)',
                            fill: false,
                        }
                    ],
                };

                setTemperatureData(temperatureChartData);
                setHumidityData(humidityChartData);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

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
