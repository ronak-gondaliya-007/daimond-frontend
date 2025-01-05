import React from 'react';
import Notifications from './notification/Notification';
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';

const DashboardLayout = ({
    children,
    breadcrumb
}) => {
    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex-1'>
                <div className='flex flex-col'>
                    <Header breadcrumb={breadcrumb} />
                    <div className='flex-1'>
                        {children}
                    </div>
                </div>
            </div>
            <Notifications />
        </div>
    )
}

export default DashboardLayout