import React from 'react';
import { useLocation } from "react-router-dom";
// import 'assets/css/navbar.css';

import { sections } from 'constant';
import { search, searchD } from 'assets/utils/images';

const Header = ({
    breadcrumb = [],
    isSearch = false
}) => {
    const location = useLocation();

    console.log(breadcrumb);

    const generateTitleItemNames = () => {
        return sections.map(section => {
            let response = {};
            section.items.map(item => {
                if (item.slug === location.pathname) {
                    return response = {
                        title: section.title,
                        name: item.name
                    }
                }
            })
            return response;
        }).filter(item => Object.keys(item).length);
    };

    const hideSearchBar = location.pathname !== "/";
    const navbarTitle = generateTitleItemNames();

    return (
        <header className="w-full h-[68px] flex items-center px-[20px] border-b border-[rgba(0,0,0,0.1)]">
            <div className="flex w-full justify-between items-center"> 
                {
                    breadcrumb.length &&
                    <div className="flex items-center">
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
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className={`
                                w-[260px] h-[40px] outline-none border-none px-[32px]
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