// src/components/Sidebar.jsx
import React, { useState } from 'react';
import logo from '../assets/logo.png';

const Sidebar = () => {
    const [showDramaSubMenu, setShowDramaSubMenu] = useState(false);

    const toggleSubMenu = () => {
        setShowDramaSubMenu(!showDramaSubMenu);
    };

    return (
        <aside className="w-64 bg-gray-800 p-4 h-screen fixed pt-4">
            <div className="text-xl font-bold flex items-center">
                <img src={logo} alt="Logo" className="w-40 h-10 mr-2" />
            </div>
            <ul className="space-y-2 mt-5">
                {/* Dramas Menu Item */}
                <li 
                    className="py-2 pl-4 text-gray-300 font-bold cursor-pointer hover:bg-gray-500 rounded-lg active:bg-gray-700" 
                    onClick={toggleSubMenu}
                >
                    Dramas
                </li>
                {/* Submenu for Dramas */}
                {showDramaSubMenu && (
                    <ul className="pl-6">
                        <li className="py-2 pl-4 text-gray-300 font-medium cursor-pointer hover:bg-gray-500 active:bg-gray-700 rounded-lg">Validate</li>
                        <li className="py-2 pl-4 text-gray-300 font-medium cursor-pointer hover:bg-gray-500 active:bg-gray-700 rounded-lg">Input New Drama</li>
                    </ul>
                )}
                {/* Other Menu Items */}
                <li className="py-2 pl-4 text-gray-300 bg-gray-700 font-bold cursor-pointer hover:bg-gray-500 rounded-lg active:bg-gray-700">Countries</li>
                <li className="py-2 pl-4 text-gray-300 font-bold cursor-pointer hover:bg-gray-500 rounded-lg active:bg-gray-700">Awards</li>
                <li className="py-2 pl-4 text-gray-300 font-bold cursor-pointer hover:bg-gray-500 rounded-lg active:bg-gray-700">Genres</li>
                <li className="py-2 pl-4 text-gray-300 font-bold cursor-pointer hover:bg-gray-500 rounded-lg active:bg-gray-700">Actors</li>
                <li className="py-2 pl-4 text-gray-300 font-bold cursor-pointer hover:bg-gray-500 rounded-lg active:bg-gray-700">Comments</li>
                <li className="py-2 pl-4 text-gray-300 font-bold cursor-pointer hover:bg-gray-500 rounded-lg active:bg-gray-700">Users</li>
                <li className="py-2 pl-4 text-gray-300 font-bold cursor-pointer hover:bg-gray-500 rounded-lg active:bg-gray-700">Logout</li>
            </ul>
        </aside>
    );
};

export default Sidebar;
