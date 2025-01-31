import { closeIcon, diamondIcon } from "assets/utils/images";
import React from "react";
import { getDate, getTime } from "utils/dateFormat";

const DetailPopup = ({ item, onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className={`bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto relative`}>
                {/* Header */}
                <div className={`flex justify-between items-center mb-6 sticky top-0 bg-white z-99`}>
                    <h2 className="text-lg font-semibold">Details</h2>
                    <button
                        className="bg-transparent border-none cursor-pointer"
                        onClick={onClose}
                    >
                        <img src={closeIcon} alt="Close Icon" />
                    </button>
                </div>

                {/* Details Section */}
                <div className="space-y-8">
                    {/* First Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-x-16 border-b pb-4">
                        <DetailItem label="Category" value={item.category} />
                        <DetailItem label="Invoice Number" value={item.invoiceNumber} />
                    </div>

                    {/* Second Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-x-16 border-b pb-4">
                        <DetailItem label="Expense Amount" value={item.amount} />
                        <DetailItem label="Expense Date" value={getDate(item.expenseDate)} />
                    </div>

                    {/* Third Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-x-16 border-b pb-4">
                        <DetailItem label="Added By" value={item.createdBy} isCustom={true} />
                        <DetailItem label="Expense Date" value={`${getDate(item.createdAt)} ${getTime(item.createdAt)}`} />
                    </div>

                    {/* Remarks Section */}
                    <div>
                        <div className="text-sm text-gray-500 font-medium mb-2">
                            Description/Notes
                        </div>
                        <div className="text-sm text-gray-900 font-medium">
                            {item.description !== "" ? item.description : '--'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ label, value, isCustom }) => (
    <div>
        <div className="text-sm text-gray-500 font-medium mb-2">{label}</div>
        {
            isCustom ?
                <div className="flex items-center gap-[10px]">
                    <img src={value.profilePic === "" ? diamondIcon : value.profilePic} alt="Diamond" />
                    <div className="flex flex-col items-start">
                        <span className="text-[14px] font-medium text-[#0A112F] text-start line-clamp-2">{value.fullName}</span>
                        <span className="text-[12px] font-medium text-[#0A112F]">{value.userType}</span>
                    </div>
                </div>
                : <div className="text-sm text-gray-900 font-medium">{value}</div>
        }
    </div>
);

export default DetailPopup;
