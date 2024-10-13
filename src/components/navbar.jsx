import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State for dropdown visibility
  const navigate = useNavigate();
  const location = useLocation(); // Get location object

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    queryParams.append('term', searchTerm);
  
    navigate(`/search?${queryParams.toString()}`);
  };
  

 
  const handleLogoClick = () => {
    navigate('/'); // Navigate to home page
  };

  // Reset searchTerm when user navigates to home or other non-search pages
  useEffect(() => {
    if (location.pathname === '/') {
      setSearchTerm(''); // Reset search term to empty on home page
    }
  }, [location.pathname]); // Effect will run every time the route changes

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const filterButton = document.getElementById('filterButton');
      const filterDropdown = document.getElementById('filterDropdown');
      if (
        filterDropdown &&
        !filterDropdown.contains(event.target) &&
        filterButton &&
        !filterButton.contains(event.target)
      ) {
        setIsDropdownVisible(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex justify-between items-center bg-gray-900 p-4">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src={logo}
          className="w-40 h-10 mr-2 cursor-pointer"
          alt="Logo"
          onClick={handleLogoClick} // Add onClick event to navigate to home
        />
      </div>

      {/* Search and Filter */}
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm} // Controlled input based on searchTerm state
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Handle search on Enter key
          className="w-96 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-black"
        />
        <button
          id="filterButton"
          onClick={toggleDropdown}
          className="ml-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-full relative"
        >
          Filter
        </button>

        {/* Dropdown Menu for Filters */}
        <div
          id="filterDropdown"
          className={`absolute right-0 mt-2 w-full bg-gray-700 rounded-lg shadow-lg z-10 ${isDropdownVisible ? '' : 'hidden'}`}
          style={{ top: '100%', right: '0' }}
        >
          <div className="p-4">
            <h4 className="text-lg font-semibold text-white">Filter by:</h4>
            <div className="grid grid-cols-12 gap-4 mt-4">
              {/* Genre Filter */}
              <div className="col-span-4">
                <label className="block text-white">Genre</label>
                <select className="w-full p-2 bg-gray-900 rounded">
                  <option value="Action">Action</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Drama">Drama</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Horror">Horror</option>
                </select>
              </div>

              {/* Country Filter */}
              <div className="col-span-4">
                <label className="block text-white">Country</label>
                <select className="w-full p-2 bg-gray-900 rounded">
                  <option value="USA">USA</option>
                  <option value="Korea">Korea</option>
                  <option value="Japan">Japan</option>
                  <option value="China">China</option>
                </select>
              </div>

              {/* Year Filter */}
              <div className="col-span-4">
                <label className="block text-white">Year</label>
                <select className="w-full p-2 bg-gray-900 rounded">
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </select>
              </div>

              {/* Availability Filter */}
              <div className="col-span-4">
                <label className="block text-white">Availability</label>
                <select className="w-full p-2 bg-gray-900 rounded">
                  <option value="Available">Available</option>
                  <option value="Coming Soon">Coming Soon</option>
                </select>
              </div>

              {/* Award Filter */}
              <div className="col-span-4">
                <label className="block text-white">Award</label>
                <select className="w-full p-2 bg-gray-900 rounded">
                  <option value="Won">Won</option>
                  <option value="Nominated">Nominated</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="col-span-4">
                <label className="block text-white">Status</label>
                <select className="w-full p-2 bg-gray-900 rounded">
                  <option value="Released">Released</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
              </div>

              {/* Sort Alphabetically Filter */}
              <div className="col-start-4 col-end-9">
                <label className="block text-white">Sort Alphabetically</label>
                <select className="w-full p-2 bg-gray-900 rounded">
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Watchlist and Login Buttons */}
      <div className="flex items-center">
        <a href="/login" className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-full flex items-center mr-2">
          <i className="fas fa-bookmark mr-2"></i> Watchlist
        </a>
        <a href="/login" className="bg-blue-500 hover:bg-blue-600  text-white px-3 py-2 rounded-full">
          Login
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
