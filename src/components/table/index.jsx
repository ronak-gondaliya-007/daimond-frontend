import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../../assets/css/table.css';

import Pagination from '../pagination';
import DetailPopup from '../popup/Detail';
import DeletePopup from '../popup/delete';
import StockForm from '../../pages/Stock/Form';

const Table = ({
    columns,
    data,
    tableClass
}) => {
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 3;

    const totalPages = Math.ceil(data.length / rowsPerPage);


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const [selectedItem, setSelectedItem] = useState(null);

    const handleClosePopup = () => {
        setSelectedItem(null);
    };

    return (
        <div className={`table-container ${tableClass}`}>
            <table className="common-table">
                <thead>
                    <tr className='text-center py-[12px]'>
                        {
                            columns.map(({ label, isCheckbox }, index) => (
                                <th
                                    key={index}
                                    className={`
                                         ${isCheckbox ? 'max-w-[50px]' : ''}
                                    `}
                                >
                                    <div className={`custom-checkbox ${!isCheckbox ? 'flex item-center' : ''}`}>
                                        {isCheckbox && <input type="checkbox" className='checkmark' />}
                                        <span className='text-[14px] font-medium text-[#0A112F]'>{label}</span>
                                    </div>
                                </th>
                            ))
                        }
                    </tr>

                </thead>
                <tbody>
                    {
                        data.map((item, index) => (
                            <tr key={index}>
                                {
                                    columns.map((col) => {
                                        switch (col.type) {
                                            case "checkbox": {
                                                return <td className='custom-checkbox w-[80px] min-w-[80px]'>
                                                    <div className='flex items-center justify-center'>
                                                        <input type="checkbox" className='checkmark' />
                                                    </div>
                                                </td>;
                                            }
                                            case "custom": {
                                                return <td>{col.render(item, index)}</td>;
                                            }
                                            case "action": {
                                                return col.render(item, index);
                                            }
                                            default: {
                                                return <td><span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{item[col.key]}</span></td>
                                            }
                                        }
                                    })
                                }
                            </tr>
                        ))
                    }
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
