import React from 'react';

const Pagination = ({ currentPage, recordsPerPage, totalRecords, paginate }) => {
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const goToFirstPage = () => {
        if (currentPage > 1) {
            paginate(1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            paginate(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    
    const goToLastPage = () => {
        if (currentPage < totalPages) {
            paginate(totalPages);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    
    

    return (
        <nav>
            <ul className='pagination'>
                <span className='page-item'>
                    <button onClick={goToFirstPage} className='page-link'>&laquo;&laquo;</button>
                </span>
                <span className='page-item'>
                    <button onClick={goToPreviousPage} className='page-link'>&laquo;</button>
                </span>
                <span className='page-item'>
                    <span className='page-link'>{currentPage} of {totalPages}</span>
                </span>
                <span className='page-item'>
                    <button onClick={goToNextPage} className='page-link'>&raquo;</button>
                </span>
                <span className='page-item'>
                    <button onClick={goToLastPage} className='page-link'>&raquo;&raquo;</button>
                </span>
            </ul>
        </nav>
    );
};

export default Pagination;
