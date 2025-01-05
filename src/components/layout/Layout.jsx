import React from 'react';
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';

const Layout = ({
    children
}) => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Sidebar />
            <div className='flex-1'>
                <div className='flex flex-col'>
                    <Header />
                    <div className='flex-1'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout