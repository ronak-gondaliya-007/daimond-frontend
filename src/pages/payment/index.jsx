import { arrowDown, arrowUp, button, button1, button2, diamondIcon, exportIcon, importIcon } from 'assets/utils/images';
import Loader from 'components/loader';
import NoDataFound from 'components/no-data-found';
import Search from 'components/search';
import Table from 'components/table';
import { FilterPopup } from 'pages/Stock';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getDate, getTime } from 'utils/dateFormat';
import Select from 'react-select';

const defaultValue = {
    diamondId: 111,
    refNo: "",
    carat: "",
    shape: "",
    createdAt: "",
    status: "Unknown"
}

const Payment = () => {
    const navigate = useNavigate();

    const [stockData, setStockData] = useState([defaultValue]);
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
    const [rowData, setRowData] = useState([]);

    const isFetchingRef = useRef(false);


    const columns = [
        {
            label: '',
            key: 'diamondId',
            isCheckbox: true,
            type: 'checkbox'
        },
        {
            label: 'Ref No',
            key: 'refNo',
            sortable: true,
            type: 'render',
            render: ({ refNo }) => {
                return <td className='!py-0'>
                    <Select
                        value={rowData?.refNo}
                        onChange={(e) => handleChange(e, "refNo")}
                        className={`custom-select`}
                        options={[
                            { value: "apple", label: "Apple", _id: 1 },
                            { value: "banana", label: "Banana", _id: 2 },
                            { value: "cherry", label: "Cherry", _id: 3 },
                        ]}
                        placeholder={"Select refNo"}
                        isSearchable={true}
                    />
                    {/* <input type="text" className='h-[60px] hover:border focus:border border-1 border-[#408dfb] rounded-[8px] text-[22px] px-[9px] outline-none' /> */}
                </td>
            }
        },
        {
            label: 'Carat',
            key: 'carat',
            type: 'render',
            render: ({ carat }) => (
                <td className='!py-0'>
                    <input
                        type="text"
                        name='carat'
                        className='h-[60px] hover:border focus:border border-1 border-[#408dfb] rounded-[8px] text-[22px] px-[9px] outline-none'
                        value={rowData?.carat ?? "0.0"}
                        onChange={(e) => handleChange(e)}
                    />
                </td>
            )
        },
        {
            label: 'Shape',
            key: 'shape',
            type: 'render',
            render: ({ shape }) => (
                <td className='!py-0'>
                    <input
                        type="text"
                        name='shape'
                        className='h-[60px] hover:border focus:border border-1 border-[#408dfb] rounded-[8px] text-[22px] px-[9px] outline-none'
                        value={rowData?.shape ?? "0.0"}
                        onChange={(e) => handleChange(e)}
                    />
                </td>
            )
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

    const handleChange = (event, key) => {
        if (key === "refNo") {
            setRowData({ ...rowData, refNo: event })
        } else {
            const { value, name } = event.target;
            setRowData({ ...rowData, [name]: value })
        }
    }

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
                    onClick: () => navigate('/purchase/add')
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
                        tableClass="stock-table purchase-table"
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