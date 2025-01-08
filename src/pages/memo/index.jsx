import React from 'react'
import { useNavigate } from 'react-router-dom';
import { getDate } from 'utils/dateFormat';
import { getCurrency } from 'utils';
import button1 from 'assets/images/button-1.svg';
import button2 from 'assets/images/button-2.svg';
import Table from 'components/table';


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
        },
        {
            label: 'Due Date',
            key: 'createdAt',
            type: 'custom',
            render: ({ createdAt }) => {
                return <span className="text-[14px] font-medium text-[#0A112F]">{getDate(createdAt)}</span>
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
                return <div className="flex items-center gap-[10px] border border-[#D5D7DA] rounded-[4px] px-[10px] py-[5px]">
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
                <div className='w-[403px] md:w-[227px] h-[78px] rounded-[10px]mb-[10px] md:mb-0'>
                    <button type='button' className='w-full h-full bg-[#1B1B1B] text-white rounded-[10px]' onClick={() => navigate('/create-memo')}>+Add New</button>
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
}

export default Memo