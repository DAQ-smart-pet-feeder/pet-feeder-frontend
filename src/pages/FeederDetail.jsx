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
import WeatherCard from "../components/WeatherCard";

const FeederDetail = () => {
    const [petFeederStatus, setPetFeederStatus] = useState({
        roomTemp: "",
        feedingStatus: "Standby",
        roomHumidity: "",
        roomAqi: "",
        envTemp: "",
        envHumidity: "",
        envAqi: "",
        foodTankHumidity: "",
        foodTankTemp: "",
    });

    useEffect(() => {
        fetch('http://127.0.0.1:8080/pet-feeder-api/v3/data')
            .then(response => response.json())
            .then(data => {
                const status = data[0];
                console.log(status)
                setPetFeederStatus({
                    roomTemp: `${status.room_temp}°C`,
                    roomHumidity: `${status.room_hum}%`,
                    roomAqi: `${status.room_pm}`,
                    envTemp: `${status.env_temp}°C`,
                    envHumidity: `${status.env_hum}%`,
                    envAqi: `${status.env_pm}`,
                    foodTankHumidity: `${status.tank_hum}%`,
                    foodTankTemp: `${status.tank_temp}°C`,
                });
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    const handleQuickFeed = (boxNumber) => {
        console.log(`Feeding from box ${boxNumber}`);

        fetch('http://127.0.0.1:8080/pet-feeder-api/v3/post-portion-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ por: parseInt(boxNumber) }),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error posting data:', error);
            });
    };

    return (
        <div>
            <NavBar />
            <div className="lock-font">
                <div className="feeder-container">
                    <div className="data-container">
                        <div className="header-text">Pet Feeder Status</div>
                        {/* <WeatherCard/> */}
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
                            <img src={bowlImg} alt="tank" />
                        </div>
                        {/* TODO: write function to show each pic rely with food level from api */}
                        <div className="feeding-status-container">
                            <FeedingStatus status={petFeederStatus.feedingStatus} />
                        </div>
                    </div>
                    <div className="test">
                        <QuickFeed onFeed={handleQuickFeed} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeederDetail;
