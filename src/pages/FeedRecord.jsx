import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Pagination from '../components/Pagination';
import '../styles/FeedRecord.css';

const FeedRecord = () => {
    const [groupedFeedingHistory, setGroupedFeedingHistory] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5); // total records per page

    useEffect(() => {
        fetch('http://localhost:8080/pet-feeder-api/v3/get-feeding-history')
            .then(response => response.json())
            .then(data => {
                const formattedData = data.map(entry => {
                    const dateTime = new Date(entry.ts);
                    const date = dateTime.toISOString().split('T')[0]; 
                    const time = dateTime.toISOString().split('T')[1].substring(0, 5); 
    
                    return {
                        dateTime: dateTime, // Keep the original Date object for sorting
                        date: date,
                        time: time,
                        portion: entry.por.toString() 
                    };
                });
    
                formattedData.sort((a, b) => b.dateTime - a.dateTime);
    
                const groupedData = formattedData.reduce((acc, currentValue) => {
                    (acc[currentValue.date] = acc[currentValue.date] || []).push(currentValue);
                    return acc;
                }, {});
    
                // Sort the dates in descending order
                const sortedDates = Object.keys(groupedData).sort((a, b) => b.localeCompare(a));
                const sortedGroupedData = {};
                sortedDates.forEach(date => {
                    sortedGroupedData[date] = groupedData[date];
                });
    
                setGroupedFeedingHistory(sortedGroupedData);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);
    
    

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentDates = Object.keys(groupedFeedingHistory).slice(indexOfFirstRecord, indexOfLastRecord);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='lock-font'>
            <NavBar />
            <div className="food-record-container">
                <h4>Feeding History</h4>
                {currentDates.map((date) => (
                    <div key={date} className="date-group">
                        <h2 className="date-header">{date}</h2>
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
