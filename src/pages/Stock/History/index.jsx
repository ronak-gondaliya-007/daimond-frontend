import { closeIcon } from "assets/utils/images";
import React from "react";

const HistoryPopup = ({ item, onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className={`bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-4xl w-full mx-4 max-h-[90vh] relative`}>
                {/* Header */}
                <div className={`flex justify-between items-center mb-6 sticky top-0 bg-white z-99`}>
                    <h2 className="text-lg font-semibold">Stock History</h2>
                    <button
                        className="bg-transparent border-none cursor-pointer"
                        onClick={onClose}
                    >
                        <img src={closeIcon} alt="Close Icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HistoryPopup;