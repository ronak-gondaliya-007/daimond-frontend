import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Search from "../../components/search";
import Table from "../../components/table";
import "../../assets/css/stock.css";

import { headers, diamonds } from "../../constant";

const Stock = () => {
    return (
        <div>
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <Search />
                <Table headers={headers} data={diamonds} />
            </div>
        </div>
    );
};

export default Stock;