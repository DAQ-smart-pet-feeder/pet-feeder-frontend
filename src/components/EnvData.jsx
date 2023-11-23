import React from 'react';
import { TiThermometer } from "react-icons/ti";


const EnvData = ({ temp, humidity, pm }) => {
    return (
        <div>
            <TiThermometer />
            <h1>Environment Data</h1>
            <p>Temperature: {temp}</p>
            <p>Humidity: {humidity}</p>
            <p>AQI: {pm}</p>
        </div>
    );
};

export default EnvData;
