import React, { useEffect, useRef, useState } from 'react';
import button1 from 'assets/images/button-1.svg';
import Table from 'components/table';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosClient from 'api/AxiosClient';
import NoDataFound from 'components/no-data-found';
import Loader from 'components/loader';
import searchIcon from 'assets/images/search.svg';

const Customer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedTab, setSelectedTab] = useState('customer');
    const [loading, setLoading] = useState(false);
    const [customerData, setCustomerData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const isFetchingRef = useRef(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (location.pathname.includes('vendor')) {
            setSelectedTab('vendor');
        } else {
            setSelectedTab('customer');
        }
    }, [location.pathname]);


    const fetchCustomers = async (userType, page = 1, searchQuery = "", sortKey = "createdAt", sortDirection = "Asc") => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
        try {
            const response = await axiosClient.post('/customer/all-customer',
                {
                    userType,
                    page: page,
                    limit: 5,
                    search: searchQuery,
                    sortingKey: sortKey,
                    sortingOrder: sortDirection
                },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                setCustomerData(response.data.data.docs);
                setTotalPages(response.data.data.totalPages);
                setCurrentPage(page);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    };

    // Fetch users data from the API
    useEffect(() => {
        if (selectedTab === location.pathname.replace('/', '')) {
            const userType = location.pathname === '/customer' ? 'Customer' : 'Vendor';
            fetchCustomers(userType, currentPage);
        }
    }, [location.pathname, selectedTab, currentPage]);

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
        setCurrentPage(1);
        setSearchQuery('');
        navigate(`/${tab}`);
    };

    const handleAddClick = () => {
        setLoading(true);
        navigate(`/${selectedTab}/add`);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const onStatusChange = (userId) => {
        setCustomerData((prevData) => prevData.filter(item => item._id !== userId));
    };

    const handleDelete = async (userId) => {
        try {
            const response = await axiosClient.post('/customer/delete',
                { userId },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                onStatusChange(userId);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        // Clear previous timeout to prevent multiple API calls
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Trigger search after a delay (debounce)
        timeoutRef.current = setTimeout(() => {
            handleSearch(value);
        }, 500);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        fetchCustomers(selectedTab === 'customer' ? 'Customer' : 'Vendor', 1, query);
    };

    const columns = [
        {
            label: '',
            key: 'diamondId',
            isCheckbox: true,
            type: 'checkbox'
        },
        {
            label: 'Customer Name',
            key: 'name'
        },
        {
            label: 'Company Name',
            key: 'company'
        },
        {
            label: 'Address',
            key: 'address',
            className: 'tbl-address'
        },
        {
            label: 'Contact Number',
            key: 'phone'
        },
        {
            label: 'Email',
            key: 'email'
        },
        {
            label: '',
            key: 'actions',
            type: 'action',
            render: ({ _id }) => {
                return <td className="tbl-action">
                    <div className="flex items-center justify-end gap-[10px] pr-[15px]">
                        <button onClick={() => handleDelete(_id)}>
                            <img src={button1} alt="Delete" />
                        </button>
                    </div>
                </td>
            }
        },
    ];

    if (loading) {
        return <Loader />;;
    }

    return (
        <div className='w-full p-[20px] max-w-[100rem] mx-auto'>
            <div className="w-full flex items-center gap-[16px] md:flex-nowrap flex-wrap">
                <div className="w-full py-[7px] md-2:py-[5px] h-full flex items-center border-[1px] border-[#E4E5E8] rounded-[10px]">
                    <img src={searchIcon} alt='Search' className='w-[24px] h-[24px] mx-[16px]' />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onSearch={handleSearch}
                        placeholder={`Search by: ${selectedTab} name, email, etc...`}
                        className='w-full h-full outline-none text-[16px] md-2:text-[16px] text-[black]'
                    />
                    <div className='flex items-center gap-[16px] mx-[6px]'>
                        <button className={`w-max px-[18px] py-[10px] rounded-[4px] text-[14px] font-medium text-[#18191C] flex items-center gap-[12px] ${selectedTab === 'customer'
                            ? 'bg-[#1B1B1B] text-white'
                            : 'bg-[#EEEEEE]'
                            }`}
                            onClick={() => handleTabClick('customer')}>
                            <p>Manage Customer</p>
                        </button>
                        <button className={`w-max px-[18px] py-[10px] rounded-[4px] text-[14px] font-medium text-[#18191C] flex items-center gap-[12px] ${selectedTab === 'vendor'
                            ? 'bg-[#1B1B1B] text-white'
                            : 'bg-[#EEEEEE]'
                            }`}
                            onClick={() => handleTabClick('vendor')}>
                            <p>Manage Vendor</p>
                        </button>
                    </div>
                </div>
                <div className="w-[250px] h-[52px]">
                    <button
                        className='w-full h-full py-[17.5px] md-2:py-[15.5px] bg-[#1E1E1E] text-white rounded-[10px]'
                        onClick={handleAddClick}
                    >
                        {selectedTab === 'customer' ? '+ Add Customer' : '+ Add Vendor'}
                    </button>
                    {loading && <span className="ml-[10px] text-[16px]">Searching...</span>}
                </div>
            </div>
            <div className="my-[30px] stock-table">
                {customerData.length === 0 ? (
                    <NoDataFound message={`Oops! No ${selectedTab}s found.`} />
                ) : (
                    <Table
                        columns={columns}
                        data={customerData}
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

export default Customer;