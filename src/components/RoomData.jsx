// RoomData.js
import React from 'react';

const RoomData = ({ temp, humidity }) => {
    return (
        <div>
            <h2>Room Data</h2>
            <p><strong>Temperature:</strong> {temp}</p>
            <p><strong>Humidity:</strong> {humidity}</p>
        </div>
    );
};

export default RoomData;
