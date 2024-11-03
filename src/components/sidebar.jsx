// src/components/Sidebar.jsx
import React, { useState } from 'react';
import {useLocation, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import logo from '../assets/logo.png';

const Sidebar = () => {
    const location = useLocation(); // Get the current route location
    const navigate = useNavigate();  // Use useNavigate for navigation
    const [showDramaSubMenu, setShowDramaSubMenu] = useState(false);

    const toggleSubMenu = () => {
        setShowDramaSubMenu(!showDramaSubMenu);
    };

    // Define an activeClass function
    const activeClass = (path) => location.pathname === path ? 'bg-gray-700' : '';

    // Function to handle navigation when clicking on list items
    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogoClick = () => {
        navigate('/'); // Navigate to home page when logo is clicked
      };

    return (
        <aside className="w-64 bg-gray-800 p-4 h-screen fixed pt-4">
                <div className="text-xl font-bold flex items-center" onClick={handleLogoClick}>
                    <img src={logo} alt="Logo" className="w-40 h-10 mr-2 cursor-pointer" />
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
                        <li 
                            className="py-2 pl-4 text-gray-300 font-medium cursor-pointer hover:bg-gray-500 active:bg-gray-700 rounded-lg"
                            onClick={() => handleNavigation('/dramas/validate')}
                        >
                            Validate
                        </li>
                        <li 
                            className="py-2 pl-4 text-gray-300 font-medium cursor-pointer hover:bg-gray-500 active:bg-gray-700 rounded-lg"
                            onClick={() => handleNavigation('/dramas/input')}
                        >
                            Input New Drama
                        </li>
                    </ul>
                )}
                <li 
                    className={`py-2 pl-4 text-gray-300 font-bold cursor-pointer hover:bg-gray-500 rounded-lg active:bg-gray-700 ${activeClass('/countries')}`}
                    onClick={() => handleNavigation('/countries')}
                >
                    Countries
                </li>
                <li 
                    className={`py-2 pl-4 text-gray-300 font-bold cursor-pointer hover:bg-gray-500 rounded-lg active:bg-gray-700 ${activeClass('/awards')}`}
                    onClick={() => handleNavigation('/awards')}
                >
                    Awards
                </li>
                <li 
                    className={`py-2 pl-4 text-gray-300 font-bold cursor-pointer hover:bg-gray-500 rounded-lg active:bg-gray-700 ${activeClass('/genres')}`}
                    onClick={() => handleNavigation('/genres')}
                >
                    Genres
                </li>
                <li 
                    className={`py-2 pl-4 text-gray-300 font-bold cursor-pointer hover:bg-gray-500 rounded-lg active:bg-gray-700 ${activeClass('/actors')}`}
                    onClick={() => handleNavigation('/actors')}
                >
                    Actors
                </li>
                <li 
                    className={`py-2 pl-4 text-gray-300 font-bold cursor-pointer hover:bg-gray-500 rounded-lg active:bg-gray-700 ${activeClass('/comments')}`}
                    onClick={() => handleNavigation('/comments')}
                >
                    Comments
                </li>
                <li 
                    className={`py-2 pl-4 text-gray-300 font-bold cursor-pointer hover:bg-gray-500 rounded-lg active:bg-gray-700 ${activeClass('/users')}`}
                    onClick={() => handleNavigation('/users')}
                >
                    Users
                </li>
                <li 
                    className="py-2 pl-4 text-gray-300 font-bold cursor-pointer hover:bg-gray-500 rounded-lg active:bg-gray-700"
                    onClick={() => alert('Logging out...')} // Placeholder for logout logic
                >
                    Logout
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
