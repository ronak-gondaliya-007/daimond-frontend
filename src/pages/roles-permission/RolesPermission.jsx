import React from 'react'
import Search from 'components/search'
import Table from 'components/table';
import diamondIcon from 'assets/images/daimond.svg';
import { getDate } from 'utils/dateFormat';
import { useNavigate } from 'react-router-dom';

const usersData = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        profile: 'https://via.placeholder.com/150',
        password: '12345678',
        role: 'Admin',
        phone: '+91 9876543210',
        status: 'Active',
        createdAt: '2025-01-06T15:12:53.264Z',
        updatedAt: '2025-01-06T15:12:53.264Z',
    },
    {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        profile: 'https://via.placeholder.com/150',
        password: '12345678',
        role: 'User',
        phone: '+91 9876543210',
        status: 'Inactive',
        createdAt: '2025-02-06T15:12:53.264Z',
        updatedAt: '2025-02-06T15:12:53.264Z',
    },
    {
        id: 3,
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        profile: 'https://via.placeholder.com/150',
        password: '12345678',
        role: 'User',
        phone: '+91 9876543210',
        status: 'Active',
        createdAt: '2025-03-06T15:12:53.264Z',
        updatedAt: '2025-03-06T15:12:53.264Z',
    },
    {
        id: 4,
        firstName: 'Bob',
        lastName: 'Brown',
        email: 'bob.brown@example.com',
        profile: 'https://via.placeholder.com/150',
        password: '12345678',
        role: 'User',
        phone: '+91 9876543210',
        status: 'Inactive',
        createdAt: '2025-04-06T15:12:53.264Z',
        updatedAt: '2025-04-06T15:12:53.264Z',
    },
]

const RolesPermission = () => {
    const navigate = useNavigate();

    const columns = [
        {
            label: '',
            key: 'diamondId',
            isCheckbox: true,
            type: 'checkbox'
        },
        {
            label: 'Member name and Id',
            key: 'firstName',
            type: 'custom',
            render: (item) => {
                return <div className="flex items-center gap-[10px]">
                    <img src={diamondIcon} alt="Diamond" />
                    <div className="flex flex-col items-start">
                        <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{item.firstName} {item.lastName}</span>
                        <span className="text-[12px] font-medium text-[#0A112F]">{item.email}</span>
                    </div>
                </div>
            }
        },
        {
            label: 'Dart',
            key: 'createdAt',
            type: 'custom',
            render: ({ createdAt }) => {
                return <span className="text-[14px] font-medium text-[#0A112F]">{getDate(createdAt)}</span>
            }
        },
        {
            label: 'Owner',
            key: 'role',
            type: 'custom',
            render: ({ role }) => {
                return <span className="text-[14px] font-medium text-[#0A112F]">{role}</span>
            }
        },
        {
            label: 'Use Status',
            key: 'status',
            type: 'custom',
            render: ({ status }) => {
                return <div className="flex items-center gap-[10px] border border-[#D5D7DA] rounded-[4px] px-[10px] py-[5px]">
                    <span className={`block w-[10px] h-[10px] rounded-full ${status === 'Active' ? 'bg-[#00C241]' : 'bg-[#FF0000]'}`}></span>
                    <span className="text-[14px] font-medium text-[#0A112F]">{status}</span>
                </div>
            }
        },
        {
            label: '',
            key: 'actions',
            type: 'action',
            render: () => {
                return <td className="tbl-action">
                    <div className="flex items-center justify-end gap-[10px] pr-[15px]">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" value="" />
                            <div
                                className={`group peer bg-white rounded-full duration-300 
                                w-[46px] h-[15px] 
                                ring-2 after:duration-300
                                ring-black after:bg-black 
                                after:rounded-full after:absolute after:h-[6px] after:w-[6px] after:top-1 after:left-1 after:flex
                                after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95
                            `}
                            ></div>
                        </label>
                    </div>
                </td>
            }
        },
    ];

    return (
        <div className="w-full p-[20px] max-w-[100rem] mx-auto">
            <div className="w-full flex justify-between items-center mb-[24px]">
                <h6 className="text-[16px]">Overview</h6>
            </div>
            <Search
                placeholder="Search by: user name, email, etc..."
                addBtn={{
                    title: '+ Add User',
                    onClick: () => navigate('/roles-permission/add')
                }}
            />
            <div className="my-[30px] stock-table">
                <Table
                    columns={columns}
                    data={usersData}
                    tableClass="stock-table"
                />
            </div>
        </div>
    )
}

export default RolesPermission