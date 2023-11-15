// FoodTankData.js
import React from 'react';

const FoodTankData = ({ humidity, temp }) => {
    return (
        <div>
            <h2>Food Tank Data</h2>
            <p><strong>Humidity:</strong> {humidity}</p>
            <p><strong>Temperature:</strong> {temp}</p>
        </div>
    );
};

export default FoodTankData;
