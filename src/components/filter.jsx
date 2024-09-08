import React, { useState } from 'react';

const FilterComponent = () => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="relative flex items-center justify-center mt-10">
      <button
        onClick={toggleFilters}
        className="ml-2 bg-gray-700 text-white px-3 py-1 rounded-full relative"
      >
        Filter
      </button>

      {/* Dropdown Menu for Filters */}
      {showFilters && (
        <div
          className="absolute right-0 mt-2 w-[380px] bg-gray-700 rounded-lg shadow-lg z-10" // Adjust width to fit the size
          style={{ top: '100%', right: 0 }}
        >
          <div className="p-2"> {/* Reduce padding */}
            <h4 className="text-lg font-semibold text-white">Filter by:</h4>
            <div className="grid grid-cols-6 gap-2 mt-2"> {/* Reduce gap size and use 6 columns */}
              {/* Genre Filter */}
              <div className="col-span-2">
                <label className="block text-white text-xs">Genre</label> {/* Smaller text */}
                <select className="w-full p-1 bg-gray-900 text-white text-xs rounded"> {/* Reduced padding */}
                  <option value="Action">Action</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Drama">Drama</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Horror">Horror</option>
                </select>
              </div>

              {/* Country Filter */}
              <div className="col-span-2">
                <label className="block text-white text-xs">Country</label>
                <select className="w-full p-1 bg-gray-900 text-white text-xs rounded">
                  <option value="USA">USA</option>
                  <option value="Korea">Korea</option>
                  <option value="Japan">Japan</option>
                  <option value="China">China</option>
                </select>
              </div>

              {/* Year Filter */}
              <div className="col-span-2">
                <label className="block text-white text-xs">Year</label>
                <select className="w-full p-1 bg-gray-900 text-white text-xs rounded">
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </select>
              </div>

              {/* Availability Filter */}
              <div className="col-span-2">
                <label className="block text-white text-xs">Availability</label>
                <select className="w-full p-1 bg-gray-900 text-white text-xs rounded">
                  <option value="Available">Available</option>
                  <option value="Coming Soon">Coming Soon</option>
                </select>
              </div>

              {/* Award Filter */}
              <div className="col-span-2">
                <label className="block text-white text-xs">Award</label>
                <select className="w-full p-1 bg-gray-900 text-white text-xs rounded">
                  <option value="Won">Won</option>
                  <option value="Nominated">Nominated</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="col-span-2">
                <label className="block text-white text-xs">Status</label>
                <select className="w-full p-1 bg-gray-900 text-white text-xs rounded">
                  <option value="Released">Released</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
              </div>

              {/* Sort Alphabetically Filter */}
              <div className="col-span-6">
                <label className="block text-white text-xs">Sort Alphabetically</label>
                <select className="w-full p-1 bg-gray-900 text-white text-xs rounded">
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
