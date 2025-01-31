import { closeIcon, featuredIcon } from "assets/utils/images";

const SuccessPopup = ({ onClose, onAddMore, buttonName, handleCustomButton }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className='bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-[400px] w-full mx-4 max-h-[90vh] overflow-y-auto relative'>
                <div className="flex flex-row justify-between mb-[16px] relative">
                    <img src={featuredIcon} alt="featured-icon" />
                    <button
                        className="bg-transparent border-none cursor-pointer absolute top-[-8px] right-0"
                        onClick={onClose}
                    >
                        <img src={closeIcon} alt="Close Icon" />
                    </button>
                </div>
                <div className="mb-[30px]">
                    <p className="text-[18px] font-semibold mb-[4px]">Expense added successfully!</p>
                    <p className="text-[14px] font-thin">Your expense has been recorded successfully! track and manage it effortlessly!</p>
                </div>
                <div className="flex flex-row justify-between gap-4">
                    <button
                        className="flex-1 min-w-[150px] px-6 py-3 border border-[#D5D7DA] rounded-lg text-[16px] font-medium"
                        onClick={onAddMore}
                    >
                        Add More
                    </button>
                    <button
                        className="flex-1 min-w-[150px] px-6 py-3 border border-[#D5D7DA] rounded-lg text-white text-[16px] font-medium bg-[#101010]"
                        onClick={handleCustomButton}
                    >
                        {buttonName}
                    </button>
                </div>
            </div>
        </div >
    )
};

export default SuccessPopup;