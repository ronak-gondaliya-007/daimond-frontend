 import React from 'react';
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';

const Layout = ({
    children,
    breadcrumb
}) => {
    return (
        <div className='flex h-screen overflow-hidden'>
            <Sidebar />
            <div className='flex-1 w-full max-w-[calc(100%-200px)] lg:max-w-[calc(100%-250px)]'>
                <Header breadcrumb={breadcrumb} />
                <div className='flex-1 h-[calc(100vh-68px)] overflow-y-auto'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout