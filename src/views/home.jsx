import React from 'react';
import Divergent from "../assets/divergent.png";

const Home = () => {
  return (
    <div>
      {/* Main content starts here */}
      <div className="relative flex justify-center items-center mb-6">
        {/* Slider Container */}
        <div className="overflow-hidden w-full h-96 flex justify-center">
          <div id="slider" className="flex transition-transform ease-out duration-500">
            {/* Slide 1 */}
            <div className="w-full flex-shrink-0 flex justify-center">
              <img src={Divergent} alt="Popular Movie 1" className="w-1/2 h-96 object-cover rounded-lg shadow-lg" />
            </div>
            {/* Slide 2 */}
            <div className="w-full flex-shrink-0 flex justify-center">
              <img src="https://via.placeholder.com/600x400" alt="Popular Movie 2" className="w-1/2 h-96 object-cover rounded-lg shadow-lg" />
            </div>
            {/* Slide 3 */}
            <div className="w-full flex-shrink-0 flex justify-center">
              <img src="https://via.placeholder.com/600x400" alt="Popular Movie 3" className="w-1/2 h-96 object-cover rounded-lg shadow-lg" />
            </div>
          </div>
        </div>

        {/* Left and Right Arrows */}
        <button id="prev" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-7xl flex items-center justify-center h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600 focus:outline-none">
          <span className="leading-none relative -top-2">‹</span>
        </button>

        <button id="next" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-7xl flex items-center justify-center h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600 focus:outline-none">
          <span className="leading-none relative -top-2">›</span>
        </button>
      </div>

      {/* Card Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Movie Card */}
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-gray-700 cursor-pointer">
            <img src={`https://via.placeholder.com/150?text=Movie+${index + 1}`} alt={`Movie Poster ${index + 1}`} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Movie Title {index + 1}</h3>
              <p className="text-gray-400">Year: {2023 - index}</p>
              <p className="text-gray-400">Genre: {index % 2 === 0 ? 'Action, Drama' : 'Romance, Comedy'}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-yellow-400">⭐ {Math.random().toFixed(1) * 10}</p>
                <p className="text-gray-400">Views: {Math.floor(Math.random() * 2) + 1}M</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
