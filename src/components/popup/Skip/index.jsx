import React from "react";
import { closeIcon, exclamationIcon } from "assets/utils/images";
import { downloadExcel } from "utils";

const SkipDataPopup = ({ onClose, data }) => {
    const headers = data.skippedStocks && data.skippedStocks.length > 0
        ? Object.keys(data.skippedStocks[0])
        : [];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full relative">
                {/* Header content */}
                <div className={`flex justify-between items-center mb-6 sticky top-0 bg-white z-10`}>
                    <h2 className="text-me font-semibold items-center">Skipped Stock</h2>
                    <button className="cursor-pointer" onClick={onClose} >
                        <img className="w-10 h-10" src={closeIcon} alt="Close Icon" />
                    </button>
                </div>

                {/* Popup content */}
                <div className="flex flex-col items-center justify-center mb-6 bg-white z-10">
                    <p className="text-sm font-medium text-center mb-4">{`You have successfully uploaded ${data.uploadedStock} stocks`}</p>
                    <img
                        className="w-12 mb-2"
                        src={exclamationIcon}
                        alt="Exclamation Icon"
                    />
                    <p className="text-sm text-red-500 text-center">{`${data.skippedStockCount} record${data.skippedStockCount > 1 ? 's' : ''} were skipped`}</p>
                </div>

                {/* Table content */}
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse rounded-lg border border-[#E9EAEB]">
                        {/* Header */}
                        <thead className="bg-[#FAFAFA] sticky top-0 z-10">
                            <tr>
                                {headers.map((header, index) => (
                                    <th key={index} className="px-4 py-2 text-[12px] text-[#0A112F] font-semibold text-left border-b">{header}</th>
                                ))}
                            </tr>
                        </thead>
                    </table>

                    {/* Scrollable Body */}
                    <div className="max-h-[300px] overflow-y-auto">
                        <table className="min-w-full table-auto border-collapse rounded-lg border border-[#E9EAEB]">
                            <tbody>
                                {/* Table Body */}
                                {data.skippedStocks && data.skippedStocks.length > 0 ? (
                                    data.skippedStocks.map((record, index) => (
                                        <tr key={index} className="bg-[#fff]">
                                            {Object.values(record).map((value, idx) => (
                                                <td key={idx} className="px-4 py-2 text-[12px] border-b">{value}</td>
                                            ))}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={headers.length} className="px-4 py-2 text-sm text-gray-500">
                                            No skipped records.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>


                {/* Buttons */}
                <div className="flex justify-center mt-4 gap-[4rem]">
                    <button
                        type='submit'
                        className='w-[150px] h-[48px] outline-none rounded-[12px] bg-[#342C2C] text-white text-[16px]'
                        onClick={() => downloadExcel(data.csvUrl)}
                    >
                        Download
                    </button>
                </div>
            </div>
        </div >
    );
};

export default SkipDataPopup;
