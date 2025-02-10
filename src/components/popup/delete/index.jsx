import { exclamationIcon } from "assets/utils/images";
import React from "react";
import { getCurrency } from "utils";

const DeletePopup = ({ onClose, onDelete, item, inlineKeys, isAmount, amountKey }) => {
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative">
                {/* Image positioned outside the popup with margin-bottom */}
                <img
                    className="w-[60px] absolute top-[-25px] left-1/2 transform -translate-x-1/2 mb-6"
                    src={exclamationIcon}
                    alt="exclamation"
                />

                {/* Header with margin-top */}
                <h3 className="text-lg font-semibold text-gray-800 mb-6 mt-6 text-center">
                    Confirm Deletion
                </h3>

                {/* Dynamic Key-Value Section */}
                <div className="mb-6 text-left space-y-4 flex border-b border-gray-300">
                    {/* First row - Displaying 2 keys inline */}
                    <div className="flex justify-between mb-4 w-full">
                        {inlineKeys.map((key) => (
                            item[key] && (
                                <div className="max-w-[50%]">
                                    <div className="text-sm text-gray-500 font-medium mb-2 ">{capitalizeFirstLetter(key)}</div>
                                    <div className="text-sm text-gray-900 font-medium">{item[key]}</div>
                                </div>
                            )
                        ))}
                    </div>
                </div>

                {/* Delete Item Key-Value Section */}
                <div className="mb-3 text-center">
                    <span className="text-sm text-gray-600">Just Double-Checking!</span>
                </div>
                {isAmount && <div className="mb-4 text-center">
                    <div>
                        <div className="text-sm text-gray-500 font-medium mb-2 ">{amountKey}</div>
                        <div className="text-[30px] text-gray-900 font-medium">{getCurrency(item.amount)}</div>
                    </div>
                </div>}
                <div className="mb-6 text-start bg-red-100 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <span className="text-sm text-gray-800 font-semibold">
                        You're about to delete an item. Are you absolutely sure you want to remove it permanently?
                    </span>
                </div>

                {/* Actions */}
                <div className="flex space-x-4 justify-center">
                    <button
                        className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-md"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </div>

            </div>
        </div>
    );
};

export default DeletePopup;
