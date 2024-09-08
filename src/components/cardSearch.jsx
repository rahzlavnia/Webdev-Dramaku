import React from "react";

const cardSearch = ({ title, year, genres, actors, rating, views, imgSrc }) => {
  return (
    <div className="flex items-start bg-gray-900 rounded-lg p-4 shadow-md hover:bg-gray-800 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer">
      <img src={imgSrc} alt="Drama Poster" className="w-72 h-48 object-cover rounded-xl mr-4" />
      <div className="flex-1 flex flex-col justify-between">
        <div className="mb-2 space-y-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-400">{year}</p>
          <p className="text-gray-400">{genres.join(", ")}</p>
          <p className="text-gray-400">{actors.join(", ")}</p>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-yellow-400">⭐ {rating}</p>
          <p className="text-gray-400">Views: {views}</p>
        </div>
      </div>
    </div>
  );
};

export default cardSearch;
