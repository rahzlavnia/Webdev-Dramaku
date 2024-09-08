import React, { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri'; // Importing the search icon from react-icons

function SearchBar() {
    const [searchText, setSearchText] = useState('');

    return (
        <div className="flex justify-center items-center h-20">
            <div className="flex items-center bg-white rounded-full px-5 py-1 shadow-md">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    className="outline-none text-lg mr-2 w-96"
                />
                <RiSearchLine className="search-icon text-gray-500" /> {/* Using react-icons for search icon */}
            </div>
        </div>
    );
}

export default SearchBar;
