import React from 'react';
import arrow from '../../assets/images/arrow.svg';

import '../../assets/css/pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const renderPagination = () => {
        let pages = [];
        const range = 3;
        const maxPages = 7;

        let startPage = Math.max(1, currentPage - range);
        let endPage = Math.min(totalPages, currentPage + range);

        if (currentPage <= 4) {
            startPage = 1;
            endPage = Math.min(maxPages, totalPages);
        } else if (currentPage >= totalPages - 3) {
            startPage = Math.max(1, totalPages - maxPages + 1);
            endPage = totalPages;
        }

        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) {
                pages.push('...');
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push('...');
            }
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="pagination">
            <button
                className="functional"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <img className="previous-arrow" src={arrow} alt="Previous" />
                <p>Previous</p>
            </button>
            <div className="page-numbers">
                {renderPagination().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => page !== '...' && onPageChange(page)}
                        className={page === currentPage ? 'active' : ''}
                        disabled={page === '...'}
                    >
                        {page}
                    </button>
                ))}
            </div>
            <button
                className="functional"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <p>Next</p>
                <img className="next-arrow" src={arrow} alt="Next" />
            </button>
        </div>
    );
};

export default Pagination;
