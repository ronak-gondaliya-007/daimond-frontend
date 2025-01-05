import React from 'react';
import Notifications from './notification/Notification';
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';

const DashboardLayout = ({
    children,
    breadcrumb
}) => {
    return (
        <div className='flex h-screen overflow-hidden'>
            <Sidebar />
            <div className='flex-1 w-full max-w-[calc(100%-450px)] lg:max-w-[calc(100%-550px)]'>
                <Header breadcrumb={breadcrumb} />
                <div className='flex-1 h-[calc(100vh-68px)] overflow-y-auto'>
                    {children}
                </div>
            </div>
            <Notifications />
        </div>
    )
}

export default DashboardLayout