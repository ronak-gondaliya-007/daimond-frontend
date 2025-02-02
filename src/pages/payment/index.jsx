import { arrowDown, arrowUp, button, button1, button2, diamondIcon, exportIcon, importIcon } from 'assets/utils/images';
import Loader from 'components/loader';
import NoDataFound from 'components/no-data-found';
import Search from 'components/search';
import Table from 'components/table';
import { FilterPopup } from 'pages/Stock';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getDate, getTime } from 'utils/dateFormat';

const Payment = () => {
    const navigate = useNavigate();

    const [stockData, setStockData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'Desc' });
    const [selectedItem, setSelectedItem] = useState(null);
    const [skippedStocks, setSkippedStocks] = useState([]);
    const [showSkippedPopup, setShowSkippedPopup] = useState(false);
    const [range, setRange] = useState([1, 100]);
    const [isOpen, setIsOpen] = useState(false)

    const isFetchingRef = useRef(false);


    const columns = [
        {
            label: '',
            key: 'diamondId',
            isCheckbox: true,
            type: 'checkbox'
        },
        {
            label: 'Diamond name and Id',
            key: 'diamondName',
            type: 'custom',
            render: (item) => {
                return <div className="flex items-center gap-[10px]">
                    <img src={diamondIcon} alt="Diamond" />
                    <div className="flex flex-col items-start">
                        <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{item.diamondName}</span>
                        <span className="text-[12px] font-medium text-[#0A112F]">{item.diamondId}</span>
                    </div>
                </div>
            },
            sortable: true
        },
        {
            label: 'Ref No',
            key: 'refNo',
            sortable: true
        },
        {
            label: 'Carat',
            key: 'carat',
            sortable: true
        },
        {
            label: 'Shape',
            key: 'shape',
            sortable: true
        },
        {
            label: 'Size',
            key: 'size',
            sortable: true
        },
        {
            label: 'Color',
            key: 'color',
            sortable: true
        },
        {
            label: 'Clarity',
            key: 'clarity',
            sortable: true
        },
        {
            label: 'Polish',
            key: 'polish',
            sortable: true
        },
        {
            label: 'Date',
            key: 'createdAt',
            type: 'custom',
            render: ({ createdAt }) => {
                return <span className="text-[14px] font-medium text-[#0A112F]">{getDate(createdAt)} {getTime(createdAt)}</span>
            },
            sortable: true
        },
        {
            label: 'Status',
            key: 'status',
            type: 'custom',
            render: ({ status }) => {
                let statusLabel = '';
                let statusColor = '';

                switch (status) {
                    case 'Available':
                        statusLabel = 'Available';
                        statusColor = 'bg-[#00C241]';
                        break;
                    case 'On Memo':
                        statusLabel = 'On Memo';
                        statusColor = 'bg-[#FFEB3B]';
                        break;
                    case 'Sold':
                        statusLabel = 'Sold';
                        statusColor = 'bg-[#FF0000]';
                        break;
                    default:
                        statusLabel = 'Unknown';
                        statusColor = 'bg-[#D5D7DA]';
                }
                return <div className="flex items-center gap-[8px] border border-[#D5D7DA] rounded-[6px] px-[10px] py-[5px] max-w-[110px]">
                    <span className={`block w-[10px] h-[10px] rounded-full ${statusColor}`}></span>
                    <span className="text-[14px] font-medium text-[#0A112F]">{statusLabel}</span>
                </div>
            },
            sortable: true
        },
        {
            label: '',
            key: 'actions',
            type: 'action',
            render: (item) => {
                return <td className="tbl-action">
                    <div className="flex items-center justify-end gap-[10px]">
                        <button onClick={() => console.log('view', item)}>
                            <img src={button} alt="View" />
                        </button>
                        <button onClick={() => console.log('delete', item)}>
                            <img src={button1} alt="Delete" />
                        </button>
                        <button className="mr-[5px]" onClick={() => console.log('edit', item)}>
                            <img src={button2} alt="Edit" />
                        </button>
                    </div>
                </td>
            }
        },
    ];

    const handleSearch = (query) => {
        setSearchQuery(query);
        // fetchStocks(1, query);
    }

    const handleSort = (key) => {
        // const direction = sortConfig.key === key && sortConfig.direction === 'Asc' ? 'Desc' : 'Asc';
        // setSortConfig({ key, direction });
        // fetchStocks(1, searchQuery, key, direction);
    };

    const handleFilter = (data) => {
        console.log({ ...data, range })
        setIsOpen(q => !q)
    }

    if (loading) return <Loader />

    return (
        <div className="w-full p-[20px] max-w-[100rem] mx-auto">
            <div className="w-full flex justify-between items-center mb-[24px]">
                <h6 className="text-[16px]">Overview</h6>
                <div className="flex flex-row gap-[20px] w-[25%]">
                    <button
                        className="bg-[#1E1E1E] text-white rounded-md flex flex-row px-[15px] py-[10px] gap-[10px] justify-center items-center w-full"
                        onClick={() => console.log('import')}
                    >
                        <img src={importIcon} alt="Import Excel" className="h-6 w-6" />
                        <p>Import Excel</p>
                    </button>
                    <button
                        className="bg-[#1E1E1E] text-white rounded-md flex flex-row  px-[15px] py-[10px] gap-[10px] justify-center items-center w-full"
                        onClick={() => console.log('export')}
                    >
                        <img src={exportIcon} alt="Import Excel" className="h-6 w-6" />
                        <p>Export Excel</p>
                    </button>
                </div>
            </div>
            <Search
                placeholder="Search by: diamond ID, diamond name, etc..."
                searchQuery={searchQuery}
                onSearch={handleSearch}
                addBtn={{
                    title: '+ Add New',
                    onClick: () => navigate('/payment/add')
                }}
                handleFilterClick={() => setIsOpen(q => !q)}
            />
            {isOpen ? <FilterPopup range={range} setRange={setRange} onSubmit={handleFilter} /> : <></>}
            <div className="my-[30px] stock-table">
                {stockData?.length === 0 ? (
                    <NoDataFound message="Oops! No stocks found." />
                ) : (
                    <Table
                        columns={columns.map(column => ({
                            ...column,
                            label: (
                                <div
                                    className="flex items-center cursor-pointer gap-[5px]"
                                    onClick={() => column.sortable && handleSort(column.key)}
                                >
                                    {column.label}
                                    {column.sortable && sortConfig.key === column.key && (
                                        <img src={sortConfig.direction === 'Asc' ? arrowUp : arrowDown} alt='sort-direction' class="w-[15px] h-[15px]" />
                                    )}
                                </div>
                            ),
                        }))}
                        data={stockData}
                        tableClass="stock-table"
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>

            {/* {selectedItem && selectedItem.action === 'view' && <DetailPopup item={selectedItem.item} onClose={handleClosePopup} />}
            {selectedItem && selectedItem.action === 'delete' && (<DeletePopup item={selectedItem.item} onClose={handleClosePopup} onDelete={() => deleteStock(selectedItem.action, selectedItem.item)} inlineKeys={["diamondId", "diamondName"]} />)}
            {selectedItem && selectedItem.action === 'edit' && <StockForm data={selectedItem} />}
            {selectedItem && selectedItem.action === 'import' && <ImportPopup onClose={handleClosePopup} onUpload={handleImportExcel} />}
            {showSkippedPopup && <SkipDataPopup onClose={handleClosePopup} data={skippedStocks} />} */}
        </div>
    )
}

export default Payment