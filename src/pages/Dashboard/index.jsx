import { downArrow, upArrow } from 'assets/utils/images';
import React from 'react';

const Dashboard = () => {

    const stats = [
        { title: 'Views', value: 72656, change: '+113.01%', isUp: true },
        { title: 'Visits', value: 3671, change: '-0.03%', isUp: false },
        { title: 'New Users', value: 156, change: '+15.03%', isUp: true },
        { title: 'Total Users', value: 2318, change: '+6.08%', isUp: true }
    ];

    const stockSummary = [
        { platform: 'Google', value: 100 },
        { platform: 'YouTube', value: 80 },
        { platform: 'Instagram', value: 60 },
        { platform: 'Pinterest', value: 40 },
        { platform: 'Facebook', value: 20 },
        { platform: 'Twitter', value: 10 },
    ];

    return (
        <div className="w-full h-full p-[20px]">
            <div className='flex justify-between item-center'>
                <h2>Overview</h2>
                <div>
                    <select className='outline-none cursor-pointer'>
                        <option>Today</option>
                        <option>Next Day</option>
                    </select>
                </div>
            </div>

            <div className='flex flex-wrap mt-[24px]'>
                {
                    stats.map(({ title, value, change, isUp }, index) => (
                        <div key={index} className='min-w-[202px] w-max h-[112px] flex flex-col justify-between rounded-[16px] p-[24px] bg-[#EDEEFC] even:bg-[#E6F1FD] mb-[8px] mr-[8px]'>
                            <p className='text-[14px] font-medium text-[#000]'>{title}</p>
                            <div className='flex items-center justify-between'>
                                <span className='text-[24px] font-medium text-[#000]'>{value.toLocaleString()}</span>
                                <div className='flex items-center gap-[4px] ml-[8px]'>
                                    <span>{change}</span>
                                    <img src={isUp ? upArrow : downArrow} alt={isUp ? 'up arrow' : 'down arrow'} />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className='flex justify-between mt-[24px]'>
                <div>
                    chart
                </div>

                <div className='w-[275px] border-[1px] border-[#E0E0E0] rounded-[16px] p-[24px]'>
                    <h3 className='text-[20px] font-bold text-[#000]'>Summary of stock</h3>
                    <div className='mt-[20px]'>
                        {
                            stockSummary.map(({ platform, value }, index) => (
                                <div key={index} className='flex justify-between items-center mt-[20px]'>
                                    <p>{platform}</p>
                                    <p>{value}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;