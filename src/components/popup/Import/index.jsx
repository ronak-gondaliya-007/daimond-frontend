import { uploadCSVIcon, closeIcon } from "assets/utils/images";
import React, { useState } from "react";

const ImportPopup = ({ onClose, onUpload }) => {
    const [fileUploaded, setFileUploaded] = useState(false);
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFileUploaded(true);
            setFileName(selectedFile.name);
            setFile(selectedFile);
        } else {
            setFileUploaded(false);
            setFileName('');
            setFile(null);
        }
    };

    const handleUpload = () => {
        if (file) {
            onUpload(file);
        } else {
            alert('Please select a file first!');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
                {/* Header content */}
                <div className={`flex justify-between items-center mb-6 sticky top-0 bg-white z-10`}>
                    <h2 className="text-lg font-semibold items-center">Upload CSV File</h2>
                    <button
                        className="bg-transparent border-none cursor-pointer"
                        onClick={onClose}
                    >
                        <img className="w-12 h-12" src={closeIcon} alt="Close Icon" />
                    </button>
                </div>

                {/* File upload section */}
                <div className="w-full flex flex-col mb-3.2">
                    <div className="w-full bg-[#eff1f9] px-4 py-3 border-2 border-[#d1e9ff] border-dashed rounded-lg mb-4">
                        <p className="text-center text-sm text-gray-600 mb-6">Upload a CSV file with list of Stock.
                            You may download the file format <a href={process.env.REACT_APP_SAMPLE_STOCK_CSV_PATH} className="text-[#1373e7] underline cursor-pointer" download>Download Here</a>
                        </p>
                        <div className="relative flex justify-center items-center rounded-md w-full h-full mb-6">
                            <img
                                src={uploadCSVIcon}
                                alt="image-upload"
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-12"
                            />
                            <input
                                type="file"
                                className="w-full h-full opacity-0 cursor-pointer"
                                accept=".xlsx"
                                aria-label="Upload CSV file"
                                onChange={handleFileChange}
                            />
                        </div>
                        {/* Display selected file name */}
                        {fileUploaded && (
                            <p className="text-center text-sm text-gray-600">{fileName}</p>
                        )}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center mt-4 gap-[4rem]">
                    <button
                        className="font-medium text-blue-500 px-4 py-2 rounded-lg flex items-center justify-center"
                        onClick={onClose}
                    >
                        Cancel Uploading
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg flex items-center justify-center ${fileUploaded ? 'bg-[#1F1F1F] text-white' : 'bg-gray-300 text-black'}`}
                        onClick={handleUpload}
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div >
    );
};

export default ImportPopup;
