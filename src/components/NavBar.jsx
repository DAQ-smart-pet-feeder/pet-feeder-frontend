import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'; // Make sure this path is correct

const Navbar = () => {
    return (
        <div className='lock-font'>
            <nav className="navbar">
                <div className="logo">
                    <h1>Smart Pet Feeder</h1>
                </div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/mealplan">Meal Plan</Link>
                    </li>
                    <li>
                        <Link to="/record">Feed Record</Link>
                    </li>
                    <li>
                        <Link to="/contact">More</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
