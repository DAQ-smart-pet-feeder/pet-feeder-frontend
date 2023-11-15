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
    // mock data
    const petFeederStatus = {
    roomTemp: "22°C",
    feedingStatus: "Feeding", // 'Feeding'/ 'Standby'
    roomHumidity: "45%",
    foodTankHumidity: "50%",
    foodTankTemp: "20°C",
    };

    // const [petFeederStatus, setPetFeederStatus] = useState({
    //     roomTemp: "",
    //     feedingStatus: "Standby", // Default status
    //     roomHumidity: "",
    //     foodTankHumidity: "",
    //     foodTankTemp: "",
    // });
    
    // useEffect(() => {
    //     fetch('/data')
    //         .then(response => response.json())
    //         .then(data => {
    //             // Assuming the API returns an array and you are interested in the first item
    //             const status = data[0];
    //             setPetFeederStatus({
    //                 roomTemp: `${status.room_temp}°C`,
    //                 roomHumidity: `${status.room_hum}%`,
    //                 foodTankTemp: `${status.tank_temp}°C`,
    //                 foodTankHumidity: `${status.tank_hum}%`,
    //                 // Update feedingStatus based on your logic or API response
    //             });
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data: ', error);
    //         });
    // }, []);

    return (
        <div>
            <NavBar />
            <div className="lock-font">
                <div className="feeder-container">
                    <div className="data-container">
                        <h1 className="lock-font">Pet Feeder Status</h1>
                        <div className="block">
                        <RoomData
                            temp={petFeederStatus.roomTemp}
                            humidity={petFeederStatus.roomHumidity}
                        />
                        </div>
                        <div className="block">
                        <FoodTankData
                            humidity={petFeederStatus.foodTankHumidity}
                            temp={petFeederStatus.foodTankTemp}
                        />
                        </div>
                        <div className="block">
                        <FeedingStatus status={petFeederStatus.feedingStatus} />
                        </div>
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
