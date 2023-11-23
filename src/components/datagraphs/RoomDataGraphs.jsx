import React, { useState, useEffect } from 'react';
import BarChart from "../charts/BarChart";
import LineChart from "../charts/LineChart";
import ScatterChart from "../charts/ScatterChart";
import "../../styles/RoomData.css"
import { useNavigate } from 'react-router-dom';

const RoomDataGraphs = () => {
    const [scatterData1, setScatterData1] = useState({
        datasets: []
    });

    const [scatterData2, setScatterData2] = useState({
        datasets: []
    });

    const [scatterData3, setScatterData3] = useState({
        datasets: []
    });

    useEffect(() => {
        const mockScatterData = {
            datasets: [{
                label: 'Pet Eating Time vs Temperature',
                data: [
                    { x: 21, y: 300 }, // x is temperature, y is eating time
                    { x: 22, y: 600 },
                    { x: 23, y: 900 },
                    { x: 23.5, y: 1500 },
                    { x: 24, y: 1380 },
                    { x: 25, y: 1385 },
                    { x: 25.5, y: 1440 },
                    { x: 27, y: 600 },
                    { x: 28, y: 950 },
                    { x: 31, y: 180 },
                    { x: 25, y: 1885 },
                    { x: 25.5, y: 1470 },
                    { x: 27, y: 600 },
                    { x: 28, y: 950 },
                ],
                backgroundColor: 'rgba(102, 140, 255, 1)',
            }]
        };
        setScatterData1(mockScatterData);
    }, []);

    useEffect(() => {
        const mockScatterData = {
            datasets: [{
                label: 'Pet Eating Time vs AQI',
                data: [
                    { x: 88, y: 1700 }, // x is AQI, y is eating time
                    { x: 77, y: 1600 },
                    { x: 66, y: 900 },
                    { x: 55, y: 500 },
                    { x: 44, y: 1380 },
                    { x: 40, y: 1385 },
                    { x: 35, y: 1440 },
                    { x: 37, y: 600 },
                    { x: 20, y: 1250 },
                    { x: 80, y: 1280 },
                    { x: 75, y: 885 },
                    { x: 64, y: 1470 },
                ],
                backgroundColor: 'rgba(102, 140, 255, 1)',
            }]
        };
        setScatterData2(mockScatterData);
    }, []);

    useEffect(() => {
        const mockScatterData = {
            datasets: [{
                label: 'Pet Eating Time vs Humidity',
                data: [
                    { x: 30, y: 1980 }, // x is humidity %, y is eating time
                    { x: 29, y: 1720 },
                    { x: 45, y: 766 },
                    { x: 80, y: 200 },
                    { x: 45, y: 850 },
                    { x: 50, y: 1385 },
                    { x: 32, y: 1440 },
                    { x: 37, y: 770 },
                    { x: 39, y: 700 },
                ],
                backgroundColor: 'rgba(102, 140, 255, 1)',
            }]
        };
        setScatterData3(mockScatterData);
    }, []);

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

    const aqiData = {
        labels: ['17 Nov', '18 Nov', '19 Nov', '20 Nov', '21 Nov', '22 Nov', '23 Nov'],
        datasets: [
            {
                label: 'Min AQI',
                data: [43, 43, 45, 38, 39, 42, 45], // Mock min temperature data
                backgroundColor: 'rgba(102, 255, 255, 0.5)',
            },
            {
                label: 'Max AQI',
                data: [52, 58, 54, 50, 80, 75, 62], // Mock max temperature data
                backgroundColor: 'rgba(0, 102, 153, 0.5)',
            }
        ],
    };

    const navigate = useNavigate();

    const navigateBack = () => {
        navigate('/'); // Navigate back to the homepage
    };

    const options1 = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Temperature (°C)', // X-axis label
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Eating Time (seconds)', // Y-axis label
                },
            }
        },
    };

    const options2 = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'AQI', // X-axis label
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Eating Time (seconds)', // Y-axis label
                },
            }
        },
    };

    const options3 = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Humidity (%)', // X-axis label
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Eating Time (seconds)', // Y-axis label
                },
            }
        },
    };
    

    return (
        <div className='lock-font'>
            <button className="button-74" onClick={navigateBack}>Back to Homepage</button>
            <div className='room-data-header'>
                <h1>Room Data Graphs</h1>
                <div className='chart-container'>
                    <h2>Temperature</h2>
                    <BarChart data={temperatureData} className="small-chart" />

                    <h2>AQI</h2>
                    <BarChart data={aqiData} className="small-chart" />

                    <h2>Humidity</h2>
                    <LineChart data={humidityData} className="small-chart" />

                    <h2>Relation between Temperature and Eating time</h2>
                    <ScatterChart data={scatterData1} options={options1} className="small-chart" />

                    <h2>Relation between AQI and Eating time</h2>
                    <ScatterChart data={scatterData2} options={options2} className="small-chart" />

                    <h2>Relation between Humidity and Eating time</h2>
                    <ScatterChart data={scatterData3} options={options3} className="small-chart" />
                </div>
            </div>
        </div>
    );
};

export default RoomDataGraphs;

// Example for data fetching
// useEffect(() => {
//     fetch('http://localhost:8080/pet-feeder-api/v3/visual/room-data-vs-eating-time')
//         .then(response => response.json())
//         .then(data => {
//             setScatterData1({
//                 datasets: [{
//                     label: 'Pet Eating Time vs Temperature',
//                     data: data.temperatureEatingTime.map(item => ({ x: item.temperature, y: item.eatingTime })),
//                     backgroundColor: 'rgba(102, 140, 255, 1)',
//                 }]
//             });
//             // Similarly for scatterData2 and scatterData3
//         })
//         .catch(error => {
//             console.error('Error fetching data: ', error);
//         });
// }, []);

// {
//     "temperatureEatingTime": [
//         { "temperature": 21, "eatingTime": 300 },
//         { "temperature": 22, "eatingTime": 600 },
//         // more data points...
//     ],
//     "aqiEatingTime": [
//         { "aqi": 88, "eatingTime": 1700 },
//         { "aqi": 77, "eatingTime": 1600 },
//         // more data points...
//     ],
//     "humidityEatingTime": [
//         { "humidity": 30, "eatingTime": 1980 },
//         { "humidity": 29, "eatingTime": 1720 },
//         // more data points...
//     ]
// }

