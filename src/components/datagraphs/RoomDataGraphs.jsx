import React, { useState, useEffect } from 'react';
import BarChart from "../charts/BarChart";
import LineChart from "../charts/LineChart";
import ScatterChart from "../charts/ScatterChart";
import "../../styles/RoomData.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

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
        axios.get('http://localhost:8080/pet-feeder-api/v3/visual/room-data')
            .then(response => {
                const roomData = response.data;

                // Sort the roomData by date in ascending order
                roomData.sort((a, b) => new Date(a.date) - new Date(b.date));

                const temperatureChartData = {
                    labels: roomData.map(entry => entry.date),
                    datasets: [
                        {
                            label: 'Min Temperature (°C)',
                            data: roomData.map(entry => entry.temp_min),
                            backgroundColor: 'rgba(102, 217, 255, 0.5)',
                        },
                        {
                            label: 'Max Temperature (°C)',
                            data: roomData.map(entry => entry.temp_max),
                            backgroundColor: 'rgba(255, 102, 102, 0.5)',
                        }
                    ],
                };

                const humidityChartData = {
                    labels: roomData.map(entry => entry.date),
                    datasets: [
                        {
                            label: 'Average Humidity (%)',
                            data: roomData.map(entry => entry.hum_avg),
                            borderColor: 'rgba(191, 191, 191, 1)',
                            backgroundColor: 'rgba(255, 153, 153, 0.5)',
                            fill: false,
                        }
                    ],
                };

                const aqiChartData = {
                    labels: roomData.map(entry => entry.date),
                    datasets: [
                        {
                            label: 'Min PM 2.5',
                            data: roomData.map(entry => entry.pm_min),
                            backgroundColor: 'rgba(102, 255, 255, 0.5)',
                        },
                        {
                            label: 'Max PM 2.5',
                            data: roomData.map(entry => entry.pm_max),
                            backgroundColor: 'rgba(0, 102, 153, 0.5)',
                        }
                    ],
                };

                setTemperatureData(temperatureChartData);
                setHumidityData(humidityChartData);
                setAqiData(aqiChartData);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/pet-feeder-api/v3/visual/temp')
            .then(response => {
                const tempData = response.data;
                console.log(tempData);
                let scatterChartData = [];
                tempData.forEach(item => {
                    if (Array.isArray(item.eating_time)) {
                        item.eating_time.forEach(time => {
                            scatterChartData.push({ x: item.temp, y: time });
                        });
                    } else {
                        scatterChartData.push({ x: item.temp, y: item.eating_time });
                    }
                });
                
                console.log(scatterChartData);
    
                setScatterData1({
                    datasets: [{
                        label: 'Pet Eating Time vs Temperature',
                        data: scatterChartData,
                        backgroundColor: 'rgba(102, 140, 255, 1)',
                    }]
                });
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/pet-feeder-api/v3/visual/pm25')
            .then(response => {
                const aqiData = response.data;
                let scatterChartData = [];
                aqiData.forEach(item => {
                    if (Array.isArray(item.eating_time)) {
                        item.eating_time.forEach(time => {
                            scatterChartData.push({ x: item.pm25, y: time });
                        });
                    } else {
                        scatterChartData.push({ x: item.pm25, y: item.eating_time });
                    }
                });
    
                setScatterData2({
                    datasets: [{
                        label: 'Pet Eating Time vs PM 2.5',
                        data: scatterChartData,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }]
                });
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/pet-feeder-api/v3/visual/hum')
            .then(response => {
                const humidityData = response.data;
                let scatterChartData = [];
                humidityData.forEach(item => {
                    if (Array.isArray(item.eating_time)) {
                        item.eating_time.forEach(time => {
                            scatterChartData.push({ x: item.hum, y: time });
                        });
                    } else {
                        scatterChartData.push({ x: item.hum, y: item.eating_time });
                    }
                });
    
                setScatterData3({
                    datasets: [{
                        label: 'Pet Eating Time vs Humidity',
                        data: scatterChartData,
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    }]
                });
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

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
                    text: 'PM 2.5', // X-axis label
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

                    <h2>PM 2.5</h2>
                    <BarChart data={aqiData} className="small-chart" />

                    <h2>Humidity</h2>
                    <LineChart data={humidityData} className="small-chart" />

                    <h2>Relation between Temperature and Eating time</h2>
                    <ScatterChart data={scatterData1} options={options1} className="small-chart" />

                    <h2>Relation between PM 2.5 and Eating time</h2>
                    <ScatterChart data={scatterData2} options={options2} className="small-chart" />

                    <h2>Relation between Humidity and Eating time</h2>
                    <ScatterChart data={scatterData3} options={options3} className="small-chart" />
                </div>
            </div>
        </div>
    );
};

export default RoomDataGraphs;