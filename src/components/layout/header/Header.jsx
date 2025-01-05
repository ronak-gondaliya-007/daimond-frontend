import React from 'react';
import { search, searchD } from 'assets/utils/images';

const Header = ({
    breadcrumb = [],
    isSearch = false
}) => {
    return (
        <header className="w-full h-[68px] flex items-center px-[20px] border-b border-[rgba(0,0,0,0.1)]">
            <div className="flex w-full justify-between items-center"> 
                {
                    breadcrumb.length &&
                    <div className="hidden items-center md-2:flex">
                        {
                            breadcrumb.map((crumb, index) => (
                                <>
                                    <span className="text-[15px] font-medium text-[--light-black] mr-[16px]">{crumb}</span>
                                    {index < breadcrumb.length - 1 && <span className="text-[15px] font-medium text-[--light-black] mr-[16px]">/</span>}
                                </>
                            ))
                        }
                    </div>
                }

                {
                    !isSearch &&
                    <div className="relative min-w-[200px] max-w-[260px] w-full h-[40px]">
                        <input
                            type="search"
                            placeholder="Search"
                            className={`
                                w-full h-full outline-none border-none px-[32px]
                                bg-[#f5f5f5] rounded-[10px] text-[16px] text-[--light-black]

                            `}
                        />
                        <img src={search} alt="search" className="absolute left-[16px] top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        <img src={searchD} alt="search" className="absolute right-[1px] top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                }
            </div>
        </header>
    );
};

export default Header;