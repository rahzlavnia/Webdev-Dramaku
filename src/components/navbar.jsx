import React from 'react';
import logo from '../assets/logo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';


const navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-gray-900 p-4">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} className="w-40 h-10 mr-2" alt="Logo" />
      </div>

      {/* Search and Filter */}
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-96 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-black"
        />
        <button
          id="filterButton"
          className="ml-2 bg-gray-700 text-white px-4 py-2 rounded-full relative"
        >
          Filter
        </button>

        {/* Dropdown Menu for Filters */}
        <div
          className="absolute right-0 mt-2 w-full bg-gray-700 rounded-lg shadow-lg z-10 hidden"
          id="filterDropdown"
          style={{ top: '100%', right: '0' }}
        >
          <div className="p-4">
            <h4 className="text-lg font-semibold text-white">Filter by:</h4>
            <div className="grid grid-cols-12 gap-4 mt-4">
              {/* Filters: Genre, Country, Year, Availability, Award, Status, Sort Alphabetically */}
              {/* Rendered as Select Dropdowns */}
              {['Genre', 'Country', 'Year', 'Availability', 'Award', 'Status', 'Sort Alphabetically'].map(
                (filter) => (
                  <div key={filter} className="col-span-4">
                    <label className="block text-white">{filter}</label>
                    <select className="w-full p-2 bg-gray-900 rounded">
                      {/* Dummy options */}
                      <option>{`Option for ${filter}`}</option>
                    </select>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Watchlist and Login Buttons */}
      <div className="flex items-center">
        <button className="bg-teal-500 text-white px-3 py-2 rounded-full flex items-center mr-2">
          <i className="fas fa-bookmark mr-2"></i> Watchlist
        </button>
        <a href="/login" className="bg-blue-500 text-white px-3 py-2 rounded-full">
          Login
        </a>
      </div>
    </nav>
  );
};

export default navbar;
