import '../styles/QuickFeed.css';
import React, { useState } from 'react';
import Swal from 'sweetalert2'

const QuickFeed = ({ onFeed }) => {
    const [selectedBox, setSelectedBox] = useState(null);

    const handleBoxClick = (number) => {
        setSelectedBox(number);
    };

    const handleFeedClick = () => {
        if (selectedBox !== null) {
            onFeed(selectedBox);
            Swal.fire("Food has been given");
            setSelectedBox(null); // Reset the selected box after feeding
        }
    };

    return (
        <div className="quick-feed-container">
            <h2>Quick Feed</h2>
            <div className="boxes-container">
                {[...Array(10).keys()].map(number => (
                    <div 
                        key={number} 
                        className={`feed-box ${selectedBox === number + 1 ? 'selected' : ''}`}
                        onClick={() => handleBoxClick(number + 1)}
                    >
                        {number + 1}
                    </div>
                ))}
            </div>
            <a href="#" class="cta" id="open" onClick={handleFeedClick}>
            <span>Feed</span>
            <svg width="13px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
            </a>
        </div>
    );
};

export default QuickFeed;
