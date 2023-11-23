import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/TankData.css"
import { LiaPercentageSolid } from "react-icons/lia";

const TankData = ({ temp, humidity }) => {
    const navigate = useNavigate();

    const navigateToGraphs = () => {
        navigate('/tank-data');
    };

    return (
        <div className="tank-data" onClick={navigateToGraphs}>
            <LiaPercentageSolid />
            <h1>Food Tank Data</h1>
            <p>Temperature: {temp}</p>
            <p>Humidity: {humidity}</p>
        </div>
    );
};

export default TankData;
