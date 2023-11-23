import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/RoomData.css"
import { LiaHomeSolid } from "react-icons/lia";

const RoomData = ({ temp, humidity, pm }) => {
    const navigate = useNavigate();

    const navigateToGraphs = () => {
        navigate('/room-data');
    };

    return (
        <div className="room-data" onClick={navigateToGraphs}>
            <LiaHomeSolid />
            <h1>Room Data</h1>
            <p>Temperature: {temp}</p>
            <p>Humidity: {humidity}</p>
        </div>
    );
};

export default RoomData;
