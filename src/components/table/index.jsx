import React, { useState } from 'react';
import '../../assets/css/table.css';

import daimondIcon from '../../assets/images/daimond.svg';
import button from '../../assets/images/button.svg';
import button1 from '../../assets/images/button-1.svg';
import button2 from '../../assets/images/button-2.svg';
import arrow from '../../assets/images/arrow.svg';

const Table = ({ headers, data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 3;

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const displayedData = data.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderPagination = () => {
        let pages = [];
        const range = 3;
        const maxPages = 7;
        const totalPage = Math.max(1, totalPages);

        let startPage = Math.max(1, currentPage - range);
        let endPage = Math.min(totalPage, currentPage + range);

        if (currentPage <= 4) {
            startPage = 1;
            endPage = Math.min(maxPages, totalPage);
        }
        else if (currentPage >= totalPage - 3) {
            startPage = Math.max(1, totalPage - maxPages + 1);
            endPage = totalPage;
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

        if (endPage < totalPage) {
            if (endPage < totalPage - 1) {
                pages.push('...');
            }
        }

        return pages;
    };


    return (
        <div className="table-container">
            <table className="common-table">
                <thead>
                    <tr>
                        <th style={{ width: '20px', height: '20px' }}>
                            <input type="checkbox" />
                        </th>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedData.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <input type="checkbox" />
                            </td>
                            {headers.map((header, colIndex) => {
                                if (header === "Diamond Name and ID") {
                                    return (
                                        <td key={colIndex}>
                                            <div className="diamond-info">
                                                <img src={daimondIcon} alt="Diamond" />
                                                <div>
                                                    <div className='diamond-name' data-tooltip={item["name"] || "No name available"}>
                                                        <p>{item["name"]}</p>
                                                    </div>
                                                    <p className='diamond-id'>{item["id"]}</p>
                                                </div>
                                            </div>
                                        </td>
                                    );
                                } else if (header === "Ref No") {
                                    return <td key={colIndex}>{item["refNo"]}</td>;
                                } else {
                                    return <td key={colIndex}>{item[header.toLowerCase()]}</td>;
                                }
                            })}
                            <td>
                                <button><img src={button} alt="View" /></button>
                                <button><img src={button1} alt="Delete" /></button>
                                <button><img src={button2} alt="Edit" /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button className='functional' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <img className='previous-arrow' src={arrow} alt="Previous" />
                    <p>Previous</p>
                </button>
                <div className='page-numbers'>
                    {renderPagination().map((page, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(page)}
                            className={page === currentPage ? 'active' : ''}
                            disabled={page === '...'}
                        >
                            {page}
                        </button>
                    ))}
                </div>
                <button className='functional' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    <p >Next</p>
                    <img className='next-arrow' src={arrow} alt="Next" />
                </button>
            </div>
        </div>
    );
};

export default Table;