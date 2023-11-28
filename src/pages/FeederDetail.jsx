import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import RoomData from '../components/RoomData';
import EnvData from '../components/EnvData';
import FoodTankData from '../components/FoodTankData';
import FeedingStatus from '../components/FeedingStatus';
import tankLevel100Img from '../img/tanklevel/100percent.png';
import tankLevel90Img from '../img/tanklevel/90percent.png';
import tankLevel80Img from '../img/tanklevel/80percent.png';
import tankLevel70Img from '../img/tanklevel/70percent.png';
import tankLevel60Img from '../img/tanklevel/60percent.png';
import tankLevel50Img from '../img/tanklevel/50percent.png';
import tankLevel40Img from '../img/tanklevel/40percent.png';
import tankLevel30Img from '../img/tanklevel/30percent.png';
import tankLevel20Img from '../img/tanklevel/20percent.png';
import tankLevel10Img from '../img/tanklevel/10percent.png';
import tankLevel0Img from '../img/tanklevel/0percent.png';
import QuickFeed from "../components/QuickFeed";
import '../styles/FeederDetail.css';
import WeatherCard from "../components/WeatherCard";
import Swal from 'sweetalert2';

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

    const [tankLevel, setTankLevel] = useState(0);
    const [feedingStatus, setFeedingStatus] = useState("Standby");

    const getTankLevelImage = () => {
        switch (true) {
            case (tankLevel > 90): return tankLevel100Img;
            case (tankLevel > 80): return tankLevel90Img;
            case (tankLevel > 70): return tankLevel80Img;
            case (tankLevel > 60): return tankLevel70Img;
            case (tankLevel > 50): return tankLevel60Img;
            case (tankLevel > 40): return tankLevel50Img;
            case (tankLevel > 30): return tankLevel40Img;
            case (tankLevel > 20): return tankLevel30Img;
            case (tankLevel > 10): return tankLevel20Img;
            case (tankLevel > 0): return tankLevel10Img;
            default: return tankLevel0Img;
        }
    };

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

        fetch('http://localhost:8080/pet-feeder-api/v3/get-tank-data')
            .then(response => response.json())
            .then(data => {
                const tankData = data[0];
                setTankLevel(tankData.remaining_percentage);
                setFeedingStatus(tankData.feeding_status === 1 ? "Feeding" : "Standby");
            })
            .catch(error => {
                console.error('Error fetching tank data: ', error);
            });
    }, []);

    const handleQuickFeed = (boxNumber) => {
        console.log(`Feeding from box ${boxNumber}`);

        if (tankLevel === 0) {
            Swal.fire({
                title: 'Unable to Feed',
                text: 'The food tank is empty. Please refill the tank to continue feeding.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        } else {
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
        }
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
                        </div>
                        <div className="block">
                            <EnvData
                                temp={petFeederStatus.envTemp}
                                humidity={petFeederStatus.envHumidity}
                                pm={petFeederStatus.envAqi}
                            />
                        </div>
                        <div className="block">
                            <FoodTankData
                                humidity={petFeederStatus.foodTankHumidity}
                                temp={petFeederStatus.foodTankTemp}
                            />
                        </div>
                    </div>
                    <div className="tank-and-status-container">
                        <div className="image-container">
                            <img src={getTankLevelImage()} alt="tank" />
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
