import '../styles/QuickFeed.css';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const QuickFeed = ({ onFeed }) => {
    const [selectedBox, setSelectedBox] = useState(null);

    const handleBoxClick = (number) => {
        setSelectedBox(number);
    };

    const handleFeedClick = () => {
        if (selectedBox !== null) {
            const result = onFeed(selectedBox);
    
            if (result && typeof result.then === 'function') {
                result.then(() => {
                    Swal.fire("Success", "Food has been given", "success");
                })
                .catch((error) => {
                    Swal.fire("Error", "Failed to feed: " + error.message, "error");
                })
                .finally(() => {
                    setSelectedBox(null);
                });
            } else {
                Swal.fire("Success", "Food has been given", "success");
                setSelectedBox(null);
            }
        } else {
            Swal.fire("Warning", "Please select a box to feed from", "warning");
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
            <div>
                <button className="button-74" onClick={handleFeedClick}>Feed</button>
            </div>
        </div>
    );
};

export default QuickFeed;
