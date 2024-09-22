import React from 'react';
import Divergent from "../assets/divergent.png";
import CardMovie from '../components/cardMovie'; 

const Home = () => {
  const movies = [
    { poster: 'https://via.placeholder.com/200x250?text=Movie+1', title: 'Movie 1', year: 2022, genre: 'Action, Comedy', rating: 7.9, views: 1.5 },
    { poster: 'https://via.placeholder.com/200x250?text=Movie+2', title: 'Movie 2', year: 2022, genre: 'Romance, Comedy', rating: 6.9, views: 1.5 },
    { poster: 'https://via.placeholder.com/200x250?text=Movie+3', title: 'Movie 3', year: 2021, genre: 'Action, Drama', rating: 8.1, views: 2.1 },
    { poster: 'https://via.placeholder.com/200x250?text=Movie+4', title: 'Movie 4', year: 2021, genre: 'Horror, Thriller', rating: 7.5, views: 1.8 },
    { poster: 'https://via.placeholder.com/200x250?text=Movie+5', title: 'Movie 5', year: 2020, genre: 'Action, Drama', rating: 8.0, views: 2.0 },
    { poster: 'https://via.placeholder.com/200x250?text=Movie+6', title: 'Movie 6', year: 2020, genre: 'Comedy, Drama', rating: 7.2, views: 1.6 },
    { poster: 'https://via.placeholder.com/200x250?text=Movie+7', title: 'Movie 7', year: 2019, genre: 'Action, Comedy', rating: 7.8, views: 1.9 },
    { poster: 'https://via.placeholder.com/200x250?text=Movie+8', title: 'Movie 8', year: 2019, genre: 'Romance, Drama', rating: 7.0, views: 1.7 },
    { poster: 'https://via.placeholder.com/200x250?text=Movie+9', title: 'Movie 9', year: 2018, genre: 'Action, Thriller', rating: 8.3, views: 2.3 },
    { poster: 'https://via.placeholder.com/200x250?text=Movie+10', title: 'Movie 10', year: 2018, genre: 'Horror, Thriller', rating: 7.6, views: 1.8 },
    { poster: 'https://via.placeholder.com/200x250?text=Movie+11', title: 'Movie 11', year: 2017, genre: 'Action, Comedy', rating: 7.7, views: 1.9 },
    { poster: 'https://via.placeholder.com/200x250?text=Movie+12', title: 'Movie 12', year: 2017, genre: 'Romance, Drama', rating: 7.1, views: 1.7 },
  ];

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
        {/* Render MovieCard components */}
        {movies.map((movie, index) => (
          <CardMovie
            key={index}
            poster={movie.poster}
            title={movie.title}
            year={movie.year}
            genre={movie.genre}
            rating={movie.rating}
            views={movie.views}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
