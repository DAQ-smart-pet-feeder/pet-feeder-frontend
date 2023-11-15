import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import RoomData from '../components/RoomData';
import EnvData from '../components/EnvData';
import FoodTankData from '../components/FoodTankData';
import FeedingStatus from '../components/FeedingStatus';
import bowlImg from '../img/bowl.png';
import tankLevelImg from '../img/tanklevel/100percent.png';
import QuickFeed from "../components/QuickFeed";
import '../styles/FeederDetail.css';
import CIcon from '@coreui/icons-react';
import { cilHouse, cilCloudy, cilPaw } from '@coreui/icons';

const FeederDetail = () => {
    // mock data
    const petFeederStatus = {
    roomTemp: "22°C",
    feedingStatus: "Feeding", // 'Feeding'/ 'Standby'
    roomHumidity: "45%",
    roomAqi: "20",
    envTemp: "25°C",
    envHumidity: "60%",
    envAqi: "91",
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

    const handleQuickFeed = (boxNumber) => {
        console.log(`Feeding from box ${boxNumber}`);
        // post to backend
    };

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
                                pm={petFeederStatus.roomAqi}
                            />
                            {/* <CIcon icon={cilHouse} size="sm" /> */}
                        </div>
                        <div className="block">
                            <EnvData
                                temp={petFeederStatus.envTemp}
                                humidity={petFeederStatus.envHumidity}
                                pm={petFeederStatus.envAqi}
                            />
                            {/* <CIcon icon={cilCloudy} size="sm"/> */}
                        </div>
                        <div className="block">
                            <FoodTankData
                                humidity={petFeederStatus.foodTankHumidity}
                                temp={petFeederStatus.foodTankTemp}
                            />
                            {/* <CIcon icon={cilPaw} size="sm"/> */}
                        </div>
                    </div>
                    <div className="tank-and-status-container">
                        <div className="image-container">
                            <img src={tankLevelImg} alt="tank"/> 
                        </div>
                        {/* TODO: write function to show each pic rely with food level from api */}
                        <div className="feeding-status-container">
                            <FeedingStatus status={petFeederStatus.feedingStatus} />
                        </div>
                    </div>
                    <QuickFeed onFeed={handleQuickFeed} />
                </div>
            </div>
        </div>
    );
};

export default FeederDetail;
