import React from 'react'
import { useNavigate } from 'react-router-dom';

import axiosClient from "api/AxiosClient";

import Table from 'components/table';

import { button1, button2 } from "assets/utils/images";

import { getDate, getTime } from 'utils/dateFormat';
import { getCurrency } from 'utils';

const MemoConversion = [
    {
        memoNumber: "123456",
        customerName: "John Doe",
        memoDate: "2025-01-08T16:04:57.316Z",
        numberOfItems: "10",
        totalAmount: "1000",
        status: "pending",
        createdAt: "2025-01-08T16:04:57.316Z",
        updatedAt: "2025-01-08T16:04:57.316Z",
    },
    {
        memoNumber: "123457",
        customerName: "Jane Doe",
        memoDate: "2025-01-08T16:04:57.316Z",
        numberOfItems: "10",
        totalAmount: "1000",
        status: "duePass",
        createdAt: "2025-01-08T16:04:57.316Z",
        updatedAt: "2025-01-08T16:04:57.316Z",
    },
    {
        memoNumber: "123458",
        customerName: "Jane Doe",
        memoDate: "2025-01-08T16:04:57.316Z",
        numberOfItems: "10",
        totalAmount: "1000",
        status: "duePass",
        createdAt: "2025-01-08T16:04:57.316Z",
        updatedAt: "2025-01-08T16:04:57.316Z",
    },
    {
        memoNumber: "123459",
        customerName: "Jane Doe",
        memoDate: "2025-01-08T16:04:57.316Z",
        numberOfItems: "10",
        totalAmount: "1000",
        status: "duePass",
        createdAt: "2025-01-08T16:04:57.316Z",
        updatedAt: "2025-01-08T16:04:57.316Z",
    },
]

const Memo = () => {
    const navigate = useNavigate();

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
        },
        {
            label: 'Customer Name',
            key: 'customerName',
        },
        {
            label: 'Memo Date',
            key: 'memoDate',
            type: 'custom',
            render: ({ createdAt }) => {
                return <span className="text-[14px] font-medium text-[#0A112F]">{getDate(createdAt)} {getTime(createdAt)}</span>
            }
        },
        {
            label: 'Due Date',
            key: 'createdAt',
            type: 'custom',
            render: ({ createdAt }) => {
                return <span className="text-[14px] font-medium text-[#0A112F]">{getDate(createdAt)} {getTime(createdAt)}</span>
            }
        },
        {
            label: 'Number of Items',
            key: 'numberOfItems',
        },
        {
            label: 'Total Value',
            key: 'totalAmount',
            type: 'custom',
            render: ({ totalAmount }) => {
                return <span className="text-[14px] font-medium text-[#0A112F]">{getCurrency(totalAmount)}</span>
            }
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
            }
        },
        {
            label: '',
            key: 'actions',
            type: 'action',
            render: (item) => {
                return <td className="tbl-action">
                    <div className="flex items-center justify-end gap-[10px]">
                        <button>
                            <img src={button1} alt="Delete" />
                        </button>
                        <button className="mr-[5px]" onClick={() => navigate(`/sell-invoice/${item.invoiceNumber}`)}>
                            <img src={button2} alt="Edit" />
                        </button>
                    </div>
                </td>
            }
        },
    ];

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
                        + Add New
                    </button>
                </div>
            </div>

            <div className="my-[30px] stock-table">
                <Table
                    columns={columns}
                    data={MemoConversion}
                    tableClass="stock-table"
                />
            </div>
        </div>
    )
};

export default Memo