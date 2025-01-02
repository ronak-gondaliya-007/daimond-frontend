import React from 'react';
import { useLocation } from "react-router-dom";
import '../../assets/css/navbar.css';

const Navbar = () => {
    const location = useLocation();

    const getRouteName = (pathname) => {
        if (pathname === "/") return "Dashboard";
        return pathname
            .replace("/", "")
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const currentRoute = getRouteName(location.pathname);

    const hideSearchBar = location.pathname !== "/";

    return (
        <header className={`header ${hideSearchBar ? "no-search" : ""}`}>
            <div className="header-left">
                <span>{currentRoute}</span>
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