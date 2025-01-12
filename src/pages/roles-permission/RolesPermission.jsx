import React, { useEffect, useRef, useState } from 'react'
import Search from 'components/search'
import Table from 'components/table';
import diamondIcon from 'assets/images/daimond.svg';
import { getDate } from 'utils/dateFormat';
import { useNavigate } from 'react-router-dom';
import button1 from 'assets/images/button-1.svg';
import axiosClient from 'api/AxiosClient';
import { arrowDown, arrowUp } from 'assets/utils/images';
import Loader from 'components/loader';
import NoDataFound from 'components/no-data-found';

const RolesPermission = () => {
    const navigate = useNavigate();

    const [usersData, setUsersData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'Asc' });

    const isFetchingRef = useRef(false);

    const fetchUsers = async (page = 1, searchQuery = "", sortKey = "createdAt", sortDirection = "Asc") => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
        try {
            const response = await axiosClient.post('/user/all-user',
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
                setUsersData(response.data.data.docs);
                setTotalPages(response.data.data.totalPages);
                setCurrentPage(page);
            }
        } catch (err) {
            setError('Failed to fetch users');
            console.error(err);
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        fetchUsers(1, query);
    };

    // Fetch users data from the API
    useEffect(() => {
        fetchUsers(currentPage, searchQuery, sortConfig.key, sortConfig.direction);
    }, [currentPage, searchQuery, sortConfig]);

    const handleSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'Asc' ? 'Desc' : 'Asc';
        setSortConfig({ key, direction });
        fetchUsers(1, searchQuery, key, direction);
    };

    const onStatusChange = (action, userId, newStatus) => {
        if (action === 'update') {
            setUsersData((prevData) =>
                prevData.map((item) =>
                    item._id === userId ? { ...item, isActive: newStatus } : item
                )
            );
        } else {
            setUsersData((prevData) => prevData.filter(item => item._id !== userId));
        }
    };

    const handleToggle = async (userId) => {
        try {
            const response = await axiosClient.post('/user/update-status',
                { userId },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                onStatusChange('update', userId, response.data.data.isActive);
            }
        } catch (error) {
            console.error('Error toggling status:', error);
        }
    };

    const handleDelete = async (userId) => {
        try {
            const response = await axiosClient.post('/user/delete',
                { userId },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                onStatusChange('delete', userId);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
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
            label: 'Member name and Id',
            key: 'firstName',
            type: 'custom',
            render: (item) => {
                return <div className="flex items-center gap-[10px]">
                    <img src={item.profilePic !== '' ? `${process.env.REACT_APP_IMAGE_URL}${item.profilePic}` : diamondIcon} alt="Diamond" className="rounded-full w-[40px] h-[40px] object-cover" />
                    <div className="flex flex-col items-start">
                        <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{item.firstName} {item.lastName}</span>
                        <span className="text-[14px] font-medium text-[#70707A]">{item.email}</span>
                    </div>
                </div>
            },
            sortable: true
        },
        {
            label: 'Date',
            key: 'createdAt',
            type: 'custom',
            render: ({ createdAt }) => {
                return <span className="text-[14px] font-medium text-[#0A112F]">{getDate(createdAt)}</span>
            },
            sortable: true
        },
        {
            label: 'Owner',
            key: 'userType',
            type: 'custom',
            render: ({ userType }) => {
                return <span className="text-[14px] font-medium text-[#0A112F]">{userType}</span>
            },
            sortable: true
        },
        {
            label: 'Use Status',
            key: 'isActive',
            type: 'custom',
            render: ({ isActive }) => {
                return <div className="flex items-center gap-[10px] border border-[#D5D7DA] rounded-[6px] px-[10px] py-[5px] max-w-[100px]">
                    <span className={`block w-[10px] h-[10px] rounded-full ${isActive ? 'bg-[#00C241]' : 'bg-[#FF0000]'}`}></span>
                    <span className="text-[14px] font-medium text-[#0A112F]">{isActive ? 'Active' : 'Inactive'}</span>
                </div>
            },
            sortable: true
        },
        {
            label: '',
            key: 'actions',
            type: 'action',
            render: ({ isActive, _id }) => {
                return <td className="tbl-action">
                    <div className="flex items-center justify-end gap-[70px] pr-[15px]">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" value="" checked={isActive} onChange={() => handleToggle(_id, isActive)} />
                            <div
                                className={`group peer rounded-full duration-300 
                                w-[46px] h-[15px] 
                                ring-2 after:duration-300
                                ${isActive ? 'bg-green-500 ring-green-500 after:bg-green-700' : 'bg-red-500 ring-red-500 after:bg-red-700'}
                                ring-black after:bg-black 
                                after:rounded-full after:absolute after:h-[6px] after:w-[6px] after:top-1 after:left-1 after:flex
                                after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95
                            `}
                            ></div>
                        </label>
                        <button onClick={() => handleDelete(_id)}>
                            <img src={button1} alt="Delete" />
                        </button>
                    </div>
                </td>
            },
            sortable: false
        },
    ];

    if (loading) {
        return <Loader />;;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="w-full p-[20px] max-w-[100rem] mx-auto">
            <div className="w-full flex justify-between items-center mb-[24px]">
                <h6 className="text-[16px]">Overview</h6>
            </div>
            <Search
                placeholder="Search by: user name, email, etc..."
                searchQuery={searchQuery}
                onSearch={handleSearch}
                showButtons={false}
                addBtn={{
                    title: '+ Add User',
                    onClick: () => navigate('/roles-permission/add')
                }}
            />
            <div className="my-[30px] stock-table">
                {usersData.length === 0 ? (
                    <NoDataFound message="Oops! No users found."/>
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
                        data={usersData}
                        tableClass="stock-table"
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>
        </div>
    )
}

export default RolesPermission