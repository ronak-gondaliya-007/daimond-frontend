import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import sidebarLogo from 'assets/images/sidebar-logo.svg';
import { sections } from 'constant';

const Sidebar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    function isCurrentTag(slug) {
        const route = pathname.split('/').filter(Boolean);

        if (slug === '/customer' && (pathname.startsWith('/customer') || pathname.startsWith('/vendor'))) {
            return true;
        }

        if (slug === pathname) return true;
        return route.length > 0 && slug.includes(route[0]);
    }

    return (
        <div className="max-w-[200px] w-full lg:max-w-[250px] h-[100vh] flex flex-col bg-[#fff] box-border transition-all duration-300 ease-in-out border-r border-[rgba(0,0,0,0.1)]">
            <div className="w-full p-[20px] flex items-center justify-center pb-0 mb-[20px] cursor-pointer" onClick={() => navigate('/')}>
                <img src={sidebarLogo} alt="Nature Diam Inc Logo" />
            </div>

            <div className='flex-1 p-[20px] pt-0 overflow-x-auto'>

                {sections.map((section) => (
                    <div key={section.title} className="mb-[20px]">
                        <span className="text-[14px] text-[#000] opacity-[0.4] mb-[10px] block">{section.title}</span>
                        {section.items.map((item) => (
                            <div className='flex flex-col justify-end group'>
                                <div
                                    key={item.name}
                                    className={`
                                    flex w-full  items-center p-[10px] cursor-pointer transition-all duration-200 ease-in-out 
                                    rounded-[12px] hover:bg-[#cecccc] hover:font-bold mb-[5px]
                                    ${isCurrentTag(item.slug) ? 'bg-[#cecccc] font-bold' : ''}
                                `}
                                    onClick={() => item?.isHide ? "" : navigate(item.slug)}
                                >
                                    <img className="w-[20px] h-[20px] mr-[10px]" src={item.icon} alt={item.name} />
                                    <span className="text-[14px] text-[#555] whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</span>
                                </div>
                                {
                                    !!item?.options && item.options.length > 0 && (
                                        <div className='w-full flex justify-end'>
                                            <div className='w-[calc(100%-40px)] bg-[#cecccc] rounded-[12px] hidden group-hover:block transition-all duration-300'>
                                                {
                                                    item.options.map((option) => (
                                                        <div
                                                            className={`                                    
                                                            flex items-center p-[10px] cursor-pointer transition-all duration-200 ease-in-out 
                                                            rounded-[12px] hover:font-bold mb-[5px]
                                                        `}
                                                            onClick={() => navigate(`${item.slug}?query=${option.query}`)}
                                                        >
                                                            <span className="text-[14px] text-[#555] whitespace-nowrap overflow-hidden text-ellipsis">{option.name}</span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        )
                        )}
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Sidebar;