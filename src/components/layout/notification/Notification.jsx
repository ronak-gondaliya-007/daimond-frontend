import React from 'react';

import A01 from 'assets/static/Avatar01.png';
import A02 from 'assets/static/Avatar02.png';
import A03 from 'assets/static/Avatar03.png';
import A04 from 'assets/static/Avatar04.png';
import A05 from 'assets/static/Avatar05.png';
import N from 'assets/static/n-icon.png';
import N01 from 'assets/static/n-icon-1.png';
import N02 from 'assets/static/n-icon-2.png';
import N03 from 'assets/static/n-icon-3.png';

const Notification = () => {
    const notifications = [
        { image: N, title: 'You fixed a bugdsffsffdsfsdfsf s f sdf dsf dsfsdfsdfds sdfs dfsd fs dfs fsd f .', time: 'Just now' },
        { image: N01, title: 'New user registered.', time: '59 minutes ago' },
        { image: N02, title: 'You fixed a bug.', time: '12 hours ago' },
        { image: N03, title: 'Andi Lane subscribed to you.', time: 'Today, 11:59 AM' },
    ];

    const activities = [
        { image: A01, title: 'Changed the stylefsd fdsf dsf fsd fds fsd fds fsd fsd fsd fsd fsd .', time: 'Just now' },
        { image: A02, title: 'Released a new version.', time: '59 minutes ago' },
        { image: A03, title: 'Submitted a bug.', time: '12 hours ago' },
        { image: A04, title: 'Modified A data in Page X.', time: 'Today, 11:59 AM' },
        { image: A05, title: 'Deleted a page in Project X.', time: 'Feb 2, 2024' },
    ];

    const Component = ({ headerTitle, data }) => {
        return (
            <div className="mb-[20px]">
                <h3 className="px-[4px] py-[8px] mb-[10px] mt-0 font-medium text-[18px]">{headerTitle}</h3>
                <ul className="list-none p-0 m-0">
                    {data.map(({ image, title, time }, index) => (
                        <li key={index} className="flex flex-row items-center mb-[15px] gap-[8px]">
                            <img className='w-[40px] h-[40px] object-cover' src={image} alt={title} />
                            <div className="flex flex-col">
                                <span className="text-[14px] line-clamp-2">{title}</span>
                                <span className="text-[12px] text-[#777]">{time}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    return (
        <div className="max-w-[250px] w-full lg:max-w-[300px] h-[100vh] bg-[#fff] p-[20px] box-border transition-all duration-300 ease-in-out border-l border-[rgba(0,0,0,0.1)] overflow-x-auto">

            <Component
                headerTitle={"Notifications"}
                data={notifications}
            />

            <Component
                headerTitle={"Activities"}
                data={activities}
            />

        </div>
    );
};

export default Notification;