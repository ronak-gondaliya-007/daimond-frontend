import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import axiosClient from "api/AxiosClient";

import Table from 'components/table';
import { PDFDownloadLink, PDFViewer, render } from "@react-pdf/renderer";

import { arrowDown, arrowUp, button, button1, button2, downloadIcon } from "assets/utils/images";

import { getDate, getTime } from 'utils/dateFormat';
import { getCurrency } from 'utils';
import Loader from 'components/loader';
import { toast } from 'react-toastify';
import DeletePopup from 'components/popup/Delete';
import NoDataFound from 'components/no-data-found';
import PDFDocument from './preview/PDFDocument';


const Memo = () => {
    const navigate = useNavigate();

    const [memoData, setMemoData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'Desc' });

    const isFetchingRef = useRef(false);

    useEffect(() => {
        if (isFetchingRef.current) return;
        fetchMemos(currentPage, sortConfig.key, sortConfig.direction);
    }, [currentPage, sortConfig]);

    const handleSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'Asc' ? 'Desc' : 'Asc';
        setSortConfig({ key, direction });
        fetchMemos(1, key, direction);
    };

    const fetchMemos = async (page = 1, searchQuery = "", sortKey = "createdAt", sortDirection = "Asc") => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
        try {
            const response = await axiosClient.post('/memo/all-memo',
                {
                    page: page,
                    limit: 5,
                    sortingKey: sortKey,
                    sortingOrder: sortDirection
                },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                // toast.success(response?.data?.message);
                setMemoData(response.data.data.docs);
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
                navigate(`/memo/edit/${item._id}`);
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
            label: 'Memo Number',
            key: 'memoNumber',
            sortable: true
        },
        {
            label: 'Customer Name',
            key: 'customerName',
            type: 'custom',
            render: ({ customer }) => {
                return <span className="text-[14px] font-medium text-[#0A112F]">{customer.name}</span>
            },
            sortable: true
        },
        {
            label: 'Memo Date',
            key: 'createdAt',
            type: 'custom',
            render: ({ createdAt }) => {
                return <span className="text-[14px] font-medium text-[#0A112F]">{getDate(createdAt)} {getTime(createdAt)}</span>
            },
            sortable: true
        },
        {
            label: 'Number of Items',
            key: 'numberOfItems',
            sortable: true
        },
        {
            label: 'Total Value',
            key: 'totalAmount',
            type: 'custom',
            render: ({ totalValue }) => {
                return <span className="text-[14px] font-medium text-[#0A112F]">{getCurrency(totalValue)}</span>
            },
            sortable: true
        },
        {
            label: 'Status',
            key: 'status',
            type: 'custom',
            render: ({ status }) => {
                return <div className="flex items-center gap-[10px] border border-[#D5D7DA] rounded-[6px] px-[10px] py-[5px] max-w-[100px]">
                    <span className={`block w-[10px] h-[10px] rounded-full ${status !== 'pending' ? 'bg-[#FF0000]' : 'bg-[#FF9D00]'}`}></span>
                    <span className="text-[14px] font-medium text-[#0A112F]">{status}</span>
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

    if (loading) {
        return <Loader />;
    }

    const memo = {
        memoNumber: 601,
        date: "11/20/2024",
        company: "NATURE DIAM INC",
        address: "20 West 47 Street, Suite 602, New York, NY 10036",
        email: "naturediaminc@gmail.com",
        phone: "+1 917 702 1701",
        items: [
            {
                refNo: "H5B251B",
                description: "1.5 Ct",
                pcs: 1,
                carats: "1.5 Ct",
                grade: "VVS1",
                pricePerCarat: "1,546",
                returnInCarats: "₹1,546",
                soldInCarats: "₹1,546",
                amount: "1,546",
                remarks: "VVS1",
            },
            {
                refNo: "H5B251B",
                description: "1.5 Ct",
                pcs: 1,
                carats: "1.5 Ct",
                grade: "S12",
                pricePerCarat: "₹1,546",
                returnInCarats: "₹1,546",
                soldInCarats: "₹1,546",
                amount: "₹1,546",
                remarks: "S12",
            },
            {
                refNo: "H5B251B",
                description: "1.5 Ct",
                pcs: 1,
                carats: "1.5 Ct",
                grade: "VVS1",
                pricePerCarat: "₹1,546",
                returnInCarats: "₹1,546",
                soldInCarats: "₹1,546",
                amount: "₹1,546",
                remarks: "VVS1",
            },
            {
                refNo: "H5B251B",
                description: "1.5 Ct",
                pcs: 1,
                carats: "1.5 Ct",
                grade: "VVS1",
                pricePerCarat: "₹1,546",
                returnInCarats: "₹1,546",
                soldInCarats: "₹1,546",
                amount: "₹1,546",
                remarks: "VVS1",
            },
            {
                refNo: "H5B251B",
                description: "1.5 Ct",
                pcs: 1,
                carats: "1.5 Ct",
                grade: "S12",
                pricePerCarat: "₹1,546",
                returnInCarats: "₹1,546",
                soldInCarats: "₹1,546",
                amount: "₹1,546",
                remarks: "S12",
            },
        ],
        totalCarats: "8.8 Ct",
        totalAmount: "₹15,55,500",
    };


    return (
        <div className="w-full p-[20px] max-w-[100rem] mx-auto">
            <div className='w-full block md:flex items-center justify-between gap-[10px]'>
                <div className='w-max h-[78px] flex items-center justify-center px-[13px] mb-[10px] md:mb-0 rounded-[10px]'>
                    <h2>Memo Conversion </h2>
                </div>
                <div className='w-[200px] h-full'>
                    <button
                        type='button'
                        className='w-full h-full py-[17.5px] md-2:py-[15.5px] bg-[#1E1E1E] text-white rounded-[10px]'
                        onClick={() => navigate('/memo/add')}>
                        + Create Memo
                    </button>
                </div>
            </div>

            {/* Only PDF download */}
            {/* <PDFDownloadLink document={<PDFDocument data={memo} />} fileName="memo.pdf">
                {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
            </PDFDownloadLink> */}

            {/* Only PDF view */}
            {/* <PDFViewer height={900} width={1440}>
                <PDFDocument data={memo} />
            </PDFViewer> */}

            <div className="my-[30px] stock-table">
                {memoData?.length === 0 ? (
                    <NoDataFound message="Oops! No memos found." />
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
                        data={memoData}
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
};

export default Memo