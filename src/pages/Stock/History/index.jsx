import { button, closeIcon, diamondIcon } from "assets/utils/images";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getDate, getTime } from "utils/dateFormat";

const HistoryPopup = ({ rows, onClose }) => {
    const navigate = useNavigate();
    console.log(rows);

    const handleClick = (item) => {
        if (item.activity === 'Sold') {
            navigate(`/sell-invoice/preview/${item.activityId}`);
        } else {
            navigate(`/memo/preview/${item.activityId}`);
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="flex flex-col h-full bg-white p-6 sm:p-8 rounded-xl shadow-2xl max-w-6xl w-full mx-4 max-h-[90vh] relative overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-center border-b pb-4 sticky top-0 bg-white z-50">
                    <h2 className="text-2xl font-semibold text-gray-800">📊 Stock History</h2>
                    <button
                        className="bg-transparent border-none cursor-pointer"
                        onClick={onClose}
                    >
                        <img src={closeIcon} alt="Close Icon" />
                    </button>
                </div>

                {/* Inline Stats Boxes */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="flex flex-col justify-between bg-gradient-to-r from-[rgba(59,130,246,0.9)] via-[rgba(37,99,235,0.9)] to-[rgba(29,78,216,0.9)] p-6 rounded-xl shadow-lg text-white text-center">
                        <h3 className="text-lg font-semibold">Total Available</h3>
                        <div className="text-[20px] px-[24px] font-bold flex justify-between">
                            <span>{rows.availableCarat}</span>
                            <span>189.38%</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between bg-gradient-to-r from-[rgba(34,197,94,0.9)] via-[rgba(22,163,74,0.9)] to-[rgba(21,128,61,0.8)] p-6 rounded-xl shadow-lg text-white text-center">
                        <h3 className="text-lg font-semibold">Sold</h3>
                        <div className="text-[20px] px-[24px] font-bold flex justify-between">
                            <span>{rows.soldCarat}</span>
                            <span>189.38%</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between bg-gradient-to-r from-[rgba(234,179,8,0.9)] via-[rgba(202,138,4,0.9)] to-[rgba(161,98,7,0.8)] p-6 rounded-xl shadow-lg text-white text-center">
                        <h3 className="text-lg font-semibold">Memo</h3>
                        <div className="text-[20px] px-[24px] font-bold flex justify-between">
                            <span>{rows.memoCarat}</span>
                            <span>189.38%</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between bg-gradient-to-r from-[rgba(239,68,68,0.8)] via-[rgba(220,38,38,0.8)] to-[rgba(185,28,28,0.7)] p-6 rounded-xl shadow-lg text-white text-center">
                        <h3 className="text-lg font-semibold">Total Carat</h3>
                        <div className="text-[20px] px-[24px] font-bold flex justify-between">
                            <span>{rows.carat}</span>
                            <span>189.38%</span>
                        </div>
                    </div>
                </div>

                {/* Table Wrapper */}
                <div className="mt-4 flex-1 overflow-auto">
                    <div className="h-full border border-gray-300 rounded-md overflow-hidden">
                        <table className="w-full border-collapse">
                            <thead className="block w-full sticky top-0 bg-white z-10 border-b border-gray-300">
                                <tr className="flex w-full text-sm text-black text-left font-medium">
                                    <th className="p-4 w-60">Added By</th>
                                    <th className="p-4 flex-1">Reference</th>
                                    <th className="p-4 flex-1">Activity</th>
                                    <th className="p-4 w-40">Carat</th>
                                    <th className="p-4 flex-1">Action Date</th>
                                    <th className="p-4 w-20"></th>
                                </tr>
                            </thead>

                            {/* Scrollable Table Body */}
                            <div className="block max-h-[60vh] overflow-y-auto">
                                <tbody className="block w-full text-gray-800">
                                    {rows.historyData && rows.historyData.length > 0 ? (
                                        rows.historyData.map((row, index) => (
                                            <tr key={index} className="flex w-full border-b bg-white hover:bg-gray-100 transition">
                                                <td className="p-4 w-60">
                                                    <div className="flex items-center gap-[10px] max-w-[240px]">
                                                        <img src={row.addedBy.profilePic !== '' ? `${process.env.REACT_APP_IMAGE_URL}${row.addedBy.profilePic}` : diamondIcon} alt="Diamond" />
                                                        <div className="flex flex-col items-start">
                                                            <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{row.addedBy.fullName}</span>
                                                            <span className="text-[12px] font-medium text-[#0A112F]">{row.addedBy.userType}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 flex-1">{row.id}</td>
                                                <td className="p-4 flex-1">{row.activity}</td>
                                                <td className="p-4 w-40">{row.carat}</td>
                                                <td className="p-4 flex-1">{getDate(new Date(row.createdAt))} {getTime(new Date(row.createdAt))}</td>
                                                <td className="p-4 w-20">
                                                    <button onClick={() => handleClick(row)}>
                                                        <img src={button} alt="View" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className="flex w-full">
                                            <td colSpan="5" className="text-center p-6 text-gray-500 w-full">🚫 No history available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </div>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryPopup;
