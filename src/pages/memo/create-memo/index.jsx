import PhoneInputField from 'components/FormFields/PhoneInputField/PhoneInputField';
import SelectField from 'components/FormFields/SelectField';
import Table from 'components/table';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getCurrency } from 'utils';
import { button, button1, button2, writeIcon, wrongIcon, diamondIcon, arrowDown, arrowUp, } from "assets/utils/images";
import axiosClient from 'api/AxiosClient';
import { toast } from 'react-toastify';
import Search from 'components/search';
import { FilterPopup } from 'pages/Stock';
import NoDataFound from 'components/no-data-found';
import { getDate, getTime } from 'utils/dateFormat';
import DetailPopup from 'components/popup/Detail';

const defaultRow = {
    _id: "",
    refNo: "",
    description: "",
    pcs: "",
    carats: "",
    pricePerCarat: "",
    returnInCarats: "",
    soldInCarats: "",
    isEdit: true
};

const CreateMemo = () => {
    const navigate = useNavigate();

    const { handleSubmit, control, formState: { errors }, watch, setValue } = useForm({ defaultValues: {} });

    const [rowData, setRowData] = useState([]);
    const [customerOptions, setCustomerOptions] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const isFetchingRef = useRef(false);

    const selectedCustomer = watch("customerName");

    useEffect(() => {
        if (isFetchingRef.current) return;
        handleCustomerList();
        // if (params.stockId) fetchStockDetail(params.stockId);
    }, []);

    useEffect(() => {
        if (selectedCustomer) {
            setValue('contactInfo', selectedCustomer?.phone);
        }
    }, [selectedCustomer, setValue]);

    useEffect(() => {
        if (rowData.length === 0) {
            setRowData([defaultRow]);
        }
    }, [rowData]);

    const handleCustomerList = async () => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        try {
            const response = await axiosClient.get('/memo/all-customer', {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                const customerOptions = response?.data?.data?.map(customer => ({
                    label: customer.name,
                    value: customer._id,
                    phone: customer.phone
                }));

                setCustomerOptions(customerOptions);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            isFetchingRef.current = false;
        }
    };

    const handleStockTable = () => {
        setIsOpen(q => !q);
    };

    async function handleChange(e, id) {
        const { name, value } = e.target;

        const updatedData = rowData.map(item => item._id === id ? { ...item, [name]: value } : item);

        setRowData(updatedData);
    }

    function handleViewClick(item) {
        console.log(item);
    }

    function handleDeleteClick(id) {
        const updatedData = rowData.filter(item => item._id !== id);
        setRowData(updatedData);
    }

    function handleEditClick(id) {
        const updatedData = rowData.map(item => item._id === id ? { ...item, isEdit: true } : item);
        setRowData(updatedData);
    }

    function handleSaveClick(id) {
        const updatedData = rowData.map(item => item._id === id ? { ...item, isEdit: false } : item);
        setRowData(updatedData);
    }

    function handleAddItemsClick() {
        const updatedData = [...rowData, {
            _id: (rowData.length + 101).toString(),
            refNo: "",
            description: "",
            pcs: "",
            carats: "",
            pricePerCarat: "",
            returnInCarats: "",
            soldInCarats: "",
            isEdit: true
        }]

        setRowData(updatedData);
    }

    const onSubmit = (data) => {
        console.log(data);
    }

    const columns = [
        {
            label: '',
            key: 'diamondId',
            isCheckbox: true,
            type: 'checkbox'
        },
        {
            label: 'Ref No',
            key: 'refNo',
            type: 'custom',
            render: ({ _id, isEdit, refNo }) => {
                return (
                    <>
                        {
                            isEdit
                                ? <input
                                    type="text"
                                    name="refNo"
                                    className="w-full h-[40px] border border-[#342C2C] rounded-[8px] px-[10px] py-[10px]"
                                    value={refNo}
                                    onChange={(e) => handleChange(e, _id)}
                                />
                                : <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{refNo}</span>
                        }
                    </>
                )
            }
        },
        {
            label: 'Description',
            key: 'description',
            type: 'custom',
            render: ({ _id, isEdit, description }) => {
                return (
                    <>
                        {
                            isEdit
                                ? <input
                                    type="text"
                                    name="description"
                                    className="w-full h-[40px] border border-[#342C2C] rounded-[8px] px-[10px] py-[10px]"
                                    value={description}
                                    onChange={(e) => handleChange(e, _id)}
                                />
                                : <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{description} CT</span>
                        }
                    </>
                )
            }
        },
        {
            label: 'Pcs',
            key: 'pcs',
            type: 'custom',
            render: ({ _id, isEdit, pcs }) => {
                return (
                    <>
                        {
                            isEdit
                                ? <input
                                    type="text"
                                    name="pcs"
                                    className="w-full h-[40px] border border-[#342C2C] rounded-[8px] px-[10px] py-[10px]"
                                    value={pcs}
                                    onChange={(e) => handleChange(e, _id)}
                                />
                                : <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{pcs} CT</span>
                        }
                    </>
                )
            }
        },
        {
            label: 'Carats',
            key: 'carats',
            type: 'custom',
            render: ({ _id, isEdit, carats }) => {
                return (
                    <>
                        {
                            isEdit
                                ? <input
                                    type="text"
                                    name="carats"
                                    className="w-full h-[40px] border border-[#342C2C] rounded-[8px] px-[10px] py-[10px]"
                                    value={carats}
                                    onChange={(e) => handleChange(e, _id)}
                                />
                                : <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{carats}</span>
                        }
                    </>
                )
            }
        },
        {
            label: 'Price Per Carat',
            key: 'pricePerCarat',
            type: 'custom',
            render: ({ _id, isEdit, pricePerCarat }) => {
                return (
                    <>
                        {
                            isEdit
                                ? <input
                                    type="text"
                                    name="pricePerCarat"
                                    className="w-full h-[40px] border border-[#342C2C] rounded-[8px] px-[10px] py-[10px]"
                                    value={pricePerCarat}
                                    onChange={(e) => handleChange(e, _id)}
                                />
                                : <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{getCurrency(pricePerCarat)}</span>
                        }
                    </>
                )
            }
        },
        {
            label: 'Return In Carats',
            key: 'returnInCarats',
            type: 'custom',
            render: ({ _id, isEdit, returnInCarats }) => {
                return (
                    <>
                        {
                            isEdit
                                ? <input
                                    type="text"
                                    name="returnInCarats"
                                    className="w-full h-[40px] border border-[#342C2C] rounded-[8px] px-[10px] py-[10px]"
                                    value={returnInCarats}
                                    onChange={(e) => handleChange(e, _id)}
                                />
                                : <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{getCurrency(returnInCarats)}</span>
                        }
                    </>
                )
            }
        },
        {
            label: 'Sold In Carats',
            key: 'soldInCarats',
            type: 'custom',
            render: ({ _id, isEdit, soldInCarats }) => {
                return (
                    <>
                        {
                            isEdit
                                ? <input
                                    type="text"
                                    name="soldInCarats"
                                    className="w-full h-[40px] border border-[#342C2C] rounded-[8px] px-[10px] py-[10px]"
                                    value={soldInCarats}
                                    onChange={(e) => handleChange(e, _id)}
                                />
                                : <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{getCurrency(soldInCarats)}</span>
                        }
                    </>
                )
            }
        },
        {
            label: '',
            key: 'actions',
            type: 'action',
            render: (item) => {
                return <td className="tbl-action">
                    <div className="flex items-center justify-end gap-[10px]">
                        {
                            item.isEdit
                                ? (<>
                                    <button onClick={() => handleSaveClick(item._id)}>
                                        <img src={writeIcon} alt="View" className='create-memo-icon' />
                                    </button>
                                    <button className="mr-[5px]" onClick={() => handleDeleteClick(item._id)}>
                                        <img src={wrongIcon} alt="Delete" className='create-memo-icon' />
                                    </button>
                                </>)
                                : (<>
                                    <button onClick={() => handleViewClick(item)}>
                                        <img src={button} alt="View" />
                                    </button>
                                    <button onClick={() => handleDeleteClick(item._id)}>
                                        <img src={button1} alt="Delete" />
                                    </button>
                                    <button className="mr-[5px]" onClick={() => handleEditClick(item._id)}>
                                        <img src={button2} alt="Edit" />
                                    </button>
                                </>)
                        }
                    </div>
                </td>
            }
        },
    ];

    return (
        <div className="w-full h-full p-[20px] max-w-[100rem] flex flex-col mx-auto">
            <div className="w-full flex justify-between items-center mb-[24px]">
                <h6 className="text-[16px]">Create Memo</h6>
            </div>
            <div className='relative flex-1 border border-[rgba(0,0,0,0.1)] rounded-[12px] p-[30px]'>
                <div className='w-full flex justify-between items-center mb-[20px]'>
                    <h6 className='text-[16px]'>Customer Details</h6>
                </div>

                <form className="stock-add" onSubmit={handleSubmit(onSubmit)}>
                    <div className='w-full flex items-center gap-[10px]'>
                        <SelectField
                            {...{
                                id: 8,
                                name: "customerName",
                                label: "Customer Name",
                                type: "SELECT",
                                placeholder: "Select Customer",
                                options: [
                                    { value: "1", label: "Customer 1" },
                                    { value: "2", label: "Customer 2" }
                                ],
                                rule: {
                                    required: "*Customer Name is required"
                                },
                            }}
                            errors={errors}
                            control={control}
                            options={customerOptions}
                        />
                        <PhoneInputField
                            {...{
                                id: 6,
                                name: "contactInfo",
                                label: "Contact Information",
                                type: "PHONE_INPUT",
                                placeholder: "Enter Contact Information"
                            }}
                            control={control}
                            errors={errors}
                        />
                    </div>
                </form>

                <div>
                    <div className='w-full block md:flex items-center justify-between'>
                        <h2>Memo Conversion</h2>
                        <div className='max-w-[40%] flex gap-[20px]'>
                            <button
                                className='text-[14px] px-[14px] py-[10px] border border-[#D5D7DA] rounded-[8px] font-medium text-[ #414651] outline-none'
                                onClick={handleStockTable}>
                                Select Stock
                            </button>
                            <button
                                className='text-[14px] px-[14px] py-[10px] border border-[#D5D7DA] rounded-[8px] font-medium text-[ #414651] outline-none'
                                onClick={handleAddItemsClick}>
                                Add Items
                            </button>
                        </div>
                    </div>

                    <div className="my-[30px] stock-table">
                        <Table
                            columns={columns}
                            data={rowData}
                            tableClass="stock-table"
                        />
                    </div>
                </div>

                {
                    isOpen && <SelectStock setIsOpenSelectStock={setIsOpen} />
                }
            </div>
        </div>
    )
}

function SelectStock({ setIsOpenSelectStock }) {

    const isFetchingRef = useRef(false);

    const [stockData, setStockData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false)
    const [range, setRange] = useState([1, 100]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'Desc' });
    const [selectItem, setSelectItem] = useState([])

    const handleActionClick = async (action, item) => {
        switch (action) {
            case 'view':
                fetchStockDetail(action, item);
                break;
            default:
                break;
        }
    };

    const fetchStockDetail = async (action, item) => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
        try {
            const response = await axiosClient.post(`/stock/detail`,
                { stockId: item._id },
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
    }

    const columns = [
        {
            label: '',
            key: 'diamondId',
            isCheckbox: true,
            type: 'checkbox'
        },
        {
            label: 'Diamond name and Id',
            key: 'diamondName',
            type: 'custom',
            render: (item) => {
                return <div className="flex items-center gap-[10px]">
                    <img src={diamondIcon} alt="Diamond" />
                    <div className="flex flex-col items-start">
                        <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{item.diamondName}</span>
                        <span className="text-[12px] font-medium text-[#0A112F]">{item.diamondId}</span>
                    </div>
                </div>
            },
            sortable: true
        },
        {
            label: 'Ref No',
            key: 'refNo',
            sortable: true
        },
        {
            label: 'Carat',
            key: 'carat',
            sortable: true
        },
        {
            label: 'Shape',
            key: 'shape',
            sortable: true
        },
        {
            label: 'Size',
            key: 'size',
            sortable: true
        },
        {
            label: 'Color',
            key: 'color',
            sortable: true
        },
        {
            label: 'Clarity',
            key: 'clarity',
            sortable: true
        },
        {
            label: 'Price Per Carat',
            key: 'pricePerCarat',
            sortable: true
        },
        {
            label: 'Price',
            key: 'price',
            sortable: true
        },
        {
            label: '',
            key: 'actions',
            type: 'action',
            render: (item) => {
                return <td className="tbl-action">
                    <div className="flex items-center justify-center gap-[10px]">
                        <button onClick={() => handleActionClick('view', item)}>
                            <img src={button} alt="View" />
                        </button>
                    </div>
                </td>
            }
        }
    ];

    useEffect(() => {
        if (isFetchingRef.current) return;
        fetchStocks(currentPage, searchQuery, sortConfig.key, sortConfig.direction);
    }, [currentPage, searchQuery, sortConfig]);

    const fetchStocks = async (page = 1, searchQuery = "", sortKey = "createdAt", sortDirection = "Asc") => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
        try {
            const response = await axiosClient.post('/memo/all-stocks',
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
                toast.success(response?.data?.message);
                setStockData(response.data.data.docs);
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

    const handleSearch = (query) => {
        setSearchQuery(query);
        console.log({ query });
    };

    const handleFilter = (data) => {
        console.log({ ...data, range })
        setIsOpen(q => !q)
    }

    const handleSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'Asc' ? 'Desc' : 'Asc';
        setSortConfig({ key, direction });
        fetchStocks(1, searchQuery, key, direction);
    };

    const handleClosePopup = () => {
        setSelectedItem(null);
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectItem(stockData.map(({ _id }) => _id))
        } else {
            setSelectItem([])
        }
    }

    const handleCheck = (event, { _id }) => {
        if (event.target.checked) {
            setSelectItem([...selectItem, _id])
        } else {
            setSelectItem(selectItem.filter((id) => id !== _id))
        }
    }

    return (
        <div className='absolute top-0 left-0 w-full h-full bg-white p-[30px] pt-[35px] rounded-[12px] z-10'>
            <div className='w-full flex justify-between items-center mb-[20px]'>
                <h6 className='text-[16px]'>Current Stocks</h6>
            </div>
            <div>
                <Search
                    placeholder="Search by: diamond ID, diamond name, etc..."
                    searchQuery={searchQuery}
                    onSearch={handleSearch}
                    addBtn={{
                        title: 'Add Item',
                        onClick: () => console.log('Add Item'),
                        isCancel: true,
                        onCancel: () => setIsOpenSelectStock(q => !q),
                    }}
                    handleFilterClick={() => setIsOpen(q => !q)}
                />
                {isOpen && <FilterPopup range={range} setRange={setRange} onSubmit={handleFilter} />}
                <div className="my-[30px] stock-table">

                    {
                        stockData?.length === 0
                            ? (
                                <NoDataFound message="Oops! No stocks found." />
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
                                    data={stockData}
                                    tableClass="stock-table"
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                    handleSelectAll={handleSelectAll}
                                    handleCheck={handleCheck}
                                    isAllSelected={stockData.length === selectItem.length}
                                    selectItem={selectItem}
                                />
                            )
                    }
                </div>
            </div>

            {selectedItem && selectedItem.action === 'view' && <DetailPopup item={selectedItem.item} onClose={handleClosePopup} />}
        </div>
    )
}

export default CreateMemo;