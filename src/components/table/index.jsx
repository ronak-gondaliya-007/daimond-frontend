import React, { useState } from 'react';
import '../../assets/css/table.css';

import daimondIcon from '../../assets/images/daimond.svg';
import button from '../../assets/images/button.svg';
import button1 from '../../assets/images/button-1.svg';
import button2 from '../../assets/images/button-2.svg';
import Pagination from '../pagination';

const Table = ({ headers, data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 3;

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const displayedData = data.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
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
                                                    <div
                                                        className="diamond-name"
                                                        data-tooltip={item["name"] || "No name available"}
                                                    >
                                                        <p>{item["name"]}</p>
                                                    </div>
                                                    <p className="diamond-id">{item["id"]}</p>
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
                                <button>
                                    <img src={button} alt="View" />
                                </button>
                                <button>
                                    <img src={button1} alt="Delete" />
                                </button>
                                <button>
                                    <img src={button2} alt="Edit" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Table;
