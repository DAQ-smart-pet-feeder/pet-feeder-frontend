import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import { LiaDogSolid } from "react-icons/lia";

const Navbar = () => {
    return (
        <div className='lock-font'>
            <nav className="navbar">
                <div className="logo">
                    <LiaDogSolid />Smart Pet Feeder
                </div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/mealplan">Meal Plan</Link>
                    </li>
                    <li>
                        <Link to="/records">Feed Record</Link>
                    </li>
                    <li>
                        <Link to="/behavior">Behavior Record</Link>
                    </li>
                    {/* <li>
                        <Link to="/contact">More</Link>
                    </li> */}
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;