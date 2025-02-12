import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import axiosClient from "api/AxiosClient";

import PurchaseForm from "./Form";

import Search from "components/search";
import Table from "components/table";
import DetailPopup from 'components/popup/Detail';
import DeletePopup from "components/popup/Delete";
import Loader from "components/loader";
import NoDataFound from "components/no-data-found";

import { getDate, getTime } from "utils/dateFormat";

import { diamondIcon, button, button1, button2, arrowDown, arrowUp } from "assets/utils/images";
import SelectField from "components/FormFields/SelectField";
import { useForm } from "react-hook-form";
import RangeSlider from 'react-range-slider-input';
import RangeInputField from "components/FormFields/RangeInputField";

const Purchase = () => {
    const navigate = useNavigate();

    const [purchaseData, setPurchaseData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'Desc' });
    const [selectedItem, setSelectedItem] = useState(null);
    const [range, setRange] = useState([1, 100]);
    const [isOpen, setIsOpen] = useState(false)
    const [showSkippedPopup, setShowSkippedPopup] = useState(false);

    const isFetchingRef = useRef(false);

    const columns = [
        {
            label: 'Diamond name and Id',
            key: 'diamondName',
            type: 'custom',
            render: (item) => {
                return <div className="flex items-center gap-[10px] max-w-[240px]">
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
            label: 'Type',
            key: 'type',
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
            label: 'Polish',
            key: 'polish',
            sortable: true
        },
        {
            label: 'Date',
            key: 'createdAt',
            type: 'custom',
            render: ({ createdAt }) => {
                return <span className="text-[14px] font-medium text-[#0A112F]">{getDate(createdAt)} {getTime(createdAt)}</span>
            },
            sortable: true
        },
        {
            label: '',
            key: 'actions',
            type: 'action',
            render: (item) => {
                return <td className="tbl-action">
                    <div className="flex items-center justify-end gap-[10px]">
                        <button onClick={() => handleActionClick('view', item)}>
                            <img src={button} alt="View" />
                        </button>
                        <button onClick={() => handleActionClick('delete', item)}>
                            <img src={button1} alt="Delete" />
                        </button>
                        <button className="mr-[5px]" onClick={() => handleActionClick('edit', item)}>
                            <img src={button2} alt="Edit" />
                        </button>
                    </div>
                </td>
            }
        },
    ];

    const handleClosePopup = () => {
        setSelectedItem(null);
        setShowSkippedPopup(false);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        fetchPurchases(1, query);
    };

    useEffect(() => {
        if (isFetchingRef.current) return;
        fetchPurchases(currentPage, searchQuery, sortConfig.key, sortConfig.direction);
    }, [currentPage, searchQuery, sortConfig]);

    const handleSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'Asc' ? 'Desc' : 'Asc';
        setSortConfig({ key, direction });
        fetchPurchases(1, searchQuery, key, direction);
    };

    const fetchPurchases = async (page = 1, searchQuery = "", sortKey = "createdAt", sortDirection = "Asc") => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
        try {
            const response = await axiosClient.post('/purchase/all-purchases',
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
                // toast.success(response?.data?.message);
                setPurchaseData(response.data.data.docs);
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

    const fetchPurchaseDetail = async (action, item) => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
        try {
            const response = await axiosClient.post(`/purchase/detail`,
                { purchaseId: item._id },
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

    const deletePurchase = async (action, item) => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
        try {
            const response = await axiosClient.post(`/purchase/delete`,
                { purchaseId: item._id },
                { headers: { 'Content-Type': 'application/json' } });

            if (response.status === 200) {
                toast.success(response?.data?.message);
                setSelectedItem({ action, item: response.data.data });
                handleClosePopup();
                onStatusChange('delete', item._id);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    }

    const onStatusChange = (action, purchaseId) => {
        if (action === 'delete') {
            setPurchaseData((prevData) => prevData.filter(item => item._id !== purchaseId));
        }
    };

    const handleActionClick = async (action, item) => {
        switch (action) {
            case 'view':
                fetchPurchaseDetail(action, item);
                break;
            case 'edit':
                navigate(`/purchase/edit/${item._id}`);
                break;
            case 'delete':
                setSelectedItem({ action, item });
                break;
            default:
                break;
        }
    };

    const handleFilter = (data) => {
        setIsOpen(q => !q)
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="w-full p-[20px] max-w-[100rem] mx-auto">
            <div className="w-full flex justify-between items-center mb-[24px]">
                <h6 className="text-[16px]">Overview</h6>
            </div>
            <Search
                placeholder="Search by: diamond ID, diamond name, etc..."
                searchQuery={searchQuery}
                onSearch={handleSearch}
                addBtn={{
                    title: '+ Add New',
                    onClick: () => navigate('/purchase/add')
                }}
                handleFilterClick={() => setIsOpen(q => !q)}
            />
            {isOpen ? <FilterPopup range={range} setRange={setRange} onSubmit={handleFilter} /> : <></>}
            <div className="my-[30px] stock-table">
                {purchaseData?.length === 0 ? (
                    <NoDataFound message="Oops! No purchase found." />
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
                        data={purchaseData}
                        tableClass="stock-table"
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>

            {selectedItem && selectedItem.action === 'view' && <DetailPopup item={selectedItem.item} onClose={handleClosePopup} />}
            {selectedItem && selectedItem.action === 'delete' && (<DeletePopup item={selectedItem.item} onClose={handleClosePopup} onDelete={() => deletePurchase(selectedItem.action, selectedItem.item)} inlineKeys={["diamondId", "diamondName"]} />)}
            {selectedItem && selectedItem.action === 'edit' && <PurchaseForm data={selectedItem} />}
        </div>
    );
};

const Row = ({ row, getComponent }) => (
    <div key={row.id} className='w-full flex gap-[10px]'>
        {
            row.childrens.map((field) => getComponent(field))
        }
    </div>
)

export const FilterPopup = ({ range, setRange, onSubmit }) => {
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        defaultValues: {
            location: { value: "All", label: "All" },
            shape: { value: "All", label: "All" },
            status: { value: "All", label: "All" }
        }
    });

    const getComponent = (field) => {
        switch (field.type) {
            case "ROW":
                return <Row row={field} getComponent={getComponent} />;

            case "RANGE_INPUT":
                return (
                    <RangeInputField
                        {...field}
                        readOnly={field.readOnly}
                        register={register}
                        errors={errors}
                    />
                );

            case "SELECT":
                return (
                    <SelectField
                        {...field}
                        errors={errors}
                        control={control}
                    />
                );

            default:
                return <></>;
        }
    };

    return (
        <div className="relative">
            <div className="flex items-center gap-[5px] cursor-pointer">
                <div className="mt-[20px] top-[58px] right-[-1px] z-10 w-full max-h-max bg-white border border-[#F1F2F4] rounded-[10px] p-[10px]">
                    <form className="stock-add" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

                        {/* Filters in a row */}
                        <div className="flex flex-row gap-4">
                            {/* Location Filter */}
                            <div className="flex-1">
                                {getComponent({ type: 'SELECT', name: 'location', label: 'Location' })}
                            </div>

                            {/* Shape Filter */}
                            <div className="flex-1">
                                {getComponent({ type: 'SELECT', name: 'shape', label: 'Shape' })}
                            </div>

                            {/* Status Filter */}
                            <div className="flex-1">
                                {getComponent({ type: 'SELECT', name: 'status', label: 'Status' })}
                            </div>

                            {/* Range Filter */}
                            <div className="flex-1">
                                {getComponent({ type: 'RANGE_INPUT', name: 'carat', label: 'Carat' })}
                            </div>
                        </div>

                        {/* Range Slider */}
                        <div className="max-w-[500px] w-full flex flex-col mt-4">
                            <RangeSlider
                                value={range}
                                step={1}
                                min={20}
                                max={80}
                                onInput={setRange}
                            />
                            <div className="flex items-center justify-between mt-3">
                                <span>Min: {range[0]}</span>
                                <span>Max: {range[1]}</span>
                            </div>
                        </div>

                        <div className="flex gap-[20px]">
                            {/* Reset Button */}
                            <button className='text-[16px] px-[40px] py-[10px] border border-[#D5D7DA] rounded-[8px] font-medium text-[ #414651] mt-3'>
                                Reset
                            </button>

                            {/* Submit Button */}
                            <button className='text-[16px] px-[40px] py-[10px] border border-[#D5D7DA] rounded-[8px] font-medium text-[ #414651] mt-3'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Purchase;