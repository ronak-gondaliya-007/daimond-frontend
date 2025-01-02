import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/sidebar.css';

import sidebarLogo from '../../assets/images/sidebar-logo.svg';
import { sections } from '../../constant';

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
