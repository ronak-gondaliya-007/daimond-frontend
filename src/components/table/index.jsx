import React from 'react';

import Pagination from '../pagination';

const Table = ({
    columns,
    data = [],
    tableClass,
    currentPage,
    totalPages,
    onPageChange,
    handleSelectAll,
    handleCheck = () => { },
    selectItem = [],
    tableFooter = <></>
}) => {
    // Helper to format phone numbers
    const formatPhoneNumber = (phone) => {
        if (!phone) return "--";
        return phone.startsWith("91") ? phone.slice(2) : phone;
    };

    // Helper to check and replace missing values
    const getValueOrPlaceholder = (value) => {
        return value ? value : "--";
    };

    const allPresent = () => {
        if (data.length === 0 || selectItem.length === 0) return false;

        const items = data.map(({ _id }) => _id)
        const isCheck = items.every(item => selectItem.includes(item));
        return isCheck
    }

    return (
        <div className={`table-container ${tableClass}`}>
            <table className="common-table">
                <thead>
                    <tr className='text-center py-[12px]'>
                        {
                            columns.map(({ label, isCheckbox, className }, index) => (
                                <th
                                    key={index}
                                    className={`
                                         ${isCheckbox ? 'max-w-[50px]' : ''}
                                         ${className || ''}
                                    `}
                                >
                                    <div className={`custom-checkbox ${!isCheckbox ? 'flex item-center' : ''}`}>
                                        {isCheckbox && <input type="checkbox" className='checkmark' checked={allPresent()} onChange={handleSelectAll} />}                                        <span className='text-[14px] font-medium text-[#0A112F]'>{label}</span>
                                    </div>
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((item, index) => (
                            <tr key={index}>
                                {
                                    columns.map((col) => {
                                        switch (col.type) {
                                            case "checkbox": {
                                                return <td className='custom-checkbox w-[80px] min-w-[80px]'>
                                                    <div className='flex items-center justify-center'>
                                                        <input type="checkbox" className='checkmark' checked={selectItem?.includes(item._id)} onChange={(e) => handleCheck(e, item)} />                                                    </div>
                                                </td>;
                                            }
                                            case "custom": {
                                                return <td>{col.render(item, index)}</td>;
                                            }
                                            case "action": {
                                                return col.render(item, index);
                                            }
                                            case "render": {
                                                return col.render(item, index);
                                            }
                                            default: {
                                                const value = item[col.key];

                                                // Check if the key is 'phone' to apply formatting
                                                const formattedValue = col.key === "phone"
                                                    ? formatPhoneNumber(value)
                                                    : getValueOrPlaceholder(value);

                                                return (
                                                    <td>
                                                        <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">
                                                            {formattedValue}
                                                        </span>
                                                    </td>
                                                );
                                            }
                                        }
                                    })
                                }
                            </tr>
                        ))
                    }
                </tbody>
                {tableFooter}
            </table>

            {totalPages > 1 && <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />}

        </div>
    )
};

export default Table;
