import PhoneInputField from 'components/FormFields/PhoneInputField/PhoneInputField';
import SelectField from 'components/FormFields/SelectField';
// import Table from 'components/table';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getCurrency } from 'utils';
import { button1, button2, writeIcon, wrongIcon } from "assets/utils/images";
import axiosClient from 'api/AxiosClient';
import { toast } from 'react-toastify';
import NoDataFound from 'components/no-data-found';
import Loader from 'components/loader';
import InputField, { CommonInput } from 'components/FormFields/InputField';
import { Button, Divider, Input, Select, Space, Table } from 'antd';

const selectOptions = [
    {
        refNo: "SK201U",
        description: "",
        carats: "2",
        pricePerCarat: "557",
        returnInCarats: "",
        soldInCarats: "",
        price: "5",
        remarks: "",
    },
    {
        refNo: "RJ201U",
        description: "",
        carats: "0.5",
        pricePerCarat: "237",
        returnInCarats: "",
        soldInCarats: "",
        price: "7",
        remarks: "",
    },
    {
        refNo: "PK533O",
        description: "",
        carats: "0.8",
        pricePerCarat: "237",
        returnInCarats: "",
        soldInCarats: "",
        price: "11",
        remarks: "",
    }
];

const initialRows = {
    refNo: null,
    description: "",
    carats: "0.00",
    pricePerCarat: "0.00",
    returnInCarats: "0.00",
    soldInCarats: "0.00",
    price: "0.00",
    remarks: "",
    isEdit: true
};

const CreateMemo = () => {
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
    const [addRefNo, setAddRefNo] = useState("")

    const isFetchingRef = useRef(false);
    const timeoutRef = useRef(null);

    const selectedCustomer = watch("customerName");

    useEffect(() => {
        if (isFetchingRef.current) return;
        handleCustomerList();
        if (params.memoId) fetchMemoDetail(params.memoId);
    }, [params.memoId]);

    useEffect(() => {
        if (selectedCustomer) {
            setValue('contactInfo', selectedCustomer?.phone);
            setValue('address', selectedCustomer?.address);
        }
    }, [selectedCustomer, setValue]);

    useEffect(() => {
        if (rowData.length === 0) {
            // const initialRows = Array.from({ length: 5 }, () => ({
            //     refNo: null,
            //     description: "",
            //     carats: "",
            //     pricePerCarat: "",
            //     returnInCarats: "",
            //     soldInCarats: "",
            //     isEdit: true
            // }));
            setRowData([initialRows]);
        }
    }, [!params.memoId]);

    const handleCustomerList = async () => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
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
            setLoading(false);
        }
    };

    const fetchMemoDetail = async (memoId) => {
        try {
            const response = await axiosClient.post('/memo/detail',
                { memoId },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                const responseData = response.data.data;
                setValue('customerName', {
                    label: responseData?.customer?.name, value: responseData?.customer?._id,
                    phone: responseData?.customer?.phone, address: responseData?.customer?.address
                });

                setRowData(responseData.memoItems);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const fetchStockDetail = async (refNo, index) => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
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
            setLoading(false);
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
        if (['carats', 'pricePerCarat', 'returnInCarats', 'soldInCarats', 'price'].includes(name)) {
            value = e.target.value.replace(/[^0-9.]/g, '');
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
        if (params.memoId) {
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
            if (params.memoId) {
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

    function handleCancelClick(index) {
        const updatedData = [...rowData];

        if (updatedData[index]?.refNo === "") {
            updatedData.splice(index, 1);
        } else {
            updatedData[index].isEdit = false;
            if (params.memoId) {
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

        if (!params.memoId) {
            createMemoApiCall(data);
        } else {
            updateMemoApiCall(data);
        }
    }

    const createMemoApiCall = async (data) => {
        try {
            const payload = {};
            payload.customer = data?.customerName?.value;
            payload.items = rowData?.map((item, index) => {
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

    const updateMemoApiCall = async (data) => {
        try {
            const payload = {};
            payload.memoId = params.memoId;
            payload.customer = data?.customerName?.value;
            payload.newItems = newRows?.map((item) => { delete item.isEdit; return item; });
            payload.updatedItems = updatedRows?.map((item) => { delete item.isEdit; return item; });
            payload.removedItems = removedRows?.map((item) => { return item._id; });

            const response = await axiosClient.post('/memo/update',
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
            toast.info("Ref no is already exist");
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
                console.log(row, index)
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
                                    className='w-[150px] h-[50px]'
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
                                                <Button type="text" onClick={() => handleAdd(index)}>
                                                    Add item
                                                </Button>
                                            </Space>
                                        </>
                                    )}
                                    onChange={(e) => {
                                        const refNoToFind = e

                                        if (isExitingRefNo(refNoToFind)) {
                                            toast.info("Ref no is already exist");
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
                                                    <h5>{item.refNo}</h5>
                                                    <p>SKU: Item {item.carats} sku Purchase Rate: Rs. {item.pricePerCarat}</p>
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
            key: 'carats',
            dataIndex: 'carats',
            type: 'custom',
            render: (_, { carats }, index) => {
                return (
                    <CommonInput
                        name={"carats"}
                        value={carats}
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
                        placeholder={"PricePerCarat"}
                        onChange={(e) => handleChange(e, index)}
                    />
                )
            }
        },
        {
            title: 'Return In Carats',
            key: 'returnInCarats',
            dataIndex: 'returnInCarats',
            type: 'custom',
            render: (_, { returnInCarats }, index) => {
                return (
                    <CommonInput
                        name={"returnInCarats"}
                        value={returnInCarats}
                        placeholder={"ReturnInCarats"}
                        onChange={(e) => handleChange(e, index)}
                    />
                )
            }
        },
        {
            title: 'Sold In Carats',
            key: 'soldInCarats',
            dataIndex: 'soldInCarats',
            type: 'custom',
            render: (_, { isEdit, soldInCarats }, index) => {
                return (
                    <CommonInput
                        name={"soldInCarats"}
                        value={soldInCarats}
                        placeholder={"SoldInCarats"}
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
            title: 'Remarks',
            key: 'remarks',
            dataIndex: 'remarks',
            type: 'custom',
            render: (_, { remarks }, index) => {
                return (
                    <CommonInput
                        name={"remarks"}
                        value={remarks}
                        placeholder={"Remarks"}
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
                                    {/* <button onClick={() => handleSaveClick(index)}>
                                        <img src={writeIcon} alt="View" className='create-memo-icon' />
                                    </button> */}
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
                            {loading && <Loader />}
                        </div>
                    </div>

                    <form className="stock-add" autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
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
                                        <Table.Summary.Cell index={0} colSpan={3} style={{ fontWeight: "bold" }}>
                                            Total Price:
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={1} colSpan={4} style={{ fontWeight: "bold" }}>
                                            {getColumnTotal('carats').toFixed(2)} CT
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={2} colSpan={3} style={{ fontWeight: "bold" }}>
                                            {getCurrency(getColumnTotal('price'))}
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                )}
                            />
                            {/* {rowData?.length === 0 ? (
                                <NoDataFound message="Oops! No stocks found." />
                            ) : (
                                <Table
                                    columns={columns}
                                    data={rowData}
                                    tableClass="stock-table"
                                    tableFooter={tableFooter()}
                                />)} */}
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
                </div>

            </div>
        </>
    )
}

export default CreateMemo;