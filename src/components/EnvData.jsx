import React from 'react';
import { TiThermometer } from "react-icons/ti";
import Swal from 'sweetalert2';

const EnvData = ({ temp, humidity, pm }) => {
    const showAdvice = () => {
        const advice = getEnvironmentalAdvice(temp, humidity, pm);
        Swal.fire({
            title: 'Environmental Advice',
            text: advice,
            icon: 'info',
            confirmButtonText: 'Ok'
        });
    };

    const getEnvironmentalAdvice = (temp, humidity, pm) => {
        if (pm > 100) {
            return "The air quality is poor. It's better to close your windows and use an air purifier.";
        } else if (pm > 100 && temp > 30) {
            return "The air quality is poor and it's hot outside. Close your windows, use an air purifier, and turn on the air conditioner.";
        } else if (pm > 50 && pm <= 100) {
            return "The air quality is moderate. It's better to use an air purifier.";
        } else if (pm > 50 && pm <= 100 && temp > 30) {
            return "The air quality is moderate and it's hot outside. Use an air purifier and turn on the air conditioner.";
        } else if (pm > 0 && pm <= 50 && humidity > 60) {
            return "The air quality is good, but it's quite humid. Consider using a dehumidifier.";
        } else if (pm > 0 && pm <= 50 && temp > 30 && humidity > 60) {
            return "The air quality is good, but it's hot and humid. Turn on the air conditioner and consider a dehumidifier.";
        } else if (pm > 0 && pm <= 50 && temp > 30) {
            return "The air quality is good but it's hot outside. Better turn on the air conditioner.";
        } else if (humidity < 30) {
            return "The air is quite dry. Consider using a humidifier for better comfort.";
        } else if (humidity > 60) {
            return "It's quite humid. Consider using a dehumidifier for comfort.";
        }
        return "The air quality is good. No specific action needed.";
    };

    return (
        <div>
            <TiThermometer />
            <h1 onClick={showAdvice} className="env-data">Environment Data</h1>
            <p>Temperature: {temp}</p>
            <p>Humidity: {humidity}</p>
            <p>AQI: {pm}</p>
        </div>
    );
};

export default EnvData;

