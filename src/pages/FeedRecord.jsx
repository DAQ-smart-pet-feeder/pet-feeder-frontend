import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Pagination from '../components/Pagination';
import '../styles/FeedRecord.css';

const FeedRecord = () => {
    const [groupedFeedingHistory, setGroupedFeedingHistory] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10); // total records per page

    useEffect(() => {
        // Mock data
        const mockData = [
            { date: '2023-11-15', time: '08:00', portion: '5' },
            { date: '2023-11-15', time: '12:00', portion: '6' },
            { date: '2023-11-14', time: '08:00', portion: '5' },
            { date: '2023-11-13', time: '08:00', portion: '5' },
            { date: '2023-11-13', time: '12:00', portion: '6' },
            { date: '2023-11-12', time: '08:00', portion: '5' },
            { date: '2023-11-11', time: '08:00', portion: '5' },
            { date: '2023-11-11', time: '12:00', portion: '6' },
            { date: '2023-11-10', time: '08:00', portion: '5' },
            { date: '2023-11-10', time: '08:00', portion: '5' },
            { date: '2023-11-09', time: '08:00', portion: '5' },
            { date: '2023-11-09', time: '12:00', portion: '6' },
            { date: '2023-11-08', time: '08:00', portion: '5' },
            { date: '2023-11-07', time: '08:00', portion: '5' },
            { date: '2023-11-07', time: '08:00', portion: '5' },
            { date: '2023-11-06', time: '12:00', portion: '6' },
            { date: '2023-11-06', time: '08:00', portion: '5' },
            { date: '2023-11-05', time: '08:00', portion: '5' },
            { date: '2023-11-05', time: '08:00', portion: '5' },
            { date: '2023-11-05', time: '08:00', portion: '5' },
            { date: '2023-11-04', time: '12:00', portion: '6' },
            { date: '2023-11-04', time: '08:00', portion: '5' },
            { date: '2023-11-04', time: '08:00', portion: '5' },
            { date: '2023-11-03', time: '08:00', portion: '5' },
            { date: '2023-11-03', time: '12:00', portion: '6' },
            { date: '2023-11-02', time: '08:00', portion: '5' },
        ];

        // Group data by date
        const groupedData = mockData.reduce((acc, currentValue) => {
            (acc[currentValue.date] = acc[currentValue.date] || []).push(currentValue);
            return acc;
        }, {});

        setGroupedFeedingHistory(groupedData);
    }, []);

    // Get current records
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentDates = Object.keys(groupedFeedingHistory).slice(indexOfFirstRecord, indexOfLastRecord);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='lock-font'>
            <NavBar />
            <div className="food-record-container">
                <h1>Feeding History</h1>
                {currentDates.map((date) => (
                    <div key={date} className="date-group">
                        <h3 className="date-header">{date}</h3>
                        {groupedFeedingHistory[date].map((entry, index) => (
                            <div key={index} className="feeding-record">
                                <span>Time: {entry.time}</span>
                                <span>Portion: {entry.portion}</span>
                            </div>
                        ))}
                    </div>
                ))}
                <Pagination 
                    currentPage={currentPage}
                    recordsPerPage={recordsPerPage} 
                    totalRecords={Object.keys(groupedFeedingHistory).length} 
                    paginate={paginate} 
                />
            </div>
        </div>
    );
};

export default FeedRecord;
