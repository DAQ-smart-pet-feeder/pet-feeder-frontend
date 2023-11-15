import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import axios from 'axios';
import NavBar from "../components/NavBar";
import RoomData from '../components/RoomData';
import FoodTankData from '../components/FoodTankData';
import FeedingStatus from '../components/FeedingStatus';
import bowlImg from '../img/bowl.png';
import '../styles/FeederDetail.css';

const FeederDetail = () => {
    const petFeederStatus = {
    roomTemp: "22°C",
    feedingStatus: "Feeding", // Could be 'Feeding', 'Standby', etc.
    roomHumidity: "45%",
    foodTankHumidity: "50%",
    foodTankTemp: "20°C",
};

return (
    <div>
        <NavBar />
        <div className="lock-font">
            <div className="feeder-container">
                <div className="data-container">
                    <h1 className="lock-font">Pet Feeder Status</h1>
                    <RoomData
                        temp={petFeederStatus.roomTemp}
                        humidity={petFeederStatus.roomHumidity}
                    />
                    <FoodTankData
                        humidity={petFeederStatus.foodTankHumidity}
                        temp={petFeederStatus.foodTankTemp}
                    />
                    <FeedingStatus status={petFeederStatus.feedingStatus} />
                </div>
                <div className="image-container">
                    <img src={bowlImg} alt="Bowl"/> 
                </div>
            </div>
        </div>
    </div>
);
};

export default FeederDetail;
