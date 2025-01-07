import React from 'react';
import Search from 'components/search';
import Table from 'components/table';
import button1 from 'assets/images/button-1.svg';
import button2 from 'assets/images/button-2.svg';
import { useNavigate } from 'react-router-dom';
import { getDate } from 'utils/dateFormat';
import { getCurrency } from 'utils';

const sellInvoiceData = [
    {
        invoiceNumber: 'INV-001',
        companyName: 'ABC Company',
        invoiceDate: "M-101",
        ageing: "6",
        numberOfItems: "ABCD12345",
        totalPrice: 1546,
        status: "pending",
        createdAt: "2025-01-07T17:58:05.730Z",
    },
    {
        invoiceNumber: 'INV-002',
        companyName: 'XYZ Company',
        invoiceDate: "M-101",
        // ageing: "6",
        numberOfItems: "ABCD12345",
        totalPrice: 1546,
        status: "pending",
        createdAt: "2025-01-07T17:58:05.730Z",
    },
    {
        invoiceNumber: 'INV-003',
        companyName: 'PQR Company',
        invoiceDate: "M-101",
        ageing: "10",
        numberOfItems: "ABCD12345",
        totalPrice: 1546,
        status: "pending",
        createdAt: "2025-01-07T17:58:05.730Z",
    }
]

const SellInvoice = () => {
    const navigate = useNavigate();

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
        },
        {
            label: 'Company Name',
            key: 'companyName',
        },
        {
            label: 'Invoice Date',
            key: 'invoiceDate',
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
            label: 'Ageing',
            key: 'ageing',
            type: 'custom',
            render: ({ ageing }) => {
                return <span className={`text-[14px] font-medium text-red-600`}>{!!ageing ? ageing : '-'}</span>
            }
        },
        {
            label: 'Number of Items',
            key: 'numberOfItems',
        },
        {
            label: 'Total Value',
            key: 'totalPrice',
            type: 'custom',
            render: ({ totalPrice }) => {
                return <span className="text-[14px] font-medium text-[#0A112F]">{getCurrency(totalPrice)}</span>
            }
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
            <Search
                placeholder="Search by..."
                addBtn={{
                    title: 'Add Invoice',
                    onClick: () => { }
                }}
            />
            <div className="my-[30px] stock-table">
                <Table
                    columns={columns}
                    data={sellInvoiceData}
                    tableClass="stock-table"
                />
            </div>
        </div>
    )
}

export default SellInvoice