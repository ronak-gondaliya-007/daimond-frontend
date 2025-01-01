import React from 'react';
import '../../assets/css/dashboard.css';

import Sidebar from '../../components/sidebar';
import Navbar from '../../components/navbar';
import NotificationsAndActivities from '../../components/notification';

const Dashboard = () => {
    const stats = [
        { title: 'Views', value: 7265, change: '+11.01%' },
        { title: 'Visits', value: 3671, change: '-0.03%' },
        { title: 'New Users', value: 156, change: '+15.03%' },
        { title: 'Total Users', value: 2318, change: '+6.08%' },
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
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className="dashboard">
                    <div className="stats-container">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-card">
                                <h2>{stat.title}</h2>
                                <span className="value">{stat.value}</span>
                                <span className="change">{stat.change}</span>
                            </div>
                        ))}
                    </div>

                    <div className="chart-container">
                        <h2>Total Sales</h2>
                        {/* Placeholder for the chart component */}
                        {/* You can integrate a chart library like Chart.js or Recharts here */}
                        <div className="chart">
                            {/* Chart visualization goes here */}
                        </div>
                    </div>

                    <div className="stock-summary-container">
                        <h2>Summary of stock</h2>
                        <ul>
                            {stockSummary.map((item, index) => (
                                <li key={index}>
                                    <span className="platform">{item.platform}</span>
                                    <span className="value">{item.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <NotificationsAndActivities />
        </div>
    );
};

export default Dashboard;