import searchIcon from 'assets/images/search.svg';
import slidersIcon from 'assets/images/sliders.svg';
import Loader from 'components/loader';
import { useRef, useState } from 'react';

const Search = ({
    placeholder = 'Search...',
    addBtn = {
        title: '+ Add New',
        onClick: () => { },
        isCancel: false,
        onCancel: () => { },
    },
    onSearch,
    searchQuery,
    loading,
    showButtons = true,
    filterComponent = <></>,
    handleFilterClick = () => { },
    isShowButton = true
}) => {
    const [query, setQuery] = useState(searchQuery);
    const timeoutRef = useRef(null);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        // Clear previous timeout to prevent multiple API calls
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Trigger search after a delay (debounce)
        timeoutRef.current = setTimeout(() => {
            onSearch(value);
        }, 500);
    };

    return (
        <div className="w-full flex items-center gap-[16px] md:flex-nowrap flex-wrap">
            <div className="relative w-full py-[7px] md-2:py-[5px] h-full flex items-center border-[1px] border-[#E4E5E8] rounded-[10px]">
                <img src={searchIcon} alt='Search' className='w-[24px] h-[24px] mx-[16px]' />
                <input
                    type="text"
                    value={query}
                    onChange={handleSearchChange}
                    placeholder={placeholder}
                    className='w-full h-full outline-none text-[16px] md-2:text-[16px] text-[black]'
                />
                <div className='flex items-center gap-[16px] mx-[6px]'>
                    <button
                        className={`w-max px-[18px] py-[10px] bg-[#F1F2F4] rounded-[4px] text-[14px] font-medium text-[#18191C] flex items-center gap-[12px] ${!showButtons && 'opacity-0'}`}
                        onClick={handleFilterClick}
                    >
                        <img src={slidersIcon} alt="Filters" className='w-[24px] h-[24px] mr-[2px]' />
                        <p>Filters</p>
                    </button>
                    {filterComponent}
                </div>
            </div>
            {
                isShowButton &&
                <div className="w-[250px] flex gap-[10px] h-full">
                    <button
                        className='w-full h-full min-w-[130px] py-[17.5px] md-2:py-[15.5px] bg-[#1E1E1E] text-white rounded-[10px]'
                        onClick={addBtn.onClick}
                    >
                        {addBtn.title}
                    </button>
                    {
                        addBtn.isCancel &&
                        <button
                            className='w-full h-full min-w-[130px] py-[17.5px] md-2:py-[15.5px] bg-[#1E1E1E] text-white rounded-[10px]'
                            onClick={addBtn.onCancel}
                        >
                            {"Cancel"}
                        </button>
                    }
                    {loading && <Loader />}
                </div>
            }
        </div>
    );
};

export default Search;