import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Pagination from '../components/Pagination';
import '../styles/BehaviorRecord.css';

const BehaviorRecord = () => {
    const [groupedBehaviorHistory, setGroupedBehaviorHistory] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(3); // total records per page

    useEffect(() => {
        const mockData = [
            { date: '2023-11-15', time: '09:00', behavior: 'Pet Approaching' },
            { date: '2023-11-15', time: '09:12', behavior: 'Pet Leaving' },
            { date: '2023-11-14', time: '09:00', behavior: 'Pet Approaching' },
            { date: '2023-11-14', time: '09:08', behavior: 'Pet Leaving' },
            { date: '2023-11-13', time: '11:00', behavior: 'Pet Approaching' },
            { date: '2023-11-13', time: '11:05', behavior: 'Pet Leaving' },
            { date: '2023-11-13', time: '13:24', behavior: 'Pet Approaching' },
            { date: '2023-11-13', time: '13:40', behavior: 'Pet Leaving' },
            { date: '2023-11-12', time: '11:00', behavior: 'Pet Approaching' },
            { date: '2023-11-12', time: '11:10', behavior: 'Pet Leaving' },
            { date: '2023-11-12', time: '20:12', behavior: 'Pet Approaching' },
            { date: '2023-11-12', time: '20:14', behavior: 'Pet Leaving' },
            { date: '2023-11-11', time: '11:00', behavior: 'Pet Approaching' },
            { date: '2023-11-11', time: '11:03', behavior: 'Pet Leaving' },
            { date: '2023-11-11', time: '09:00', behavior: 'Pet Approaching' },
            { date: '2023-11-11', time: '09:09', behavior: 'Pet Leaving' },
        ];

        const groupedData = mockData.reduce((acc, currentValue) => {
            (acc[currentValue.date] = acc[currentValue.date] || []).push(currentValue);
            return acc;
        }, {});

        setGroupedBehaviorHistory(groupedData);
    }, []);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentDates = Object.keys(groupedBehaviorHistory).slice(indexOfFirstRecord, indexOfLastRecord);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='lock-font'>
            <NavBar />
            <div className="behavior-record-container">
                <h1>Pet Behavior History</h1>
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
