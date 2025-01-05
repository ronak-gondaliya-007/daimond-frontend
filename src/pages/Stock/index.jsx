import Navbar from "components/navbar";
import Sidebar from "components/layout/sidebar/Sidebar";
import Search from "components/search";
import Table from "components/table";
import diamondIcon from '../../assets/images/daimond.svg';
import button from '../../assets/images/button.svg';
import button1 from '../../assets/images/button-1.svg';
import button2 from '../../assets/images/button-2.svg';

// import "assets/css/stock.css";

import { diamonds } from "constant";

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
                    <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{item.name}</span>
                    <span className="text-[12px] font-medium text-[#0A112F]">{item.id}</span>
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
                    <button>
                        <img src={button} alt="View" />
                    </button>
                    <button>
                        <img src={button1} alt="Delete" />
                    </button>
                    <button className="mr-[5px]">
                        <img src={button2} alt="Edit" />
                    </button>
                </div>
            </td>
        }
    },
];

const Stock = () => {
    return (
        <div className="w-full p-[20px]">
            <div className="w-full flex justify-between items-center mb-[24px]">
                <h6 className="text-[16px]">Overview</h6>
            </div>
            <Search />
            <div className="my-[30px] stock-table">
                <Table
                    columns={columns}
                    data={diamonds}
                    tableClass="stock-table"
                />
            </div>
        </div>
    );
};

export default Stock;