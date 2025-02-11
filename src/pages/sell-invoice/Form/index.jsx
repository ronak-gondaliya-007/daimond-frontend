import axiosClient from 'api/AxiosClient';
import { deleteRedIcon } from 'assets/utils/images';
import InputField, { CommonInput } from 'components/FormFields/InputField';
import SelectField from 'components/FormFields/SelectField'
import Loader from 'components/loader';
import NoDataFound from 'components/no-data-found';
import { Button, Divider, Input, Select, Space, Table } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCurrency } from 'utils';

const initialRows = {
    refNo: null,
    description: "",
    carat: "0.00",
    pricePerCarat: "0.00",
    price: "0.00",
    remarks: "",
    isEdit: true
};

const SellInvoiceAdd = () => {
    const navigate = useNavigate();
    const params = useParams();

    const { register, handleSubmit, control, formState: { errors }, watch, setValue, reset } = useForm({ defaultValues: {} });

    const [selectOptions, setSelectOptions] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [removedRows, setRemovedRows] = useState([]);
    const [customerOptions, setCustomerOptions] = useState([]);
    const [isPreview, setIsPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dueDate, setDueDate] = useState('');
    const [addRefNo, setAddRefNo] = useState("")

    const isFetchingRef = useRef(false);

    const selectedCustomer = watch("customerName");
    const terms = watch("terms");

    useEffect(() => {
        if (terms && !isNaN(terms)) {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + parseInt(terms));
            const formattedDueDate = currentDate.toISOString().split('T')[0];
            setDueDate(formattedDueDate);
            setValue('dueDate', formattedDueDate);
        } else {
            setDueDate('');
            setValue('dueDate', '');
        }
    }, [terms, setValue]);

    useEffect(() => {
        if (isFetchingRef.current) return;
        fetchData();
    }, [params.sellInvoiceId]);

    useEffect(() => {
        if (selectedCustomer) {
            setValue('address', selectedCustomer?.address);
        }
    }, [selectedCustomer, setValue]);

    useEffect(() => {
        if (rowData.length === 0) {
            setRowData([initialRows]);
        }
    }, [!params.sellInvoiceId]);

    const fetchData = async () => {
        setLoading(true);
        try {
            await handleCustomerList();

            await fetchStockList();

            if (!params.sellInvoiceId) await fetchNextInvoiceNumber();

            if (params.sellInvoiceId) await fetchInvoiceDetail(params.sellInvoiceId);

        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    };

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

    const fetchStockList = async () => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
        try {
            const response = await axiosClient.get('/invoice/fetch-stock-list',
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                const responseData = response?.data?.data;
                const options = responseData.map(item => ({
                    ...item,
                    carat: item?.carat?.toString()
                }));
                setSelectOptions(options);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            isFetchingRef.current = false;
            setLoading(false);
        }
    };

    const fetchNextInvoiceNumber = async () => {
        try {
            const response = await axiosClient.get('/invoice/fetch-invoice-number',
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                const responseData = response.data.data;

                setValue('invoiceNumber', responseData);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
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

                const updatedRowData = responseData.invoiceItems.map(item => ({
                    ...item,
                    carat: item?.carat?.toString(),
                    stockId: item?.stockId || null
                }));
                setRowData(updatedRowData);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    async function handleChange(e, index) {
        const { name } = e.target;
        let value = e.target.value;
        if (['carat', 'pricePerCarat', 'price'].includes(name)) {
            value = e.target.value.replace(/[^0-9.]/g, '');
            if ((value.match(/\./g) || []).length > 1) {
                value = value.replace(/\.+$/, '');
            }
        }

        const updatedData = rowData.map((item, idx) => idx === index ? { ...item, [name]: value } : item);
        if (name === 'carat' || name === 'pricePerCarat') {
            const carats = parseFloat(updatedData[index].carat) || 0;
            const pricePerCarat = parseFloat(updatedData[index].pricePerCarat) || 0;
            const amount = parseFloat(carats * pricePerCarat).toFixed();

            updatedData[index].price = amount;
        }
        setRowData(updatedData);
        setValue('tableData', updatedData);
    }

    async function handleShippingCharge(e) {
        let value = e.target.value;

        value = e.target.value.replace(/[^0-9.]/g, '');
        if ((value.match(/\./g) || []).length > 1) {
            value = value.replace(/\.+$/, '');
        }

        setValue('shippingCharge', value);
    }

    function handleDeleteClick(index) {
        if (params.sellInvoiceId) {
            if (!rowData[index]?._id) {
                setRowData(prev => {
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

    function handleAddItemsClick() {
        const updatedData = [...rowData, {
            refNo: "",
            description: "",
            carat: "",
            pricePerCarat: "",
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
        console.log("Data : ", data);

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
            payload.shippingCharge = data?.shippingCharge;
            payload.invoiceNumber = data?.invoiceNumber;
            payload.items = rowData?.map((item) => {
                delete item.diamondName;
                delete item.isEdit;
                return item;
            }).filter(Boolean);

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

            payload.items = rowData?.map((item) => {
                if (item.refNo !== null) {
                    delete item.diamondName;
                    delete item.isEdit;
                    delete item?.manualEntry;
                    return item;
                }
            }).filter(Boolean);
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

    const isExitingRefNo = (refNo) => {
        const existingItem = rowData.find((item) => item.refNo === refNo);
        return !!existingItem;
    }

    const handleAdd = (index) => {
        if (!addRefNo) return;

        if (isExitingRefNo(addRefNo)) {
            toast.info("The reference number you entered already exists in the memo. Please verify and try again.");
            return;
        }

        const updatedData = rowData.map((item, idx) => idx === index ? { ...item, ...initialRows, refNo: addRefNo } : item);
        setRowData([...updatedData, initialRows]);
        setValue('tableData', updatedData);
        setAddRefNo('');
    }

    const columns = [
        {
            title: 'SR No',
            key: 'srNo',
            dataIndex: 'srNo',
            type: 'custom',
            render: (_, row, index) => {
                const srNo = index + 1;
                return (
                    <span className="text-[14px] font-medium text-[#0A112F] text-center line-clamp-2">
                        {srNo}
                    </span>
                );
            }
        },
        {
            title: 'Ref No',
            key: 'refNo',
            dataIndex: 'refNo',
            type: 'custom',
            render: (_, { refNo }, index) => {
                return (
                    <>
                        {
                            !!refNo
                                ? <h2>{refNo}</h2>
                                : <Select
                                    showSearch
                                    placeholder="Select a refNo"
                                    filterOption={(input, option) =>
                                        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                                    }
                                    className='w-[200px] h-[40px]'
                                    value={refNo}
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider style={{ margin: '8px 0' }} />
                                            <Space style={{ padding: '0 8px 4px' }}>
                                                <Input
                                                    value={addRefNo}
                                                    placeholder="Please enter refNo"
                                                    onChange={(e) => setAddRefNo(e.target.value)}
                                                    onKeyDown={(e) => e.stopPropagation()}
                                                />
                                                <Button type="text" style={{ color: '#1677ff' }} onClick={() => handleAdd(index)}>
                                                    + Add Manual item
                                                </Button>
                                            </Space>
                                        </>
                                    )}
                                    onChange={(e) => {
                                        const refNoToFind = e

                                        if (isExitingRefNo(refNoToFind)) {
                                            toast.info("The reference number you entered already exists in the memo. Please verify and try again.");
                                            return;
                                        }

                                        const fieldData = selectOptions.find((e) => e.refNo === refNoToFind);
                                        const updatedData = rowData.map((item, idx) => idx === index ? { ...item, ...fieldData } : item);
                                        setRowData([...updatedData, initialRows]);
                                        setValue('tableData', updatedData);
                                    }}
                                >
                                    {
                                        selectOptions.map((item, index) => (
                                            <Select.Option key={index} className="memo-option" value={item.refNo}>
                                                <div>
                                                    <h5>{item.diamondName}</h5>
                                                    <p>Ref No: {item.refNo} | Available Carat: {item.carat} CT</p>
                                                </div>
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                        }
                    </>
                )
            }
        },
        {
            title: 'Description',
            key: 'description',
            dataIndex: 'description',
            type: 'custom',
            render: (_, { description }, index) => {
                return (
                    <CommonInput
                        name={"description"}
                        value={description}
                        placeholder={"Description"}
                        onChange={(e) => handleChange(e, index)}
                    />
                )
            }
        },
        {
            title: 'Carats',
            key: 'carat',
            dataIndex: 'carat',
            type: 'custom',
            render: (_, { carat }, index) => {
                return (
                    <CommonInput
                        name={"carat"}
                        value={carat}
                        placeholder={"Carats"}
                        onChange={(e) => handleChange(e, index)}
                    />
                )
            }
        },
        {
            title: 'Price Per Carat',
            key: 'pricePerCarat',
            dataIndex: 'pricePerCarat',
            type: 'custom',
            render: (_, { pricePerCarat }, index) => {
                return (
                    <CommonInput
                        name={"pricePerCarat"}
                        value={pricePerCarat}
                        placeholder={"Price Per Carat"}
                        onChange={(e) => handleChange(e, index)}
                    />
                )
            }
        },
        {
            title: 'Amount',
            key: 'price',
            dataIndex: 'price',
            type: 'custom',
            render: (_, { price }, index) => {
                return (
                    <CommonInput
                        name={"price"}
                        value={price}
                        placeholder={"Price"}
                        onChange={(e) => handleChange(e, index)}
                    />
                )
            }
        },
        {
            title: '',
            key: 'actions',
            dataIndex: 'actions',
            type: 'action',
            render: (_, item, index) => {
                return <td className="tbl-action !w-auto">
                    <div className="flex items-center justify-end gap-[10px]">
                        {
                            item.isEdit
                                ? (<>
                                    <button className="mr-[5px]" onClick={() => handleDeleteClick(index)}>
                                        <img src={deleteRedIcon} alt="Delete" className='max-w-[60px] h-auto' />
                                    </button>
                                </>)
                                : (<>
                                    <button className="mr-[5px]" onClick={() => handleDeleteClick(index)}>
                                        <img src={deleteRedIcon} alt="Delete" className='max-w-[60px] h-auto' />
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

    return (
        loading ? <Loader /> :
            <div className="w-full h-full p-[20px] max-w-[100rem] flex flex-col mx-auto">
                <div className="w-full flex justify-between items-center mb-[24px]">
                    <h6 className="text-[16px]">Overview</h6>
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
                                    options: [],
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
                                    name: "shippingCharge",
                                    label: "Shipping Charge",
                                    type: "INPUT",
                                    placeholder: "Enter Shipping Charge",
                                    rule: {
                                        pattern: {
                                            value: /^[0-9]+(\.[0-9]+)?$/,
                                            message: "*Invalid Shipping Charge"
                                        }
                                    },
                                }}
                                onInput={handleShippingCharge}
                                register={register}
                                errors={errors}
                            />
                            <InputField
                                {...{
                                    id: 13,
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
                                    id: 14,
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
                            <Table
                                columns={columns}
                                dataSource={rowData}
                                pagination={false}
                                className='memo-table'
                                summary={() => (
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell index={0} colSpan={3} className="total-summary-cell">
                                            Total
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={1} colSpan={2} className="total-summary-cell">
                                            {getColumnTotal('carat').toFixed(2)} CT
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={2} colSpan={2} className="total-summary-cell">
                                            {getCurrency(getColumnTotal('price'))}
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                )}
                            />
                        </div>

                        <div className='w-full flex items-center justify-end gap-[20px]'>
                            {!params.sellInvoiceId && <button
                                type='button'
                                className='w-[150px] h-[48px] outline-none rounded-[12px] border-[2px] border-[#342C2C] border-solid text-[16px]'
                                onClick={() => {
                                    reset();
                                    setRowData([]);
                                }}
                            >
                                Reset
                            </button>}
                            {params.sellInvoiceId && <button
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

                </div>
            </div>
    )
}

export default SellInvoiceAdd