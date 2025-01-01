import React from 'react';
import '../../assets/css/notification.css';

import A01 from '../../assets/static/Avatar01.png';
import A02 from '../../assets/static/Avatar02.png';
import A03 from '../../assets/static/Avatar03.png';
import A04 from '../../assets/static/Avatar04.png';
import A05 from '../../assets/static/Avatar05.png';
import N from '../../assets/static/n-icon.png';
import N01 from '../../assets/static/n-icon-1.png';
import N02 from '../../assets/static/n-icon-2.png';
import N03 from '../../assets/static/n-icon-3.png';

const NotificationsAndActivities = () => {
    const notifications = [
        { image: N, title: 'You fixed a bug.', time: 'Just now' },
        { image: N01, title: 'New user registered.', time: '59 minutes ago' },
        { image: N02, title: 'You fixed a bug.', time: '12 hours ago' },
        { image: N03, title: 'Andi Lane subscribed to you.', time: 'Today, 11:59 AM' },
    ];

    const activities = [
        { image: A01, title: 'Changed the style.', time: 'Just now' },
        { image: A02, title: 'Released a new version.', time: '59 minutes ago' },
        { image: A03, title: 'Submitted a bug.', time: '12 hours ago' },
        { image: A04, title: 'Modified A data in Page X.', time: 'Today, 11:59 AM' },
        { image: A05, title: 'Deleted a page in Project X.', time: 'Feb 2, 2024' },
    ];

    return (
        <div className="notifications-container">
            <div className="section">
                <h3>Notifications</h3>
                <ul>
                    {notifications.map((notification, index) => (
                        <li key={index}>
                            <img className='notification-icon' src={notification.image} alt="Notification Image" />
                            <div className="content">
                                <span className="title">{notification.title}</span>
                                <span className="time">{notification.time}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="section">
                <h3>Activities</h3>
                <ul>
                    {activities.map((activity, index) => (
                        <li key={index}>
                            <img className='notification-icon' src={activity.image} alt="Activity Image" />
                            <div className="content">
                                <span className="title">{activity.title}</span>
                                <span className="time">{activity.time}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NotificationsAndActivities;