import React, { useState, useEffect } from 'react';
import BarChart from "../charts/BarChart";
import LineChart from "../charts/LineChart";
import "../../styles/RoomData.css";
import { useNavigate } from 'react-router-dom';

const RoomDataGraphs = () => {
    const [temperatureData, setTemperatureData] = useState({
        labels: [],
        datasets: []
    });
    const [humidityData, setHumidityData] = useState({
        labels: [],
        datasets: []
    });
    const [aqiData, setAqiData] = useState({
        labels: [],
        datasets: []
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/pet-feeder-api/v3/visual/room-data')
            .then(response => response.json())
            .then(data => {
                processChartData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const processChartData = (data) => {
        const labels = Object.keys(data.temp);

        const tempMinData = labels.map(label => data.temp[label].min);
        const tempMaxData = labels.map(label => data.temp[label].max);

        const humAvgData = labels.map(label => (data.hum[label].min + data.hum[label].max) / 2);

        const aqiMinData = labels.map(label => data.aqi[label].min);
        const aqiMaxData = labels.map(label => data.aqi[label].max);

        setTemperatureData({
            labels: labels,
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
            labels: labels,
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

        setAqiData({
            labels: labels,
            datasets: [
                {
                    label: 'Min AQI',
                    data: aqiMinData,
                    backgroundColor: 'rgba(102, 255, 255, 0.5)',
                },
                {
                    label: 'Max AQI',
                    data: aqiMaxData,
                    backgroundColor: 'rgba(0, 102, 153, 0.5)',
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
            <div className='room-data-header'>
                <h1>Room Data Graphs</h1>
                <div className='chart-container'>
                    <h2>Temperature</h2>
                    <BarChart data={temperatureData} className="small-chart" />

                    <h2>Humidity</h2>
                    <LineChart data={humidityData} className="small-chart" />

                    <h2>AQI</h2>
                    <BarChart data={aqiData} className="small-chart" />
                </div>
            </div>
        </div>
    );
};

export default RoomDataGraphs;
