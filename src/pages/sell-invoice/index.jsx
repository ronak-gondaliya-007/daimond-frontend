import React, { useEffect, useRef, useState } from 'react';
import Search from 'components/search';
import Table from 'components/table';
import button1 from 'assets/images/button-1.svg';
import button2 from 'assets/images/button-2.svg';
import { useNavigate } from 'react-router-dom';
import { getDate, getTime } from 'utils/dateFormat';
import { getCurrency } from 'utils';
import { toast } from 'react-toastify';
import axiosClient from 'api/AxiosClient';
import NoDataFound from 'components/no-data-found';
import { arrowDown, arrowUp, button, downloadIcon } from 'assets/utils/images';
import DeletePopup from 'components/popup/Delete';
import SellInvoiceAdd from './Form';
import Loader from 'components/loader';

const SellInvoice = () => {
    const navigate = useNavigate();

    const [sellInvoiceData, setSellInvoiceData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: 'dueDate', direction: 'Asc' });

    const isFetchingRef = useRef(false);

    useEffect(() => {
        if (isFetchingRef.current) return;
        fetchSellInvoice(currentPage, searchQuery, sortConfig.key, sortConfig.direction);
    }, [currentPage, sortConfig]);

    const handleSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'Asc' ? 'Desc' : 'Asc';
        setSortConfig({ key, direction });
        fetchSellInvoice(1, key, direction);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        fetchSellInvoice(1, query);
    };

    const fetchSellInvoice = async (page = 1, searchQuery = "", sortKey = "dueDate", sortDirection = "Asc") => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
        try {
            const response = await axiosClient.post('/invoice/all-invoice',
                {
                    page: page,
                    limit: 5,
                    search: searchQuery,
                    sortingKey: sortKey,
                    sortingOrder: sortDirection
                },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                toast.success(response?.data?.message);
                setSellInvoiceData(response.data.data.docs);
                setTotalPages(response.data.data.totalPages);
                setCurrentPage(page);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    };

    const onStatusChange = (action, sellInvoiceId) => {
        if (action === 'delete') {
            setSellInvoiceData((prevData) => prevData.filter(item => item._id !== sellInvoiceId));
        }
    };

    const handleDeleteInvoice = async (action, item) => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
        try {
            const response = await axiosClient.post(`/invoice/delete`,
                { sellInvoiceId: item._id },
                { headers: { 'Content-Type': 'application/json' } });

            if (response.status === 200) {
                toast.success(response?.data?.message);
                setSelectedItem({ action, item: response.data.data });
                handleClosePopup();
                onStatusChange('delete', item._id);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    }

    const handleClosePopup = () => {
        setSelectedItem(null);
    };

    const handleActionClick = async (action, item) => {
        switch (action) {
            case 'view':
                navigate(`/sell-invoice/preview/${item._id}`);
                break;
            case 'edit':
                navigate(`/sell-invoice/edit/${item._id}`);
                break;
            case 'delete':
                setSelectedItem({ action, item });
                break;
            case 'import':
                break;
            case 'export':
                break;
            default:
                break;
        }
    };

    const columns = [
        {
            label: '',
            key: 'diamondId',
            isCheckbox: true,
            type: 'checkbox'
        },
        {
            label: 'Invoice Number',
            key: 'invoiceNumber',
            sortable: true,
        },
        {
            label: 'Customer Name',
            key: 'custmerName',
            type: 'custom',
            render: ({ customer }) => {
                return <span className="text-[14px] font-medium text-[#0A112F]">{customer.name}</span>
            },
            sortable: true,
        },
        {
            label: 'Invoice Date',
            key: 'invoiceDate',
            type: 'custom',
            render: ({ createdAt }) => {
                return <span className="text-[14px] font-medium text-[#0A112F]">{getDate(createdAt)} {getTime(createdAt)}</span>
            },
            sortable: true,
        },
        {
            label: 'Due Date',
            key: 'dueDate',
            type: 'custom',
            render: ({ dueDate }) => {
                return <span className="text-[14px] font-medium text-[#0A112F]">{getDate(dueDate)}</span>
            },
            sortable: true,
        },
        {
            label: 'Ageing',
            key: 'ageing',
            type: 'custom',
            render: ({ ageing }) => {
                return <span className={`text-[14px] font-medium text-red-600`}>{!!ageing ? ageing : '-'}</span>
            },
            sortable: true,
        },
        {
            label: 'Number of Items',
            key: 'numberOfItems',
            sortable: true,
        },
        {
            label: 'Total Value',
            key: 'totalValue',
            type: 'custom',
            render: ({ totalValue }) => {
                return <span className="text-[14px] font-medium text-[#0A112F]">{getCurrency(totalValue)}</span>
            },
            sortable: true,
        },
        {
            label: 'Status',
            key: 'status',
            type: 'custom',
            render: ({ status }) => {
                let statusLabel = '';
                let statusColor = '';

                switch (status) {
                    case 'Paid':
                        statusLabel = 'Paid';
                        statusColor = 'bg-[#00C241]';
                        break;
                    case 'Pending':
                        statusLabel = 'Pending';
                        statusColor = 'bg-[#FFEB3B]';
                        break;
                    case 'Due Pass':
                        statusLabel = 'Due Pass';
                        statusColor = 'bg-[#FF0000]';
                        break;
                    default:
                        statusLabel = 'Unknown';
                        statusColor = 'bg-[#D5D7DA]';
                }
                return <div className="flex items-center gap-[10px] border border-[#D5D7DA] rounded-[4px] px-[10px] py-[5px] max-w-[100px]">
                    <span className={`block w-[10px] h-[10px] rounded-full ${statusColor}`}></span>
                    <span className="text-[14px] font-medium text-[#0A112F]">{statusLabel}</span>
                </div>
            },
            sortable: true,
        },
        {
            label: '',
            key: 'actions',
            type: 'action',
            render: (item) => {
                return <td className="tbl-action">
                    <div className="flex items-center justify-end gap-[10px]">
                        <button>
                            <img src={downloadIcon} alt="Download" />
                        </button>
                        <button>
                            <img src={button} alt="View" onClick={() => handleActionClick('view', item)} />
                        </button>
                        <button>
                            <img src={button1} alt="Delete" onClick={() => handleActionClick('delete', { ...item, customerName: item.customer.name })} />
                        </button>
                        <button className="mr-[5px]" onClick={() => handleActionClick('edit', item)}>
                            <img src={button2} alt="Edit" />
                        </button>
                    </div>
                </td>
            }
        },
    ];

    return (
        loading ?
            <Loader />
            : <div className="w-full p-[20px] max-w-[100rem] mx-auto">
                <Search
                    placeholder="Search by..."
                    searchQuery={searchQuery}
                    onSearch={handleSearch}
                    addBtn={{
                        title: '+ Add Invoice',
                        onClick: () => { navigate('/sell-invoice/add') }
                    }}
                />
                <div className="my-[30px] stock-table">
                    {sellInvoiceData?.length === 0 ? (
                        <NoDataFound message="Oops! No sell-invoices found." />
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
                            data={sellInvoiceData}
                            tableClass="stock-table"
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </div>

                {selectedItem && selectedItem.action === 'delete' && (<DeletePopup item={selectedItem.item} onClose={handleClosePopup} onDelete={() => handleDeleteInvoice(selectedItem.action, selectedItem.item)} inlineKeys={['invoiceNumber', 'customerName']} />)}
            </div>
    )
}

export default SellInvoice