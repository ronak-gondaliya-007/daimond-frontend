import Search from "components/search";
import Table from "components/table";
import diamondIcon from 'assets/images/daimond.svg';
import button from 'assets/images/button.svg';
import button1 from 'assets/images/button-1.svg';
import button2 from 'assets/images/button-2.svg';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axiosClient from "api/AxiosClient";
import { toast } from "react-toastify";
import { exportIcon, importIcon } from "assets/utils/images";

import DetailPopup from 'components/popup/Detail';
import DeletePopup from "components/popup/Delete";
import StockForm from "./Form";
import Loader from "components/loader";

const Stock = () => {
    const navigate = useNavigate();

    const [stockData, setStockData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'Asc' });
    const [selectedItem, setSelectedItem] = useState(null);

    const isFetchingRef = useRef(false);

    const columns = [
        {
            label: '',
            key: 'diamondId',
            isCheckbox: true,
            type: 'checkbox'
        },
        {
            label: 'Diamond name and Id',
            key: 'name',
            type: 'custom',
            render: (item) => {
                return <div className="flex items-center gap-[10px]">
                    <img src={diamondIcon} alt="Diamond" />
                    <div className="flex flex-col items-start">
                        <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{item.diamondName}</span>
                        <span className="text-[12px] font-medium text-[#0A112F]">{item.diamondId}</span>
                    </div>
                </div>
            }
        },
        {
            label: 'Ref No',
            key: 'refNo',
        },
        {
            label: 'Carat',
            key: 'carat',
        },
        {
            label: 'Shape',
            key: 'shape',
        },
        {
            label: 'Size',
            key: 'size',
        },
        {
            label: 'Color',
            key: 'color',
        },
        {
            label: 'Clarity',
            key: 'clarity',
        },
        {
            label: 'Polish',
            key: 'polish',
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
    };

    useEffect(() => {
        if (isFetchingRef.current) return;
        fetchStocks(currentPage, searchQuery, sortConfig.key, sortConfig.direction);
    }, [currentPage, searchQuery, sortConfig]);

    const fetchStocks = async (page = 1, searchQuery = "", sortKey = "createdAt", sortDirection = "Asc") => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
        try {
            const response = await axiosClient.post('/stock/all-stocks',
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

    const deleteStock = async (action, item) => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
        try {
            const response = await axiosClient.post(`/stock/delete`,
                { stockId: item._id },
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

    const onStatusChange = (action, stockId) => {
        if (action === 'delete') {
            setStockData((prevData) => prevData.filter(item => item._id !== stockId));
        }
    };

    const handleActionClick = async (action, item) => {
        switch (action) {
            case 'view':
                fetchStockDetail(action, item);
                break;
            case 'edit':
                navigate(`/stock/edit/${item._id}`);
                break;
            case 'delete':
                setSelectedItem({ action, item });
                break;
            default:
                break;
        }
    };

    if (loading) {
        return <Loader />;;
    }

    return (
        <div className="w-full p-[20px] max-w-[100rem] mx-auto">
            <div className="w-full flex justify-between items-center mb-[24px]">
                <h6 className="text-[16px]">Overview</h6>
                <div className="flex flex-row gap-[20px] w-[25%]">
                    <input
                        id="csvInput"
                        type="file"
                        accept=".csv"
                        className="hidden"
                    // onChange={handleImportCSV}
                    />
                    <button
                        className="bg-[#1E1E1E] text-white rounded-[10px] text-white rounded-md flex flex-row px-[15px] py-[10px] gap-[10px] justify-center items-center w-full"
                        onClick={() => document.getElementById("csvInput").click()}
                    >
                        <img src={importIcon} alt="Import CSV" className="h-6 w-6" />
                        <p>Import CSV</p>
                    </button>
                    <button
                        className="bg-[#1E1E1E] text-white rounded-[10px] text-white rounded-md flex flex-row  px-[15px] py-[10px] gap-[10px] justify-center items-center w-full"
                        onClick={() => document.getElementById("csvInput").click()}
                    >
                        <img src={exportIcon} alt="Import CSV" className="h-6 w-6" />
                        <p>Export CSV</p>
                    </button>
                </div>
            </div>
            <Search
                placeholder="Search by: diamond ID, customer name, etc..."
                addBtn={{
                    title: '+ Add New',
                    onClick: () => navigate('/stock/add')
                }}
            />
            <div className="my-[30px] stock-table">
                <Table
                    columns={columns}
                    data={stockData}
                    tableClass="stock-table"
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    onActionClick={handleActionClick}
                />
            </div>

            {selectedItem && selectedItem.action === 'view' && <DetailPopup item={selectedItem.item} onClose={handleClosePopup} />}
            {selectedItem && selectedItem.action === 'delete' && (<DeletePopup item={selectedItem.item} onClose={handleClosePopup} onDelete={() => deleteStock(selectedItem.action, selectedItem.item)} />)}
            {selectedItem && selectedItem.action === 'edit' && <StockForm data={selectedItem} />}
        </div>
    );
};

export default Stock;