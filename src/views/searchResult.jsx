import React from "react";
import CardSearch from "../components/cardSearch"; // Capitalized the component name
import DefaultLayout from "../components/base";
import SearchBar from '../components/search';
import mazeRunner from '../assets/maze-runner-1.png';

const SearchResult = () => {
  const dramas = [
    {
      title: "Maze Runner",
      year: 2024,
      genres: ["Action", "Adventure"],
      actors: ["Actor 1", "Actor 2", "Actor 3"],
      rating: 8.5,
      views: "1.2M",
      imgSrc: mazeRunner,
    },
    // Add more drama items here
  ];

  return (
    <DefaultLayout>
      <SearchBar /> 
      <div className="space-y-4">
        {dramas.map((drama, index) => (
          <CardSearch 
            key={index}
            title={drama.title}
            year={drama.year}
            genres={drama.genres}
            actors={drama.actors}
            rating={drama.rating}
            views={drama.views}
            imgSrc={drama.imgSrc}
          />
        ))}
      </div>
    </DefaultLayout>
  );
};

export default SearchResult;
