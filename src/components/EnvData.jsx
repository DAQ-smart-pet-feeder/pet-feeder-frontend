import React from 'react';

const EnvData = ({ temp, humidity, pm }) => {
    return (
        <div>
            <h2>Environment Data</h2>
            <p><strong>Temperature:</strong> {temp}</p>
            <p><strong>Humidity:</strong> {humidity}</p>
            <p><strong>AQI:</strong> {pm}</p>
        </div>
    );
};

export default EnvData;
