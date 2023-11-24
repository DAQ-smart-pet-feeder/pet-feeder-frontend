import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Pagination from '../components/Pagination';
import '../styles/BehaviorRecord.css';

const BehaviorRecord = () => {
    const [groupedBehaviorHistory, setGroupedBehaviorHistory] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(3); // total records per page

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/pet-feeder-api/v3/get-behavior-data');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
    
                const transformedData = data.map(item => {
                    const [date, time] = item.ts.split(' ');
                    const formattedTime = time.slice(0, 5); // Extracts the HH:mm part
                    const behavior = item.stat === 1 ? 'Pet Approaching' : 'Pet Leaving';
                    return { date, time: formattedTime, behavior };
                });
    
                transformedData.sort((a, b) => {
                    const dateTimeA = `${a.date} ${a.time}`;
                    const dateTimeB = `${b.date} ${b.time}`;
                    return dateTimeB.localeCompare(dateTimeA);
                });
    
                const groupedData = transformedData.reduce((acc, currentValue) => {
                    (acc[currentValue.date] = acc[currentValue.date] || []).push(currentValue);
                    return acc;
                }, {});
    
                // Sort the dates in descending order
                const sortedDates = Object.keys(groupedData).sort((a, b) => b.localeCompare(a));
                const sortedGroupedData = {};
                sortedDates.forEach(date => {
                    sortedGroupedData[date] = groupedData[date];
                });
    
                setGroupedBehaviorHistory(sortedGroupedData);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
    
        fetchData();
    }, []);
    
    
    

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentDates = Object.keys(groupedBehaviorHistory).slice(indexOfFirstRecord, indexOfLastRecord);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='lock-font'>
            <NavBar />
            <div className="behavior-record-container">
                <h4>Pet Behavior History</h4>
                {currentDates.map((date) => (
                    <div key={date} className="date-group">
                        <h2 className="date-header">{date}</h2>
                        {groupedBehaviorHistory[date].map((entry, index) => (
                            <div key={index} className="behavior-record">
                                <span>{entry.time}</span>
                                <span>{entry.behavior}</span>
                            </div>
                        ))}
                    </div>
                ))}
                <Pagination 
                    currentPage={currentPage}
                    recordsPerPage={recordsPerPage} 
                    totalRecords={Object.keys(groupedBehaviorHistory).length} 
                    paginate={paginate} 
                />
            </div>
        </div>
    );
};

export default BehaviorRecord;
