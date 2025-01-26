import PhoneInputField from 'components/FormFields/PhoneInputField/PhoneInputField';
import SelectField from 'components/FormFields/SelectField';
import Table from 'components/table';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getCurrency } from 'utils';
import { button1, button2, writeIcon, wrongIcon } from "assets/utils/images";
import axiosClient from 'api/AxiosClient';
import { toast } from 'react-toastify';
import NoDataFound from 'components/no-data-found';
import { getDate, getTime } from 'utils/dateFormat';
import DetailPopup from 'components/popup/Detail';
import MemoPreview from './MemoPreview';
import Loader from 'components/loader';
import InputField from 'components/FormFields/InputField';

const previewData = [
    {
        no: 1,
        refNo: 'REF123',
        description: 'Sample Item',
        pcs: 10,
        carats: 15.5,
        pricePerCarat: 100,
        returnInCarats: 5,
        soldInCarats: 10.5,
        amount: 1050,
        remarks: 'VVS'
    },
    {
        no: 2,
        refNo: 'REF456',
        description: 'Another Sample Item',
        pcs: 15,
        carats: 18.7,
        pricePerCarat: 150,
        returnInCarats: 3,
        soldInCarats: 12.8,
        amount: 1980,
        remarks: 'S2'
    }
]

const CreateMemo = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, control, formState: { errors }, watch, setValue, reset } = useForm({ defaultValues: {} });

    const [rowData, setRowData] = useState([]);
    const [customerOptions, setCustomerOptions] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');

    const isFetchingRef = useRef(false);
    const timeoutRef = useRef(null);

    const selectedCustomer = watch("customerName");

    useEffect(() => {
        if (isFetchingRef.current) return;
        handleCustomerList();
        // if (params.stockId) fetchStockDetail(params.stockId);
    }, []);

    useEffect(() => {
        if (selectedCustomer) {
            setValue('contactInfo', selectedCustomer?.phone);
            setValue('address', selectedCustomer?.address);
        }
    }, [selectedCustomer, setValue]);

    useEffect(() => {
        const initialRows = Array.from({ length: 5 }, () => ({
            refNo: "",
            description: "",
            carats: "",
            pricePerCarat: "",
            returnInCarats: "",
            soldInCarats: "",
            isEdit: true
        }));
        setRowData(initialRows);
    }, []);

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
                    phone: customer.phone,
                    address: customer.address,
                }));

                setCustomerOptions(customerOptions);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            isFetchingRef.current = false;
        }
    };

    const fetchStockDetail = async (refNo, index) => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        try {
            const response = await axiosClient.post('/memo/fetch-stock',
                { refNo },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                const responseData = response?.data?.data;
                const updatedData = rowData.map((item, idx) => idx === index ? {
                    refNo: responseData.refNo ?? "",
                    description: "",
                    carats: responseData.carat ?? "",
                    pricePerCarat: responseData.pricePerCarat ?? "",
                    returnInCarats: "",
                    soldInCarats: "",
                    price: responseData.price ?? "",
                    remarks: responseData.remarks ?? "",
                    isEdit: true
                } : item);
                setRowData(updatedData);
            }
        } catch (error) {
            if (error.response.status === 404) {
                const updatedData = rowData.map((item, idx) => idx === index ? {
                    refNo: refNo,
                    description: "",
                    carats: "",
                    pricePerCarat: "",
                    returnInCarats: "",
                    soldInCarats: "",
                    price: "",
                    remarks: "",
                    isEdit: true
                } : item);
                setRowData(updatedData);
            }
        } finally {
            isFetchingRef.current = false;
        }
    };

    const handleRefNoChange = (value, index) => {
        setQuery(value);

        // Clear previous timeout to prevent multiple API calls
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Trigger search after a delay (debounce)
        timeoutRef.current = setTimeout(() => {
            fetchStockDetail(value, index);
        }, 500);
    };

    async function handleChange(e, index) {
        const { name, value } = e.target;

        if (name === "refNo") {
            // Clear any previous timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Debounce the API call
            timeoutRef.current = setTimeout(() => {
                handleRefNoChange(value, index);
            }, 200);
        }

        const updatedData = rowData.map((item, idx) => idx === index ? { ...item, [name]: value } : item);
        if (name === 'carats' || name === 'pricePerCarat') {
            const carats = parseFloat(updatedData[index].carats) || 0;
            const pricePerCarat = parseFloat(updatedData[index].pricePerCarat) || 0;
            const amount = parseFloat(carats * pricePerCarat).toFixed();

            updatedData[index].price = amount;
        }
        setRowData(updatedData);
    }

    function handleDeleteClick(index) {
        const updatedData = rowData.filter((item, idx) => idx !== index);
        setRowData(updatedData);
    }

    function handleEditClick(index) {
        const updatedData = [...rowData];

        updatedData[index].isEdit = true;
        setRowData(updatedData);
    }

    function handleSaveClick(index) {
        const updatedData = [...rowData];

        if (updatedData[index]?.refNo === "") {
            updatedData.splice(index, 1);
        } else {
            updatedData[index].isEdit = false;
        }
        setRowData(updatedData);
    }

    function handleCancelClick(index) {
        const updatedData = [...rowData];

        if (updatedData[index]?.refNo === "") {
            updatedData.splice(index, 1);
        } else {
            updatedData[index].isEdit = false;
        }
        setRowData(updatedData);
    }

    function handleAddItemsClick() {
        const updatedData = [...rowData, {
            refNo: "",
            description: "",
            carats: "",
            pricePerCarat: "",
            returnInCarats: "",
            soldInCarats: "",
            price: "",
            remarks: "",
            isEdit: true
        }]

        setRowData(updatedData);
    }

    const onSubmit = async (data) => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;
        
        try {
            const payload = {};
            payload.customer = data?.customerName?.value;
            payload.items = rowData?.map((item) => {
                delete item.isEdit;
                return item;
            });

            const response = await axiosClient.post('/memo/create',
                payload,
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 201) {
                toast.success(response?.data?.message);
                navigate(-1);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            isFetchingRef.current = false;
        }
    }

    const columns = [
        {
            label: 'SR No',
            key: 'srNo',
            type: 'custom',
            render: (row, index) => {
                const srNo = index + 1;
                return (
                    <span className="text-[14px] font-medium text-[#0A112F] text-center line-clamp-2">
                        {srNo}
                    </span>
                );
            }
        },
        {
            label: 'Ref No',
            key: 'refNo',
            type: 'custom',
            render: ({ isEdit, refNo }, index) => {
                return (
                    <>
                        {
                            isEdit
                                ? <input
                                    type="text"
                                    name="refNo"
                                    className="w-full h-[40px] border border-[#342C2C] rounded-[8px] px-[10px] py-[10px]"
                                    value={refNo}
                                    onChange={(e) => handleChange(e, index)}
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
            render: ({ isEdit, description }, index) => {
                return (
                    <>
                        {
                            isEdit
                                ? <input
                                    type="text"
                                    name="description"
                                    className="w-full h-[40px] border border-[#342C2C] rounded-[8px] px-[10px] py-[10px]"
                                    value={description}
                                    onChange={(e) => handleChange(e, index)}
                                />
                                : <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{description !== '' ? description : '--'}</span>
                        }
                    </>
                )
            }
        },
        // {
        //     label: 'Pcs',
        //     key: 'pcs',
        //     type: 'custom',
        //     render: ({ isEdit, pcs }, index) => {
        //         return (
        //             <>
        //                 {
        //                     isEdit
        //                         ? <input
        //                             type="text"
        //                             name="pcs"
        //                             className="w-full h-[40px] border border-[#342C2C] rounded-[8px] px-[10px] py-[10px]"
        //                             value={pcs}
        //                             onChange={(e) => handleChange(e, index)}
        //                         />
        //                         : <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{pcs !== '' ? pcs : '--'}</span>
        //                 }
        //             </>
        //         )
        //     }
        // },
        {
            label: 'Carats',
            key: 'carats',
            type: 'custom',
            render: ({ isEdit, carats }, index) => {
                return (
                    <>
                        {
                            isEdit
                                ? <input
                                    type="text"
                                    name="carats"
                                    className="w-full h-[40px] border border-[#342C2C] rounded-[8px] px-[10px] py-[10px]"
                                    value={carats}
                                    onChange={(e) => handleChange(e, index)}
                                />
                                : <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{carats !== '' ? `${carats} CT` : '--'}</span>
                        }
                    </>
                )
            }
        },
        {
            label: 'Price Per Carat',
            key: 'pricePerCarat',
            type: 'custom',
            render: ({ isEdit, pricePerCarat }, index) => {
                return (
                    <>
                        {
                            isEdit
                                ? <input
                                    type="text"
                                    name="pricePerCarat"
                                    className="w-full h-[40px] border border-[#342C2C] rounded-[8px] px-[10px] py-[10px]"
                                    value={pricePerCarat}
                                    onChange={(e) => handleChange(e, index)}
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
            render: ({ isEdit, returnInCarats }, index) => {
                return (
                    <>
                        {
                            isEdit
                                ? <input
                                    type="text"
                                    name="returnInCarats"
                                    className="w-full h-[40px] border border-[#342C2C] rounded-[8px] px-[10px] py-[10px]"
                                    value={returnInCarats}
                                    onChange={(e) => handleChange(e, index)}
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
            render: ({ isEdit, soldInCarats }, index) => {
                return (
                    <>
                        {
                            isEdit
                                ? <input
                                    type="text"
                                    name="soldInCarats"
                                    className="w-full h-[40px] border border-[#342C2C] rounded-[8px] px-[10px] py-[10px]"
                                    value={soldInCarats}
                                    onChange={(e) => handleChange(e, index)}
                                />
                                : <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{getCurrency(soldInCarats)}</span>
                        }
                    </>
                )
            }
        },
        {
            label: 'Amount',
            key: 'price',
            type: 'custom',
            render: ({ isEdit, price }, index) => {
                return (
                    <>
                        {
                            isEdit
                                ? <input
                                    type="text"
                                    name="price"
                                    className="w-full h-[40px] border border-[#342C2C] rounded-[8px] px-[10px] py-[10px]"
                                    value={price}
                                    onChange={(e) => handleChange(e, index)}
                                />
                                : <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{getCurrency(price)}</span>
                        }
                    </>
                )
            }
        },
        {
            label: 'Remarks',
            key: 'remarks',
            type: 'custom',
            render: ({ isEdit, remarks }, index) => {
                return (
                    <>
                        {
                            isEdit
                                ? <input
                                    type="text"
                                    name="remarks"
                                    className="w-full h-[40px] border border-[#342C2C] rounded-[8px] px-[10px] py-[10px]"
                                    value={remarks}
                                    onChange={(e) => handleChange(e, index)}
                                />
                                : <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{remarks !== '' ? remarks : '--'}</span>
                        }
                    </>
                )
            }
        },
        {
            label: '',
            key: 'actions',
            type: 'action',
            render: (item, index) => {
                return <td className="tbl-action !w-auto">
                    <div className="flex items-center justify-end gap-[10px]">
                        {
                            item.isEdit
                                ? (<>
                                    <button onClick={() => handleSaveClick(index)}>
                                        <img src={writeIcon} alt="View" className='create-memo-icon' />
                                    </button>
                                    <button className="mr-[5px]" onClick={() => handleCancelClick(index)}>
                                        <img src={wrongIcon} alt="Delete" className='create-memo-icon' />
                                    </button>
                                </>)
                                : (<>
                                    {/* <button onClick={() => handleViewClick(item)}>
                                        <img src={button} alt="View" />
                                    </button> */}
                                    <button onClick={() => handleDeleteClick(index)}>
                                        <img src={button1} alt="Delete" />
                                    </button>
                                    <button className="mr-[5px]" onClick={() => handleEditClick(index)}>
                                        <img src={button2} alt="Edit" />
                                    </button>
                                </>)
                        }
                    </div>
                </td>
            }
        }
    ];

    const getColumnTotal = (columnKey) => {
        return rowData.reduce((sum, row) => {
            const value = parseFloat(row[columnKey]) || 0;
            return Math.round((sum + value) * 100) / 100;
        }, 0);
    };

    function tableFooter() {
        return (
            <tfoot>
                <tr className='py-[12px]'>
                    <th colSpan={3} >
                        <strong>Total</strong>
                    </th>
                    <th className='!text-start'>
                        <strong>{getColumnTotal('carats').toFixed(2)} CT</strong>
                    </th>
                    <th colSpan={3}></th>
                    <th className='!text-start'>
                        <strong>{getCurrency(getColumnTotal('price'))}</strong>
                    </th>
                    <th colSpan={3}></th>
                </tr>
            </tfoot>
        );
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <div className="w-full h-full p-[20px] max-w-[100rem] flex flex-col mx-auto">
                <div className="w-full flex justify-between items-center mb-[24px]">
                    <h6 className="text-[16px]">Create Memo</h6>
                </div>
                <div className='relative flex-1 border border-[rgba(0,0,0,0.1)] rounded-[12px] p-[30px]'>
                    <div className='w-full flex justify-between items-center mb-[20px]'>
                        <h6 className='text-[16px]'>Customer Details</h6>
                        <div className='flex gap-[12px]'>
                            <button
                                className='w-[220px] h-full min-w-[130px] py-[17.5px] md-2:py-[15.5px] bg-[#1E1E1E] text-white rounded-[10px]'
                                onClick={() => navigate('/customer/add')}
                            >
                                + Add Customer
                            </button>
                            <button
                                className='w-[150px] h-full min-w-[130px] py-[17.5px] md-2:py-[15.5px] bg-[#1E1E1E] text-white rounded-[10px]'
                                onClick={() => setIsPreview(q => !q)}
                            >
                                Preview
                            </button>
                            {loading && <Loader />}
                        </div>
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
                                isSearchable={true}
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
                            <InputField
                                {...{
                                    id: 7,
                                    name: "address",
                                    label: "Address",
                                    type: "INPUT",
                                    placeholder: "Enter Address"
                                }}
                                register={register}
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
                                    onClick={handleAddItemsClick}>
                                    Add Items
                                </button>
                            </div>
                        </div>

                        <div className="my-[30px] stock-table">
                            {rowData?.length === 0 ? (
                                <NoDataFound message="Oops! No stocks found." />
                            ) : (
                                <Table
                                    columns={columns}
                                    data={rowData}
                                    tableClass="stock-table"
                                    tableFooter={tableFooter()}
                                />)}
                        </div>

                        <div className='w-full flex items-center justify-end gap-[20px]'>
                            <button type='button' className='w-[150px] h-[48px] outline-none rounded-[12px] border-[2px] border-[#342C2C] border-solid text-[16px]' onClick={() => reset()}>Reset</button>
                            <button type='submit' className='w-[150px] h-[48px] outline-none rounded-[12px] bg-[#342C2C] text-white text-[16px]' onClick={handleSubmit(onSubmit)}>Submit</button>
                        </div>
                    </div>
                </div>

            </div>

            {
                isPreview &&
                <MemoPreview
                    rowData={previewData}
                    onCancel={() => setIsPreview(q => !q)}
                />
            }
        </>
    )
}

export default CreateMemo;