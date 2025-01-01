import React, { useState, useEffect } from 'react';
import '../../assets/css/table.css';

const DiamondTable = ({ data, headers, onDelete, onEdit }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="diamond-table-container">
            <table>
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((diamond) => (
                        <tr key={diamond.id}>
                            {headers.map((header) => (
                                <td key={`${diamond.id}-${header}`}>{diamond[header]}</td>
                            ))}
                            <td>
                                <button className="action-btn" onClick={() => onDelete(diamond.id)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                                <button className="action-btn" onClick={() => onEdit(diamond)}>
                                    <i className="fa fa-edit"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                {pageNumbers.map((number) => (
                    <button key={number} onClick={() => handlePageChange(number)} className={currentPage === number ? 'active' : ''}>
                        {number}
                    </button>
                ))}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageNumbers.length}>Next</button>
            </div>
        </div>
    );
};

export default DiamondTable;