// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import from react-router-dom
import logo from '../assets/logo.png';

const Sidebar = () => {
    const location = useLocation(); // Get the current route location
    const [showDramaSubMenu, setShowDramaSubMenu] = useState(false);

    const toggleSubMenu = () => {
        setShowDramaSubMenu(!showDramaSubMenu);
    };

    // Define an activeClass function
    const activeClass = (path) => location.pathname === path ? 'bg-gray-700' : '';

    return (
        <aside className="w-64 bg-gray-800 p-4 h-screen fixed pt-4">
            <div className="text-xl font-bold flex items-center">
                <img src={logo} alt="Logo" className="w-40 h-10 mr-2" />
            </div>
            <ul className="space-y-2 mt-5">
                <li
                    className={`py-2 pl-4 text-gray-300 font-bold cursor-pointer hover:bg-gray-500 rounded-lg active:bg-gray-700 ${activeClass('/dramas')}`}
                    onClick={toggleSubMenu}
                >
                    Dramas
                </li>
                {showDramaSubMenu && (
                    <ul className="pl-6">
                        <li className="py-2 pl-4 text-gray-300 font-medium cursor-pointer hover:bg-gray-500 active:bg-gray-700 rounded-lg">Validate</li>
                        <li className="py-2 pl-4 text-gray-300 font-medium cursor-pointer hover:bg-gray-500 active:bg-gray-700 rounded-lg">Input New Drama</li>
                    </ul>
                )}
                <li className={`py-2 pl-4 text-gray-300 font-bold cursor-pointer hover:bg-gray-500 rounded-lg active:bg-gray-700 ${activeClass('/countries')}`}>
                    <Link to="/countries">Countries</Link>
                </li>
                <li className={`py-2 pl-4 text-gray-300 font-bold cursor-pointer hover:bg-gray-500 rounded-lg active:bg-gray-700 ${activeClass('/awards')}`}>
                    <Link to="/awards">Awards</Link>
                </li>
                <li className={`py-2 pl-4 text-gray-300 font-bold cursor-pointer hover:bg-gray-500 rounded-lg active:bg-gray-700 ${activeClass('/genres')}`}>
                    <Link to="/genres">Genres</Link>
                </li>
                <li className={`py-2 pl-4 text-gray-300 font-bold cursor-pointer hover:bg-gray-500 rounded-lg active:bg-gray-700 ${activeClass('/actors')}`}>
                    <Link to="/actors">Actors</Link>
                </li>
                <li className={`py-2 pl-4 text-gray-300 font-bold cursor-pointer hover:bg-gray-500 rounded-lg active:bg-gray-700 ${activeClass('/comments')}`}>
                    <Link to="/comments">Comments</Link>
                </li>
                <li className={`py-2 pl-4 text-gray-300 font-bold cursor-pointer hover:bg-gray-500 rounded-lg active:bg-gray-700 ${activeClass('/users')}`}>
                    <Link to="/users">Users</Link>
                </li>
                <li className="py-2 pl-4 text-gray-300 font-bold cursor-pointer hover:bg-gray-500 rounded-lg active:bg-gray-700">
                    Logout
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
