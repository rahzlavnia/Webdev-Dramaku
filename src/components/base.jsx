import React from 'react';

// Import the image icon
import logo from '../assets/logo.png'; // Adjust the path to your image
import '../index.css'

const DefaultLayout = ({ children }) => {
    return (
        <>
            <div className="bg-gray-900 min-h-screen relative"> {/* Apply Tailwind background and height class */}
                {/* Add a container for the icon */}
                <div className="absolute top-0 left-0 p-4">
                    {/* Display the image */}
                    <img src={logo} alt="Logo" className="h-14 w-52" /> {/* Adjust size as needed */}
                </div>

                {/* Search bar and main content */}
                
                <main>
                    {children}
                </main>
            </div>
        </>
    );
};

export default DefaultLayout;
