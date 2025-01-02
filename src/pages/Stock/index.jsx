import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Table from "../../components/table";
import "../../assets/css/stock.css";

const Stock = () => {
    const headers = ['Diamond Name and ID', 'Ref No', 'Carat', 'Shape', 'Size', 'Color', 'Clarity', 'Polish'];
    const diamonds = [
        { id: 1545, name: 'Phoenix Baker', refNo: 'Ref1', carat: 1.5, shape: 'Round', size: 1.5, color: 'E-G', clarity: 'VVS1', polish: 'VVS1' },
        { id: 2453, name: 'The Oppenheimer Blue diamond', refNo: 'Ref2', carat: 1.2, shape: 'Oval', size: 1.3, color: 'F', clarity: 'VS1', polish: 'VG' },
        { id: 34535, name: 'Diamond 3', refNo: 'Ref3', carat: 1.8, shape: 'Emerald', size: 1.6, color: 'D', clarity: 'IF', polish: 'EX' },
        { id: 4435, name: 'Diamond 4', refNo: 'Ref4', carat: 0.9, shape: 'Pear', size: 1.1, color: 'G', clarity: 'VS2', polish: 'VG' },
        { id: 543254, name: 'Diamond 5', refNo: 'Ref5', carat: 2.0, shape: 'Cushion', size: 1.7, color: 'E', clarity: 'VVS2', polish: 'EX' },
        { id: 64535, name: 'Diamond 6', refNo: 'Ref6', carat: 1.1, shape: 'Marquise', size: 1.4, color: 'F', clarity: 'VS1', polish: 'VG' },
        { id: 742424, name: 'Diamond 7', refNo: 'Ref7', carat: 0.7, shape: 'Heart', size: 0.9, color: 'H', clarity: 'SI1', polish: 'VG' },
        { id: 8421, name: 'Diamond 8', refNo: 'Ref8', carat: 1.3, shape: 'Princess', size: 1.2, color: 'D', clarity: 'IF', polish: 'EX' },
        { id: 9, name: 'Diamond 9', refNo: 'Ref9', carat: 1.0, shape: 'Round', size: 1.0, color: 'E', clarity: 'VS2', polish: 'VG' },
        { id: 10, name: 'Diamond 10', refNo: 'Ref10', carat: 1.7, shape: 'Oval', size: 1.5, color: 'F', clarity: 'VVS1', polish: 'EX' },
        { id: 11, name: 'Diamond 11', refNo: 'Ref11', carat: 0.8, shape: 'Emerald', size: 1.0, color: 'G', clarity: 'SI1', polish: 'VG' },
        { id: 12, name: 'Diamond 12', refNo: 'Ref12', carat: 1.9, shape: 'Pear', size: 1.6, color: 'E', clarity: 'IF', polish: 'EX' },
        { id: 13, name: 'Diamond 13', refNo: 'Ref13', carat: 1.2, shape: 'Cushion', size: 1.1, color: 'F', clarity: 'VS2', polish: 'VG' },
        { id: 14, name: 'Diamond 14', refNo: 'Ref14', carat: 0.6, shape: 'Marquise', size: 0.8, color: 'H', clarity: 'SI1', polish: 'VG' },
        { id: 15, name: 'Diamond 15', refNo: 'Ref15', carat: 1.4, shape: 'Heart', size: 1.3, color: 'D', clarity: 'IF', polish: 'EX' },
        { id: 16, name: 'Diamond 16', refNo: 'Ref16', carat: 1.1, shape: 'Princess', size: 1.0, color: 'E', clarity: 'VS2', polish: 'VG' },
        { id: 17, name: 'Diamond 17', refNo: 'Ref17', carat: 1.8, shape: 'Round', size: 1.6, color: 'F', clarity: 'VVS1', polish: 'EX' },
        { id: 18, name: 'Diamond 18', refNo: 'Ref18', carat: 1.3, shape: 'Oval', size: 1.2, color: 'G', clarity: 'VS1', polish: 'VG' },
        { id: 19, name: 'Diamond 19', refNo: 'Ref19', carat: 0.9, shape: 'Emerald', size: 1.1, color: 'H', clarity: 'SI1', polish: 'VG' },
        { id: 20, name: 'Diamond 20', refNo: 'Ref20', carat: 2.1, shape: 'Pear', size: 1.8, color: 'E', clarity: 'IF', polish: 'EX' },
        { id: 21, name: 'Diamond 21', refNo: 'Ref21', carat: 1.5, shape: 'Cushion', size: 1.3, color: 'F', clarity: 'VS2', polish: 'VG' },
        { id: 22, name: 'Diamond 22', refNo: 'Ref22', carat: 0.7, shape: 'Marquise', size: 0.9, color: 'G', clarity: 'SI1', polish: 'VG' },
        { id: 23, name: 'Diamond 23', refNo: 'Ref23', carat: 1.2, shape: 'Heart', size: 1.1, color: 'H', clarity: 'IF', polish: 'EX' },
        { id: 24, name: 'Diamond 24', refNo: 'Ref24', carat: 0.9, shape: 'Princess', size: 0.8, color: 'D', clarity: 'VS2', polish: 'VG' },
        { id: 25, name: 'Diamond 25', refNo: 'Ref25', carat: 1.6, shape: 'Round', size: 1.4, color: 'E', clarity: 'VVS1', polish: 'EX' },
        { id: 26, name: 'Diamond 26', refNo: 'Ref26', carat: 1.1, shape: 'Oval', size: 1.0, color: 'F', clarity: 'VS1', polish: 'VG' },
        { id: 27, name: 'Diamond 27', refNo: 'Ref27', carat: 0.8, shape: 'Emerald', size: 0.9, color: 'G', clarity: 'SI1', polish: 'VG' },
        { id: 28, name: 'Diamond 28', refNo: 'Ref28', carat: 1.9, shape: 'Pear', size: 1.6, color: 'E', clarity: 'IF', polish: 'EX' },
        { id: 29, name: 'Diamond 29', refNo: 'Ref29', carat: 1.4, shape: 'Cushion', size: 1.2, color: 'F', clarity: 'VS2', polish: 'VG' },
        { id: 30, name: 'Diamond 30', refNo: 'Ref30', carat: 0.6, shape: 'Marquise', size: 0.8, color: 'H', clarity: 'SI1', polish: 'VG' },
        { id: 31, name: 'Diamond 31', refNo: 'Ref31', carat: 1.0, shape: 'Heart', size: 0.9, color: 'D', clarity: 'IF', polish: 'EX' },
        { id: 32, name: 'Diamond 32', refNo: 'Ref32', carat: 1.7, shape: 'Princess', size: 1.5, color: 'E', clarity: 'VS2', polish: 'VG' },
        { id: 33, name: 'Diamond 33', refNo: 'Ref33', carat: 1.2, shape: 'Round', size: 1.1, color: 'F', clarity: 'VVS1', polish: 'EX' }
    ];

    return (
        <div>
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <Table headers={headers} data={diamonds} />
            </div>
        </div>
    );
};

export default Stock;