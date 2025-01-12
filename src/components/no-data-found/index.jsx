import { noDataFound } from 'assets/utils/images';
import React from 'react';

const NoDataFound = ({ message = 'No Data Found' }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center text-[#70707A] min-h-[70vh] gap-[10px]">
            <img src={noDataFound} alt="No Data" className="w-[25%] h-[25%] mb-[16px]" />
            <span className="text-[32px] blinking-message mt-0 text text-center text-blue-600 font-bold text-[#FF0000]">{message}</span>
        </div>
    );
};

export default NoDataFound;
