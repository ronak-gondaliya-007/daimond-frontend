import { closeIcon } from "assets/utils/images";
import React from "react";

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
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-y-4 sm:gap-x-16 border-b pb-4">
                        <DetailItem label="Diamond Name" value={item.diamondName} />
                        <DetailItem label="ID" value={item.diamondId} />
                        <DetailItem label="Carat" value={item.carat} />
                        <DetailItem label="Color" value={item.color} />
                    </div>

                    {/* Second Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-y-4 sm:gap-x-16 border-b pb-4">
                        <DetailItem label="Clarity" value={item.clarity} />
                        <DetailItem label="Polish" value={item.polish} />
                        <DetailItem label="Symmetry" value={item.symmetry} />
                        <DetailItem label="Depth" value={item.depth} />
                    </div>

                    {/* Third Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-y-4 sm:gap-x-16 border-b pb-4">
                        <DetailItem label="Fluorescence" value={item.fl} />
                        <DetailItem label="Table" value={item.table} />
                        <DetailItem label="Ratio" value={item.ratio} />
                        <DetailItem label="Certificate No" value={item.certificateNo} />
                    </div>

                    {/* Fourth Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-y-4 sm:gap-x-16 border-b pb-4">
                        <DetailItem label="Price Per Carat" value={item.pricePerCarat} />
                        <DetailItem label="Price" value={item.price} />
                        <DetailItem label="Status" value={item.status} />
                        <DetailItem label="Measurement" value={`${item.measurement.length} x ${item.measurement.width} x ${item.measurement.height}`} />
                    </div>

                    {/* Images Section */}
                    {item.diamondImages && item.diamondImages.length > 0 && (
                        <div>
                            <div className="text-sm text-gray-500 font-medium mb-2">
                                Images
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {item.diamondImages.map((img, index) => (
                                    <img
                                        key={index}
                                        src={`${process.env.REACT_APP_IMAGE_URL}${img}`}
                                        alt={`diamond-img-${index}`}
                                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Remarks Section */}
                    <div>
                        <div className="text-sm text-gray-500 font-medium mb-2">
                            Remark
                        </div>
                        <div className="text-sm text-gray-900 font-medium">
                            {item.remarks !== "" ? item.remarks : '--'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ label, value }) => (
    <div>
        <div className="text-sm text-gray-500 font-medium mb-2">{label}</div>
        <div className="text-sm text-gray-900 font-medium">{value}</div>
    </div>
);

export default DetailPopup;
