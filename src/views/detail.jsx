// import React from 'react';

// const Detail = ({ movies }) => {
//   return (
    // <div>
    //   {/* Main content */}
    //   <main className="p-8 max-w-6xl mx-auto">
    //     {/* Drama Info Section */}
    //     <div className="flex flex-col md:flex-row gap-8">
    //       {/* Image Section */}
    //       <div className="flex-none w-full md:w-1/5">
    //         <img src={movies.posterUrl} alt={`${movies.title} Poster`} className="w-full h-auto rounded shadow-lg mb-4" />
    //       </div>

        //   {/* Title and Description */}
        //   <div className="flex-grow">
        //     <h1 className="text-3xl text-gray-200 font-bold mb-2">{movies.title}</h1>
            // <p className="text-sm text-gray-400 mb-2">Other titles: {movies.otherTitles.join(', ')}</p>
        //     <p className="text-sm text-gray-400 mb-4">Year: {movies.year}</p>
        //     <p className="text-sm text-gray-200 mb-4">{movies.description}</p>
            // <p className="text-sm text-gray-200 mb-2">Genres: {movies.genres.join(', ')}</p>
            // <p className="text-sm text-gray-200 mb-2">Rating: {movies.rating}/5</p>
        //     <p className="text-sm text-gray-400">Availability: {movies.availability}</p>
        //   </div>
        // </div>

//         {/* Stars Section */}
//         <div className="my-8 text-center">
//           <h2 className="text-2xl text-gray-200 font-bold mb-4">Stars</h2>
//           <div className="flex justify-center space-x-4 overflow-x-auto">
//             {movies.actors.map((actor, index) => (
//               <div key={index} className="flex flex-col items-center">
//                 <img src={actor.photoUrl} alt={actor.name} className="w-20 h-20 bg-gray-700 rounded-full mb-2" />
//                 <p>{actor.name}</p>
//               </div>
//             ))}
//           </div>
//         </div>

        // {/* Video Section */}
        // <div className="bg-gray-800 rounded mb-8 p-10">
        //   <div className="flex items-center justify-center">
        //     <img src={movies.videoThumbnail} alt={`${movies.title} Video`} className="rounded shadow-lg" />
        //   </div>
        // </div>

        // {/* Comments Section */}
        // <div className="bg-gray-800 p-4 rounded mb-8">
        //   <h2 className="text-2xl text-white font-bold mb-4">People think about this drama</h2>
        //   <div className="flex justify-between items-center mb-4">
        //     <p className="text-white">({movies.comments.length}) Comments</p>
        //     <div className="flex items-center">
        //       <label className="text-white mr-2">Filter by:</label>
        //       <select className="bg-gray-700 text-white p-2 rounded">
        //         <option value="5" className="text-yellow-500">★★★★★</option>
        //         <option value="4" className="text-yellow-500">★★★★</option>
        //         <option value="3" className="text-yellow-500">★★★</option>
        //         <option value="2" className="text-yellow-500">★★</option>
        //         <option value="1" className="text-yellow-500">★</option>
        //       </select>
        //     </div>
        //   </div>

//           {/* Scrollable Comments Section */}
//           <div className="space-y-4 max-h-60 overflow-y-auto">
//             {movies.comments.map((comment, index) => (
//               <div key={index} className="border-b border-gray-700 pb-4">
//                 <p className="text-sm text-white">{comment.user} ({comment.date}) said:</p>
//                 <p className="mb-2 text-white">{comment.text}</p>
//                 <div className="text-yellow-500">{'★'.repeat(comment.rating)}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Add Your Comment Section */}
//         <div className="bg-gray-800 p-4 rounded max-w-md">
//           <h3 className="text-lg text-white font-bold mb-2">Add yours!</h3>
//           <form className="space-y-4">
//             <input type="text" placeholder="Name" className="w-full p-2 bg-gray-700 rounded text-white" />
//             <div className="flex items-center">
//               <span className="mr-2 text-white">Rate:</span>
//               <select className="bg-gray-700 text-white p-2 rounded">
//                 <option value="5" className="text-yellow-500">★★★★★</option>
//                 <option value="4" className="text-yellow-500">★★★★</option>
//                 <option value="3" className="text-yellow-500">★★★</option>
//                 <option value="2" className="text-yellow-500">★★</option>
//                 <option value="1" className="text-yellow-500">★</option>
//               </select>
//             </div>
//             <textarea placeholder="Your thoughts" className="w-full p-2 bg-gray-700 rounded text-white"></textarea>
//             <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 p-2 rounded text-white">Submit</button>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Detail;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const { id } = useParams(); // Get the movie ID from URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3005/movies/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching movie details: ${response.statusText}`);
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  // Function to extract YouTube video ID from a full YouTube URL
  const extractYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = extractYouTubeId(movie.trailer); // Extract video ID

  return (
    <div>
      {/* Main content */}
      <main className="p-8 max-w-6xl mx-auto">
        {/* Movie Info Section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Section */}
          <div className="flex-none w-full md:w-1/5">
            <img
              src={movie.images}
              alt={`${movie.title} Poster`}
              className="w-full h-auto rounded shadow-lg mb-4"
            />
          </div>
          <div className="flex-grow">
            {/* Title and Description */}
            <h1 className="text-3xl text-gray-200 font-bold mb-2">{movie.title}</h1>
            <p className="text-sm text-gray-400 mb-2">Alternative titles: {movie.alt_title}</p>
            <p className="text-sm text-gray-400 mb-4">Year: {movie.year}</p>
            <p className="text-sm text-gray-200 mb-4">{movie.synopsis}</p>
            <p className="text-sm text-gray-200 mb-2">
              Genres: {movie.genres ? movie.genres.join(', ') : "No genres available"}
            </p>
            <p className="text-sm text-gray-200 mb-2">Rating: {movie.rating}</p>
            <p className="text-sm text-gray-400">Availability: {movie.availability}</p>
          </div>
        </div>

        {/* Video Section */}
        <div className="bg-gray-800 rounded mb-8 p-10">
          <div className="flex items-center justify-center">
            {videoId ? (
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded shadow-lg"
              ></iframe>
            ) : (
              <p>No trailer available</p>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-gray-800 p-4 rounded mb-8">
          <h2 className="text-2xl text-white font-bold mb-4">People think about this drama</h2>
          <div className="flex justify-between items-center mb-4">
            <p className="text-white">({movie.comments.length}) Comments</p>
            <div className="flex items-center">
              <label className="text-white mr-2">Filter by:</label>
              <select className="bg-gray-700 text-white p-2 rounded">
                <option value="5" className="text-yellow-500">★★★★★</option>
                <option value="4" className="text-yellow-500">★★★★</option>
                <option value="3" className="text-yellow-500">★★★</option>
                <option value="2" className="text-yellow-500">★★</option>
                <option value="1" className="text-yellow-500">★</option>
              </select>
            </div>
          </div>
        </div>

        {/* Display Comments */}
        <div className="space-y-4 max-h-60 overflow-y-auto">
          {movie.comments.map((comment, index) => (
            <div key={index} className="border-b border-gray-700 pb-4">
              <p className="text-sm text-white">{comment.user} ({comment.date}) said:</p>
              <p className="mb-2 text-white">{comment.text}</p>
              <div className="text-yellow-500">{'★'.repeat(comment.rating)}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MovieDetail;

