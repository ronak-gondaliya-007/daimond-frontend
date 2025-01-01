import React from 'react';
import '../../assets/css/navbar.css';

const Navbar = () => {
    return (
        <header className="header">
            <div className="header-left">
                <span>Dashboard</span>
            </div>
            <div className="header-right">
                <div className="search-bar">
                    <input type="text" placeholder="Search" />
                </div>
            </div>
        </header>
    );
};

export default Navbar;