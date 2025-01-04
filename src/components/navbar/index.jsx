import React from 'react';
import { useLocation } from "react-router-dom";
import '../../assets/css/navbar.css';

import { sections } from '../../constant';

const Navbar = ({ title, name, action }) => {
    const location = useLocation();

    const generateTitleItemNames = () => {
        return sections.map(section => {
            let response = {};
            section.items.map(item => {
                if (item.slug === location.pathname) {
                    return response = {
                        title: section.title,
                        name: item.name
                    }
                }
            })
            return response;
        }).filter(item => Object.keys(item).length);
    };

    const hideSearchBar = location.pathname !== "/";
    const navbarTitle = generateTitleItemNames();

    return (
        <header className={`header ${hideSearchBar ? "no-search" : ""}`}>
            <div className="header-left">
                <span className='navabr-title'>{title ?? navbarTitle[0].title}</span>
                <span className='navbar-blank'>/</span>
                <span className={action && action != "" ? 'navbar-name-disable' : 'navbar-name'}>{name ?? navbarTitle[0].name}</span>
                {action && action != "" ? <span className='navbar-blank'>/</span> : ""}
                {action && action != "" ? <span className='navbar-name'>{action}</span> : ""}
            </div>
            <div className="header-right">
                {(!hideSearchBar &&
                    <div className="search-bar">
                        <input type="text" placeholder="Search" />
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;