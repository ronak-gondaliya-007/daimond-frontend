import React from 'react';
import slidersIcon from 'assets/images/sliders.svg';
import { arrowRight, downArrow, upArrow } from 'assets/utils/images';
import Table from 'components/table';
import { getDate } from 'utils/dateFormat';

const salesReport = [
    {
        customerName: 'John Doe',
        createAt: '2025-01-07T17:58:05.730Z',
        invoiceNumber: 'INV-001',
        totalPrice: '1546',
        paymentStatus: 'CASH123@gmail.com'
    },
    {
        customerName: 'Jane Smith',
        createAt: '2025-01-07T17:58:05.730Z',
        invoiceNumber: 'INV-002',
        totalPrice: '1546',
        paymentStatus: 'CASH123@gmail.com'
    },
    {
        customerName: 'Bob Johnson',
        createAt: '2025-01-07T17:58:05.730Z',
        invoiceNumber: 'INV-003',
        totalPrice: '1546',
        paymentStatus: 'CASH123@gmail.com'
    },
    {
        customerName: 'Alice Smith',
        createAt: '2025-01-07T17:58:05.730Z',
        invoiceNumber: 'INV-004',
        totalPrice: '1546',
        paymentStatus: 'CASH123@gmail.com'
    }
]

const columns = [
    {
        label: 'Customer name',
        key: 'customerName',
    },
    {
        label: 'Date',
        key: 'createAt',
        type: 'custom',
        render: ({ createAt }) => {
            return <span className="text-[14px] font-medium text-[#0A112F]">{getDate(createAt)}</span>
        }
    },
    {
        label: 'Invoice ID',
        key: 'invoiceNumber',
    },
    {
        label: 'Total Amount',
        key: 'totalPrice',
    },
    {
        label: 'Payment Status',
        key: 'paymentStatus',
    },
];


const ReportsAnalytics = () => {

    const stats = [
        { title: 'Total Sales', value: 72656, change: '+113.01%', isUp: true },
        { title: 'Total Purchases:', value: 3671, change: '-0.03%', isUp: false },
        { title: 'Outstanding Payments', value: 156, change: '+15.03%', isUp: true },
        { title: 'Stock Value', value: 2318, change: '+6.08%', isUp: true },
        { title: 'Expenses', value: 2318, change: '+6.08%', isUp: true }
    ];

    return (
        <div className="w-full p-[20px]">
            <div className='flex items-center justify-end gap-[12px]'>
                <button className='w-[151px] h-[48px] bg-[#F1F2F4] rounded-[4px] text-[14px] font-medium text-[#18191C] flex items-center justify-center gap-[12px]'>
                    <img src={slidersIcon} alt="Filters" className='w-[24px] h-[24px] mr-[2px]' />
                    <p>Filters</p>
                </button>
                <button className='w-[151px] h-[48px] bg-[#342C2C] rounded-[4px] text-[14px] font-medium text-white flex items-center justify-center gap-[12px]'>
                    <p>Export All</p>
                </button>
            </div>

            <div className='block md:flex mt-[24px] gap-[14px] md:flex-wrap'>
                {
                    stats.map(({ title, value, change, isUp }, index) => (
                        <div
                            key={index}
                            className={`
                                w-full md:w-[calc(50%-8px)] md:flex-1 2xl:w-[calc(50%-16px)] 2xl:flex-1
                                h-[112px] rounded-[16px] bg-[#EDEEFC] even:bg-[#E6F1FD] p-[18px] md:p-[24px]
                                mb-[14px] 2xl:mb-0 2xl:mr-[8px]
                            `}
                        >
                            <p className='text-[14px] font-medium text-[#000]'>{title}</p>
                            <div className='flex items-center justify-between'>
                                <span className='text-[24px] font-medium text-[#000]'>{value.toLocaleString()}</span>
                                <div className='flex items-center gap-[4px] ml-[8px]'>
                                    <span>{change}</span>
                                    <img src={isUp ? upArrow : downArrow} alt={isUp ? 'up arrow' : 'down arrow'} />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className='w-full h-[400px] mt-[24px] border border-[#E4E4E7] rounded-[12px] mb-[24px]'>
                <h3 className='p-4'>Chart</h3>
            </div>

            <div className='flex items-center justify-between mb-[24px]'>
                <p className='text-[18px] font-semibold'>Sales Report</p>
                <button className="w-[125px] h-[36px] border border-[#D5D7DA] rounded-[8px] text-[14px] flex items-center justify-center">
                    Export
                    <img src={arrowRight} alt='arrow right' />
                </button>
            </div>

            <div className="my-[30px] stock-table">
                <Table
                    columns={columns}
                    data={salesReport}
                    tableClass="stock-table"
                />
            </div>
        </div>
    )
}

export default ReportsAnalytics