import React from 'react';
import button1 from 'assets/images/button-1.svg';
import Table from 'components/table';
import { useNavigate } from 'react-router-dom';

const customer = [
    {
        customerName: 'John Doe',
        companyName: 'ABC Company',
        address: '123 Main St, Anytown, USA',
        contactNumber: '1234567890',
        email: 'john.doe@example.com'
    },
    {
        customerName: 'Jane Smith',
        companyName: 'XYZ Company',
        address: '456 Elm St, Anytown, USA',
        contactNumber: '9876543210',
        email: 'jane.smith@example.com'
    },
    {
        customerName: 'Bob Johnson',
        companyName: 'PQR Company',
        address: '789 Oak St, Anytown, USA',
        contactNumber: '5555555555',
        email: 'bob.johnson@example.com'
    },
    {
        customerName: 'Alice Smith',
        companyName: 'CDE Company',
        address: '321 Maple St, Anytown, USA',
        contactNumber: '1111111111',
        email: 'alice.smith@example.com'
    }
]

const Customer = () => {

    const navigate = useNavigate();

    const columns = [
        {
            label: '',
            key: 'diamondId',
            isCheckbox: true,
            type: 'checkbox'
        },
        {
            label: 'Customer Name',
            key: 'customerName'
        },
        {
            label: 'Company Name',
            key: 'companyName'
        },
        {
            label: 'Address',
            key: 'address'
        },
        {
            label: 'Contact Number',
            key: 'contactNumber'
        },
        {
            label: 'Email',
            key: 'email'
        },
        {
            label: '',
            key: 'actions',
            type: 'action',
            render: () => {
                return <td className="tbl-action">
                    <div className="flex items-center justify-end gap-[10px] pr-[15px]">
                        <button>
                            <img src={button1} alt="Delete" />
                        </button>
                    </div>
                </td>
            }
        },
    ];

    return (
        <div className="w-full p-[20px] max-w-[100rem] mx-auto">
            <div className='w-full block md:flex items-center justify-between gap-[10px]'>
                <div className='w-max h-[78px] flex items-center justify-center border border-[#E4E5E8] gap-[10px] px-[13px] mb-[10px] md:mb-0 rounded-[10px]'>
                    <button type='button' className='w-[183px] h-[52px] bg-[#1B1B1B] text-white'>Manage Customer</button>
                    <button type='button' className='w-[183px] h-[52px] bg-[#EEEEEE]'>Manage Vendor</button>
                </div>
                <div className='w-[403px] md:w-[227px] h-[78px] rounded-[10px]mb-[10px] md:mb-0'>
                    <button type='button' className='w-full h-full bg-[#1B1B1B] text-white rounded-[10px]' onClick={() => navigate('/customer/add')}>+Add New</button>
                </div>
            </div>

            <div className="my-[30px] stock-table">
                <Table
                    columns={columns}
                    data={customer}
                    tableClass="stock-table"
                />
            </div>
        </div>
    )
}

export default Customer