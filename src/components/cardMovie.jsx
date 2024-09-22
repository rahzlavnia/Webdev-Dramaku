import React from 'react';

const CardMovie = ({ poster, title, year, genre, rating, views }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-gray-700 cursor-pointer">
      <img src={poster} alt={title} className="w-full h-auto object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-400">Year: {year}</p>
        <p className="text-gray-400">Genre: {genre}</p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-yellow-400">⭐ {rating}</p>
          <p className="text-gray-400">Views: {views}M</p>
        </div>
      </div>
    </div>
  );
};

export default CardMovie;
