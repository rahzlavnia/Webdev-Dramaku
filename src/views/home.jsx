import React from 'react';
import DefaultLayout from "../components/base";
import Slider from '../components/slider';
import CardFilm from '../components/cardFilm';
import divergentImage from '../assets/divergent.png';
import SearchBar from '../components/search';


const home = () => {
  const films = [
    { image:  divergentImage, title: 'Divergent', year: '2023', genre: 'Action, Drama', rating: 8.5, views: '1.2M' },
    { image: 'https://via.placeholder.com/150', title: 'Another Movie', year: '2022', genre: 'Romance, Comedy', rating: 7.9, views: '800K' },
    { image: 'https://via.placeholder.com/150', title: 'Third Movie', year: '2021', genre: 'Thriller, Mystery', rating: 9.1, views: '500K' },
    { image: 'https://via.placeholder.com/150', title: 'Third Movie', year: '2021', genre: 'Thriller, Mystery', rating: 9.1, views: '500K' },
    { image: 'https://via.placeholder.com/150', title: 'Third Movie', year: '2021', genre: 'Thriller, Mystery', rating: 9.1, views: '500K' },
    { image: 'https://via.placeholder.com/150', title: 'Third Movie', year: '2021', genre: 'Thriller, Mystery', rating: 9.1, views: '500K' },
  ];

  return (
    <DefaultLayout>
        <SearchBar /> 
    <div className="bg-gray-900 text-white">
      <main className="p-6 pt-1">
        <Slider />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {films.map((film, index) => (
            <CardFilm key={index} {...film} />
          ))}
        </div>
      </main>
    </div>
    </DefaultLayout>
  );
};

export default home;