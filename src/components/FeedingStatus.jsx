import React from 'react';

const FeedingStatus = ({ status }) => {
    return (
        <div>
            <h2>Feeding Status</h2>
            <p><strong>Status:</strong> {status}</p>
        </div>
    );
};

export default FeedingStatus;
