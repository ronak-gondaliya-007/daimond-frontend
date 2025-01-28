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

const SellInvoice = () => {
    const navigate = useNavigate();

    const [sellInvoiceData, setSellInvoiceData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'Desc' });

    const isFetchingRef = useRef(false);

    useEffect(() => {
        if (isFetchingRef.current) return;
        fetchSellInvoice(currentPage, sortConfig.key, sortConfig.direction);
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

    const fetchSellInvoice = async (page = 1, searchQuery = "", sortKey = "createdAt", sortDirection = "Asc") => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
        try {
            const response = await axiosClient.post('/invoice/all-invoice',
                {
                    search: searchQuery,
                    page: page,
                    limit: 5,
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

    const onStatusChange = (action, memoId) => {
        if (action === 'delete') {
            setMemoData((prevData) => prevData.filter(item => item._id !== memoId));
        }
    };

    const handleDeleteMemo = async (action, item) => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
        try {
            const response = await axiosClient.post(`/memo/delete`,
                { memoId: item._id },
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
                break;
            case 'edit':
                navigate(`/invoice/edit/${item._id}`);
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
            sortable: true,
        },
        {
            label: 'Invoice Date',
            key: 'invoiceDate',
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
                return <span className="text-[14px] font-medium text-[#0A112F]">{getDate(dueDate)} {getTime(dueDate)}</span>
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
            key: 'totalPrice',
            type: 'custom',
            render: ({ totalPrice }) => {
                return <span className="text-[14px] font-medium text-[#0A112F]">{getCurrency(totalPrice)}</span>
            },
            sortable: true,
        },
        {
            label: 'Status',
            key: 'status',
            type: 'custom',
            render: ({ status }) => {
                return <div className="flex items-center gap-[10px] border border-[#D5D7DA] rounded-[4px] px-[10px] py-[5px]">
                    <span className={`block w-[10px] h-[10px] rounded-full ${status !== 'pending' ? 'bg-[#00C241]' : 'bg-[#FF9D00]'}`}></span>
                    <span className="text-[14px] font-medium text-[#0A112F]">{status}</span>
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
                            <img src={button} alt="View" />
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
        <div className="w-full p-[20px] max-w-[100rem] mx-auto">
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

            {selectedItem && selectedItem.action === 'delete' && (<DeletePopup item={selectedItem.item} onClose={handleClosePopup} onDelete={() => handleDeleteMemo(selectedItem.action, selectedItem.item)} inlineKeys={['memoNumber', 'customerName']} />)}
        </div>
    )
}

export default SellInvoice