import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import axiosClient from "api/AxiosClient";

import Table from "components/table";
import DeletePopup from "components/popup/Delete";
import NoDataFound from "components/no-data-found";

import { getDate, getTime } from "utils/dateFormat";

import { button, button1, button2, arrowDown, arrowUp } from "assets/utils/images";
import DetailPopup from "./Detail";
import Loader from "components/loader";

const Expense = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [expenseData, setExpenseData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItem, setSelectedItem] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'Desc' });

    const isFetchingRef = useRef(false);

    useEffect(() => {
        if (isFetchingRef.current) return;
        fetchExpenseList(currentPage, sortConfig.key, sortConfig.direction)
    }, [currentPage, sortConfig]);

    const handleSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'Asc' ? 'Desc' : 'Asc';
        setSortConfig({ key, direction });
        fetchMemos(1, key, direction);
    };

    const handleClosePopup = () => {
        setSelectedItem(null);
    };

    const fetchExpenseList = async (page = 1, sortKey = "createdAt", sortDirection = "Desc") => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;
        setLoading(true);

        try {
            const response = await axiosClient.post('/expense/all',
                {
                    page: page,
                    limit: 5,
                    sortingKey: sortKey,
                    sortingOrder: sortDirection
                },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                toast.success(response?.data?.message);
                setExpenseData(response.data.data.docs);
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

    const fetchExpenseDetail = async (action, item) => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
        try {
            const response = await axiosClient.post(`/expense/detail`,
                { expenseId: item._id },
                { headers: { 'Content-Type': 'application/json' } });

            if (response.status === 200) {
                toast.success(response?.data?.message);
                setSelectedItem({ action, item: response.data.data });
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    };

    const onStatusChange = (action, expenseId) => {
        if (action === 'delete') {
            setExpenseData((prevData) => prevData.filter(item => item._id !== expenseId));
        }
    };

    const handleDeleteExpense = async (action, item) => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
        try {
            const response = await axiosClient.post(`/expense/delete`,
                { expenseId: item._id },
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
    };

    const handleActionClick = async (action, item) => {
        switch (action) {
            case 'view':
                fetchExpenseDetail(action, item);
                break;
            case 'edit':
                navigate(`/expense/edit/${item._id}`);
                break;
            case 'delete':
                setSelectedItem({ action, item });
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
            label: 'Category',
            key: 'category',
            type: 'custom',
            render: (item) => {
                return <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{item.category}</span>
            },
            sortable: true
        },
        {
            label: 'Invoice Number',
            key: 'invoiceNumber',
            sortable: true
        },
        {
            label: 'Expense Amount',
            key: 'amount',
            sortable: true
        },
        {
            label: 'Date Of Expense',
            key: 'expenseDate',
            type: 'custom',
            render: ({ expenseDate }) => {
                return <span className="text-[14px] font-medium text-[#0A112F]">{getDate(expenseDate)} {getTime(expenseDate)}</span>
            },
            sortable: true
        },
        {
            label: 'Created At',
            key: 'createdAt',
            type: 'custom',
            render: ({ createdAt }) => {
                return <span className="text-[14px] font-medium text-[#0A112F]">{getDate(createdAt)} {getTime(createdAt)}</span>
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
                        <button onClick={() => handleActionClick('view', item)}>
                            <img src={button} alt="View" />
                        </button>
                        <button onClick={() => handleActionClick('delete', item)}>
                            <img src={button1} alt="Delete" />
                        </button>
                        <button className="mr-[5px]" onClick={() => handleActionClick('edit', item)}>
                            <img src={button2} alt="Edit" />
                        </button>
                    </div>
                </td>
            }
        },
    ];

    if (loading) {
        <Loader />
    }

    return (
        <div className="w-full p-[20px] max-w-[100rem] mx-auto">
            <div className='w-full block md:flex items-center justify-between gap-[10px]'>
                <div className='w-max h-[78px] flex items-center justify-center px-[13px] mb-[10px] md:mb-0 rounded-[10px]'>
                    <h6 className="text-[16px]">Overview</h6>
                </div>
                <div className='w-[200px] h-full'>
                    <button
                        type='button'
                        className='w-full h-full py-[17.5px] md-2:py-[15.5px] bg-[#1E1E1E] text-white rounded-[10px]'
                        onClick={() => navigate('/expense/add')}>
                        + Add Expense
                    </button>
                </div>
            </div>
            <div className="my-[30px] stock-table">
                {expenseData?.length === 0 ? (
                    <NoDataFound message="Oops! No expenses found." />
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
                        data={expenseData}
                        tableClass="stock-table"
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>

            {selectedItem && selectedItem.action === 'view' && <DetailPopup item={selectedItem.item} onClose={handleClosePopup} />}
            {selectedItem && selectedItem.action === 'delete' && (
                <DeletePopup
                    item={selectedItem.item}
                    onClose={handleClosePopup}
                    onDelete={() => handleDeleteExpense(selectedItem.action, selectedItem.item)}
                    inlineKeys={["category", "invoiceNumber"]}
                    isAmount={true}
                    amountKey={'Expense Amount'}
                />
            )}
        </div>
    );
};

const Row = ({ row, getComponent }) => (
    <div key={row.id} className='w-full flex gap-[10px]'>
        {
            row.childrens.map((field) => getComponent(field))
        }
    </div>
)

export default Expense;