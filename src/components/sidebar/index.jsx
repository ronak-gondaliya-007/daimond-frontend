import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/sidebar.css';

import sidebarLogo from '../../assets/images/sidebar-logo.svg';
import icon from '../../assets/images/icon.svg';
import icon1 from '../../assets/images/icon-1.svg';
import icon2 from '../../assets/images/icon-2.svg';
import icon3 from '../../assets/images/icon-3.svg';
import icon4 from '../../assets/images/icon-4.svg';

const Sidebar = () => {
    const [selectedItem, setSelectedItem] = useState('Dashboard');
    const navigate = useNavigate();

    const handleItemClick = (itemName) => {
        setSelectedItem(itemName);

        switch (itemName) {
            case 'Dashboard':
                navigate('/');
                break;
            case 'Stock':
                navigate('/stock');
                break;
            default:
                console.warn(`Navigation route not defined for item: ${itemName}`);
        }
    };

    const isSelected = (itemName) => selectedItem === itemName;

    const sections = [
        {
            title: 'All',
            items: [
                { name: 'Dashboard', icon: icon },
                { name: 'Purchase', icon: icon1 },
                { name: 'Sell/Invoice', icon: icon4 }
            ]
        },
        {
            title: 'Management',
            items: [
                { name: 'Memo', icon: icon2 },
                { name: 'Stock', icon: icon3 },
                { name: 'Payment', icon: icon3 },
                { name: 'Expense', icon: icon3 },
                { name: 'Customer', icon: icon3 },
                { name: 'Roles & Permission', icon: icon3 }
            ]
        },
        {
            title: 'Other',
            items: [
                { name: 'Reports & Analytics', icon: icon2 }
            ]
        }
    ];

    return (
        <div className="sidebar">
            <img className="logo" src={sidebarLogo} alt="Nature Diam Inc Logo" />

            {sections.map((section) => (
                <div key={section.title} className="sidebar-section">
                    <span className="section-title">{section.title}</span>
                    {section.items.map((item) => (
                        <div
                            key={item.name}
                            className={`sidebar-item ${isSelected(item.name) ? 'selected' : ''}`}
                            onClick={() => handleItemClick(item.name)}
                        >
                            <img className="icon" src={item.icon} alt={item.name} />
                            <span className="text">{item.name}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
