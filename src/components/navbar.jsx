import React from 'react';

const navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-gray-900 p-4">
      <div className="flex items-center">
        <img src="../dist/img_src/logo.png" alt="DramaKu Logo" className="w-40 h-10 mr-2" />
      </div>
      <div className="relative flex items-center">
        <input type="text" placeholder="Search..." className="w-96 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-black" />
        <button id="filterButton" className="ml-2 bg-gray-700 text-white px-4 py-2 rounded-full">Filter</button>
      </div>
      <a href="/login" className="bg-blue-500 text-white px-3 py-2 rounded-full">Login</a>
    </nav>
  );
};

export default navbar;
