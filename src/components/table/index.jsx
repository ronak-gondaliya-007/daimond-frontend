import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/table.css';

import daimondIcon from '../../assets/images/daimond.svg';
import button from '../../assets/images/button.svg';
import button1 from '../../assets/images/button-1.svg';
import button2 from '../../assets/images/button-2.svg';
import Pagination from '../pagination';
import DetailPopup from '../popup/Detail';
import DeletePopup from '../popup/delete';
import StockForm from '../../pages/Stock/Form';

const Table = ({ headers, data }) => {
    const navigate = useNavigate();

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

    const [selectedItem, setSelectedItem] = useState(null);

    const handleViewClick = (item) => {
        setSelectedItem({ ...item, action: 'view' });
    };

    const handleDeleteClick = (item) => {
        setSelectedItem({ ...item, action: 'delete' });
    };

    const handleEditClick = (item) => {
        setSelectedItem({ ...item, action: 'edit' });
        navigate('/stock-edit');
    };

    const handleClosePopup = () => {
        setSelectedItem(null);
    };

    return (
        <div className="table-container">
            <table className="common-table">
                <thead>
                    <tr>
                        <th style={{ width: '20px', height: '20px' }}>
                            <input type="checkbox" className='checkbox' />
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
                                    <img src={button} alt="View" onClick={() => handleViewClick(item)} />
                                </button>
                                <button>
                                    <img src={button1} alt="Delete" onClick={() => handleDeleteClick(item)} />
                                </button>
                                <button>
                                    <img src={button2} alt="Edit" onClick={() => handleEditClick(item)} />
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

            {selectedItem && selectedItem.action === 'view' && <DetailPopup data={selectedItem} onClose={handleClosePopup} />}
            {selectedItem && selectedItem.action === 'delete' && <DeletePopup data={selectedItem} onClose={handleClosePopup} />}
            {selectedItem && selectedItem.action === 'edit' && <StockForm data={selectedItem} />}
        </div>
    );
};

export default Table;
