import { downArrow, upArrow } from 'assets/utils/images';
import React, { Children, useEffect } from 'react';
import useCommonStore from 'store/common-store/useCommonStore';

const Dashboard = () => {

    const { setState } = useCommonStore();

    useEffect(() => {
        setState({ isSearch: true })

        return () => {
            setState({ isSearch: false })
        }
    }, [])


    const stats = [
        {
            className: 'w-full md-2:w-1/2 2xl:flex gap-[14px]',
            childrens: [
                { title: 'Views', value: 72656, change: '+113.01%', isUp: true },
                { title: 'Visits', value: 3671, change: '-0.03%', isUp: false }
            ]
        },
        {
            className: 'w-full md-2:w-1/2 2xl:flex gap-[14px]',
            childrens: [
                { title: 'New Users', value: 156, change: '+15.03%', isUp: true },
                { title: 'Total Users', value: 2318, change: '+6.08%', isUp: true }
            ]
        }
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

            {/* w-full md:min-w-[202px] md:w-[250px] 2xl:w-full  */}
            {/* <div className='flex mt-[24px] flex-wrap 2xl:flex-nowrap justify-between'> */}
            <div className='block md-2:flex mt-[24px] gap-[14px]'>
                {
                    stats.map(({ className, childrens }, index) => (
                        <div key={index} className={className}>
                            {
                                childrens.map(({ title, value, change, isUp }, index) => (
                                    <div
                                        key={index}
                                        className={`
                                            w-full 2xl:w-1/2 h-[112px] 
                                            flex flex-col justify-between rounded-[16px] 
                                            p-[18px] md:p-[24px] 
                                            bg-[#EDEEFC] even:bg-[#E6F1FD] 
                                            mb-[14px] 2xl:mr-[8px]
                                        `}>
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