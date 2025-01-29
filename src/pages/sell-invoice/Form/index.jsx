import axiosClient from 'api/AxiosClient';
import { button1, button2, writeIcon, wrongIcon } from 'assets/utils/images';
import InputField from 'components/FormFields/InputField';
import PhoneInputField from 'components/FormFields/PhoneInputField/PhoneInputField'
import SelectField from 'components/FormFields/SelectField'
import Loader from 'components/loader';
import NoDataFound from 'components/no-data-found';
import Table from 'components/table';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCurrency } from 'utils';

const SellInvoiceAdd = () => {
    const navigate = useNavigate();
    const params = useParams();

    const { register, handleSubmit, control, formState: { errors }, watch, setValue, reset } = useForm({ defaultValues: {} });

    const [rowData, setRowData] = useState([]);
    const [newRows, setNewRows] = useState([]);
    const [updatedRows, setUpdatedRows] = useState([]);
    const [removedRows, setRemovedRows] = useState([]);
    const [customerOptions, setCustomerOptions] = useState([]);
    const [isPreview, setIsPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dueDate, setDueDate] = useState('');

    const isFetchingRef = useRef(false);
    const timeoutRef = useRef(null);

    const selectedCustomer = watch("customerName");
    const termsValue = watch("terms");

    useEffect(() => {
        if (termsValue && !isNaN(termsValue)) {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + parseInt(termsValue));
            const formattedDueDate = currentDate.toISOString().split('T')[0];
            setDueDate(formattedDueDate);
            setValue('dueDate', formattedDueDate);
        } else {
            setDueDate('');
            setValue('dueDate', '');
        }
    }, [termsValue, setValue]);

    useEffect(() => {
        if (isFetchingRef.current) return;
        handleCustomerList();
        if (params.sellInvoiceId) fetchInvoiceDetail(params.sellInvoiceId);
    }, [params.sellInvoiceId]);

    useEffect(() => {
        if (selectedCustomer) {
            setValue('address', selectedCustomer?.address);
        }
    }, [selectedCustomer, setValue]);

    useEffect(() => {
        if (rowData.length === 0) {
            const initialRows = Array.from({ length: 5 }, () => ({
                refNo: "",
                description: "",
                carats: "",
                pricePerCarat: "",
                price: "",
                isEdit: true
            }));
            setRowData(initialRows);
        }
    }, [!params.sellInvoiceId]);

    const handleCustomerList = async () => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
        try {
            const response = await axiosClient.get('/invoice/all-customer', {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                const customerOptions = response?.data?.data?.map(customer => ({
                    label: customer.name,
                    value: customer._id,
                    address: customer.address
                }));

                setCustomerOptions(customerOptions);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            isFetchingRef.current = false;
            setLoading(false);
        }
    };

    const fetchInvoiceDetail = async (sellInvoiceId) => {
        try {
            const response = await axiosClient.post('/invoice/detail',
                { sellInvoiceId },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                const responseData = response.data.data;
                setValue('customerName', { label: responseData?.customer?.name, value: responseData?.customer?._id, address: responseData?.address });
                setValue('invoiceNumber', responseData?.invoiceNumber);
                setValue('shipTo', responseData?.shipTo);
                setValue('terms', responseData?.terms);

                setRowData(responseData.invoiceItems);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const fetchStockDetail = async (refNo, index) => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        try {
            const response = await axiosClient.post('/invoice/fetch-stock',
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
                    price: responseData.price ?? "",
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
                    price: "",
                    isEdit: true
                } : item);
                setRowData(updatedData);
            }
        } finally {
            isFetchingRef.current = false;
        }
    };

    const handleRefNoChange = (value, index) => {
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
        const { name } = e.target;
        let value = e.target.value;
        if (['carats', 'pricePerCarat', 'price'].includes(name)) {
            value = e.target.value.replace(/[^0-9.]/g, '');
            if ((value.match(/\./g) || []).length > 1) {
                value = value.replace(/\.+$/, '');
            }
        }

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
        setValue('tableData', updatedData);
    }

    function handleDeleteClick(index) {
        if (params.sellInvoiceId) {
            if (!rowData[index]?._id) {
                setNewRows(prev => {
                    const updatedRow = { ...rowData[index] };
                    const existingIndex = prev.findIndex((row) => row.refNo === updatedRow.refNo);
                    if (existingIndex !== -1) {
                        const newData = [...prev];
                        newData.splice(existingIndex, 1);
                        return newData;
                    }
                    return [...prev, updatedRow];
                });
            } else {
                setRemovedRows(prev => {
                    const updatedRow = { ...rowData[index] };

                    const existingIndex = prev.findIndex((row) => row._id === updatedRow._id);

                    if (existingIndex !== -1) {
                        const newData = [...prev];
                        newData[existingIndex] = updatedRow;
                        return newData;
                    } else {
                        return [...prev, updatedRow];
                    }
                });
            }
        }

        const updatedData = rowData.filter((item, idx) => idx !== index);
        setRowData(updatedData);
        setValue('tableData', updatedData);
    }

    function handleEditClick(index) {
        const updatedData = [...rowData];

        updatedData[index].isEdit = true;
        setRowData(updatedData);
        setValue('tableData', updatedData);
    }

    function handleSaveClick(index) {
        const updatedData = [...rowData];

        if (updatedData[index]?.refNo === "") {
            updatedData.splice(index, 1);
        } else {
            updatedData[index].isEdit = false;
            if (params.sellInvoiceId) {
                if (!updatedData[index]?._id) {
                    setNewRows(prev => [...prev, updatedData[index]]);
                } else {
                    setUpdatedRows(prev => {
                        const updatedRow = { ...updatedData[index], carats: updatedData[index].carats?.toString() };
                        const existingIndex = prev.findIndex((row) => row._id === updatedRow._id);
                        if (existingIndex !== -1) {
                            const newData = [...prev];
                            newData[existingIndex] = updatedRow;
                            return newData;
                        } else {
                            return [...prev, updatedRow];
                        }
                    });
                }
            }
        }
        setRowData(updatedData);
        setValue('tableData', updatedData);
    }

    function handleCancelClick(index) {
        const updatedData = [...rowData];

        if (updatedData[index]?.refNo === "") {
            updatedData.splice(index, 1);
        } else {
            updatedData[index].isEdit = false;
            if (params.sellInvoiceId) {
                if (!updatedData[index]?._id) {
                    setNewRows(prev => [...prev, updatedData[index]]);
                } else {
                    setUpdatedRows(prev => {
                        const updatedRow = { ...updatedData[index] };
                        const existingIndex = prev.findIndex((row) => row._id === updatedRow._id);
                        if (existingIndex !== -1) {
                            const newData = [...prev];
                            newData[existingIndex] = updatedRow;
                            return newData;
                        } else {
                            return [...prev, updatedRow];
                        }
                    });
                }
            }
        }
        setRowData(updatedData);
        setValue('tableData', updatedData);
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
        setValue('tableData', updatedData);
    }

    const onSubmit = async (data) => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        if (!params.sellInvoiceId) {
            createInvoiceApiCall(data);
        } else {
            updateInvoiceApiCall(data);
        }
    }

    const createInvoiceApiCall = async (data) => {
        try {
            const payload = {};
            payload.customer = data?.customerName?.value;
            payload.address = data?.address;
            payload.shipTo = data?.shipTo;
            payload.terms = data?.terms;
            payload.items = rowData?.map((item, index) => {
                delete item.isEdit;
                return item;
            });

            const response = await axiosClient.post('/invoice/create',
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

    const updateInvoiceApiCall = async (data) => {
        try {
            const payload = {};
            payload.sellInvoiceId = params.sellInvoiceId;
            payload.customer = data?.customerName?.value;
            payload.address = data?.address;
            payload.shipTo = data?.shipTo;
            payload.terms = data?.terms?.toString();
            payload.newItems = newRows?.map((item) => { delete item.isEdit; return item; });
            payload.updatedItems = updatedRows?.map((item) => { delete item.isEdit; return item; });
            payload.removedItems = removedRows?.map((item) => { return item._id; });

            const response = await axiosClient.post('/invoice/update',
                payload,
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
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
                    <span className="px-[10px] text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">
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
                                : <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{description != '' ? description : '--'}</span>
                        }
                    </>
                )
            }
        },

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
                                : <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{carats} CT</span>
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
            label: '',
            key: 'actions',
            type: 'action',
            render: (item, index) => {
                return <td className="tbl-action">
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
        },
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
                    <th colSpan={2} >
                        <strong>Total</strong>
                    </th>
                    <th colSpan={1}></th>
                    <th className='!text-start'>
                        <strong>{getColumnTotal('carats').toFixed(2)} CT</strong>
                    </th>
                    <th colSpan={1}></th>
                    <th className='!text-start'>
                        <strong>{getCurrency(getColumnTotal('price'))}</strong>
                    </th>
                    <th colSpan={2}></th>
                </tr>
            </tfoot>
        );
    }

    return (
        loading ? <Loader /> :
            <div className="w-full h-full p-[20px] max-w-[100rem] flex flex-col mx-auto">
                <div className="w-full flex justify-between items-center mb-[24px]">
                    <h6 className="text-[16px]">Create Sell Invoice</h6>
                </div>

                <div className='relative flex-1 border border-[rgba(0,0,0,0.1)] rounded-[12px] p-[30px]'>
                    <div className='w-full flex justify-between items-center mb-[20px]'>
                        <h6 className='text-[16px]'>Customer Details</h6>
                        <div className='flex gap-[12px]'>
                            {!params.memoId && <button
                                className='w-[220px] h-full min-w-[130px] py-[17.5px] md-2:py-[15.5px] bg-[#1E1E1E] text-white rounded-[10px]'
                                onClick={() => navigate('/customer/add')}
                            >
                                + Add Customer
                            </button>}
                            <button
                                className='w-[150px] h-full min-w-[130px] py-[17.5px] md-2:py-[15.5px] bg-[#1E1E1E] text-white rounded-[10px]'
                                onClick={() => setIsPreview(q => !q)}
                            >
                                Preview
                            </button>
                        </div>
                    </div>

                    <form className="stock-add" autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                        <div className='w-full flex items-center gap-[10px]'>
                            <SelectField
                                {...{
                                    id: 8,
                                    name: "customerName",
                                    label: "Bill To",
                                    type: "SELECT",
                                    placeholder: "Select Customer",
                                    options: [
                                        { value: "1", label: "Customer 1" },
                                        { value: "2", label: "Customer 2" }
                                    ],
                                    rule: {
                                        required: "*Bill To is required"
                                    },
                                }}
                                errors={errors}
                                control={control}
                                options={customerOptions}
                                isSearchable={true}
                            />
                            <InputField
                                {...{
                                    id: 9,
                                    name: "invoiceNumber",
                                    label: "Invoice Number",
                                    type: "INPUT",
                                    placeholder: "Enter Invoice Number",
                                }}
                                readOnly={true}
                                register={register}
                                errors={errors}
                            />
                        </div>
                        <div className='w-full flex items-center gap-[10px]'>
                            <InputField
                                {...{
                                    id: 10,
                                    name: "address",
                                    label: "Address",
                                    type: "INPUT",
                                    placeholder: "Enter Address",
                                    rule: {
                                        required: "*Address is required"
                                    },
                                }}
                                register={register}
                                errors={errors}
                            />
                        </div>
                        <div className='w-full flex items-center gap-[10px]'>
                            <InputField
                                {...{
                                    id: 11,
                                    name: "shipTo",
                                    label: "Ship To",
                                    type: "INPUT",
                                    placeholder: "Enter Ship To",
                                    rule: {
                                        required: "*Ship To is required"
                                    },
                                }}
                                register={register}
                                errors={errors}
                            />
                        </div>
                        <div className='w-full flex items-center gap-[10px]'>
                            <InputField
                                {...{
                                    id: 12,
                                    name: "terms",
                                    label: "Terms (In Days)",
                                    type: "INPUT",
                                    placeholder: "Enter Terms",
                                    rule: {
                                        required: "*Terms is required"
                                    },
                                }}
                                value={terms}
                                register={register}
                                errors={errors}
                            />
                            <InputField
                                {...{
                                    id: 13,
                                    name: "dueDate",
                                    label: "Due Date",
                                    type: "INPUT",
                                    placeholder: "Due Date will be auto-calculated",
                                    readOnly: true
                                }}
                                value={dueDate}
                                register={register}
                                errors={errors}
                            />
                        </div>
                    </form>

                    <div>
                        <div className='w-full block md:flex items-center justify-between'>
                            <h2>Items</h2>
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
                            {!params.memoId && <button
                                type='button'
                                className='w-[150px] h-[48px] outline-none rounded-[12px] border-[2px] border-[#342C2C] border-solid text-[16px]'
                                onClick={() => {
                                    reset();
                                    setRowData([]);
                                }}
                            >
                                Reset
                            </button>}
                            {params.memoId && <button
                                type='button'
                                className='w-[150px] h-[48px] outline-none rounded-[12px] border-[2px] border-[#342C2C] border-solid text-[16px]'
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>}
                            <button
                                type='submit'
                                className='w-[150px] h-[48px] outline-none rounded-[12px] bg-[#342C2C] text-white text-[16px]'
                                onClick={handleSubmit(onSubmit)}
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                </div >
            </div >
    )
}

export default SellInvoiceAdd