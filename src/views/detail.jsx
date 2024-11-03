// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const MovieDetail = () => {
//   const { id } = useParams(); // Get the movie ID from URL
//   const [movie, setMovie] = useState(null);
//   const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
//   const [commentText, setCommentText] = useState('');
//   const [rating, setRating] = useState(0);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
//   const [filterRating, setFilterRating] = useState(0); // State for filtering comments by rating

//   // Simulate login check
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token); // If token exists, user is logged in
//   }, []);

//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:3005/movies/${id}`);
//         if (!response.ok) {
//           throw new Error(`Error fetching movie details: ${response.statusText}`);
//         }
//         const data = await response.json();
//         setMovie(data);
//       } catch (error) {
//         console.error("Error fetching movie details:", error);
//       }
//     };

//     fetchMovieDetails();
//   }, [id]);

//   if (!movie) return <div>Loading...</div>;

//   const extractYouTubeId = (url) => {
//     const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//     const match = url.match(regExp);
//     return match && match[2].length === 11 ? match[2] : null;
//   };

//   const videoId = extractYouTubeId(movie.trailer);

//   const handleCommentSubmit = async () => {
//     if (!commentText.trim() || rating === 0) {
//       alert("Please provide a comment and a rating.");
//       return; // Do not continue if comment or rating is invalid
//     }
  
//     try {
//       const response = await axios.post(
//         `http://localhost:3005/movies/${id}/comments`,
//         { 
//           commentText, 
//           rating,
//           status: false // Menambahkan status false ke data yang dikirim
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`, // Get token from localStorage
//           },
//         }
//       );
//       console.log(response.data); // Display success message
//       setCommentText(''); // Clear input after submit
//       setRating(0); // Reset rating
//       setIsCommentFormVisible(false); // Hide form after submit
//       setMovie((prevMovie) => ({
//         ...prevMovie,
//         comments: [
//           ...(prevMovie.comments || []), // Ensure comments exist and are an array
//           { userName: "You", text: commentText, rating, createdAt: new Date().toISOString() } // Add createdAt
//         ]
//       }));
//     } catch (error) {
//       console.error("Error adding comment:", error);
//       alert("Failed to add comment."); // Show alert if it fails
//     }
//   };
  

//   const filteredComments = filterRating
//     ? (movie.comments || []).filter(comment => comment.rating === filterRating)
//     : (movie.comments || []);

//   return (
//     <div>
//       <main className="p-8 max-w-5xl mx-auto">
//         {movie ? (
//           <div className="flex flex-col md:flex-row gap-8">
//             <div className="flex-none w-full md:w-1/5">
//               <img
//                 src={movie.images || 'https://via.placeholder.com/200x300?text=No+Image+Available'}
//                 alt={`${movie.title || 'Movie'} Poster`}
//                 className="w-full h-72 rounded shadow-lg mb-4"
//               />
//             </div>
//             <div className="flex-grow">
//               <h1 className="text-3xl text-gray-200 font-bold mb-2">{movie.title || 'Title Not Available'}</h1>
//               <p className="text-sm text-gray-400 mb-2">
//                 Alternative titles: {movie.alt_title === "NaN" ? "-" : (movie.alt_title || 'N/A')}
//               </p>
//               <p className="text-sm text-gray-400 mb-4">Year: {movie.year || 'Unknown'}</p>
//               <p className="text-sm text-gray-200 mb-4">{movie.synopsis || 'No synopsis available'}</p>
//               <p className="text-sm text-gray-200 mb-2">
//                 Genres: {movie.genres || 'No genres available'}
//               </p>
//               <p className="text-sm text-gray-200 mb-2">
//                 Rating: {movie.rating ? Number(movie.rating).toFixed(1) || '0.0' : 'N/A'}
//               </p>
//               <p className="text-sm text-gray-400 mb-2">Availability: {movie.availability || 'Unknown'}</p>
//               <p className="text-sm text-gray-400 mb-4">Awards: {movie.awards || 'No Awards'}</p>
//             </div>
//           </div>
//         ) : (
//           <div>No movie data available</div>
//         )}

//         {/* Stars Section */}
//         <div className="my-8 text-center">
//             <h2 className="text-2xl text-gray-200 font-bold mb-4">Stars</h2>
//             <div className="flex justify-center">
//               <div className="flex space-x-7 overflow-x-auto flex-nowrap">
//                 {movie.actors && movie.actors.length > 0 ? (
//                   movie.actors.map((actor, index) => (
//                     <div key={index} className="flex flex-col items-center flex-shrink-0">
//                       <div className="w-20 h-20 bg-gray-700 rounded-lg overflow-hidden mb-2">
//                         <img
//                           src={actor.url_photos || 'https://via.placeholder.com/100'}
//                           alt={actor.name}
//                           className="w-full h-full object-cover" // Menambahkan object-cover agar gambar proporsional
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = 'https://via.placeholder.com/100';
//                           }}
//                         />
//                       </div>
//                       <p className="text-gray-200 whitespace-normal break-words text-center max-w-[70px] text-xs">
//                         {actor.name.split(' ').length > 3
//                           ? actor.name.split(' ').map((word, i) => (
//                               <span key={i}>
//                                 {word}
//                                 <br />
//                               </span>
//                             ))
//                           : actor.name}
//                       </p>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-gray-400">No actors available</p>
//                 )}
//               </div>
//             </div>
//           </div>



//         {/* Video Section */}
//         <div className="bg-gray-800 rounded mb-8 p-10">
//           <div className="flex items-center justify-center">
//             {videoId ? (
//               <iframe
//                 width="560"
//                 height="315"
//                 src={`https://www.youtube.com/embed/${videoId}`}
//                 title="YouTube video player"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="rounded shadow-lg"
//               ></iframe>
//             ) : (
//               <p>No trailer available</p>
//             )}
//           </div>
//         </div>

//         {/* Comments Section */}
//         <div className="bg-gray-800 p-4 rounded mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold text-white">People think about this drama</h2>
//             {isLoggedIn ? (
//               <button
//                 onClick={() => setIsCommentFormVisible(!isCommentFormVisible)}
//                 className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition duration-300"
//               >
//                 Add Comment
//               </button>
//             ) : (
//               <p className="text-gray-400">Please log in to add a comment.</p>
//             )}
//           </div>

//           <div className="flex justify-between items-center mb-4">
//             <p className="text-white">({movie.comments ? movie.comments.length : 0}) Comments</p>

//             <select
//               className="bg-gray-700 text-white p-2 rounded"
//               onChange={(e) => setFilterRating(Number(e.target.value))}
//               defaultValue={filterRating}
//             >
//               <option value="0" className="text-yellow-500">Filter by: All Ratings</option>
//               <option value="5" className="text-yellow-500">★★★★★</option>
//               <option value="4" className="text-yellow-500">★★★★</option>
//               <option value="3" className="text-yellow-500">★★★</option>
//               <option value="2" className="text-yellow-500">★★</option>
//               <option value="1" className="text-yellow-500">★</option>
//             </select>
//           </div>

//           {isCommentFormVisible && (
//             <div className="mb-4">
//               <textarea
//                 rows="3"
//                 placeholder="Write your comment..."
//                 value={commentText}
//                 onChange={(e) => setCommentText(e.target.value)}
//                 className="w-full p-2 rounded bg-gray-700 text-white mb-2"
//               ></textarea>
//               <div className="flex items-center mb-4">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <span
//                     key={star}
//                     className={`cursor-pointer text-2xl ${
//                       rating >= star ? 'text-yellow-500' : 'text-gray-500'
//                     }`}
//                     onClick={() => setRating(star)} // Set rating when a star is clicked
//                   >
//                     ★
//                   </span>
//                 ))}
//               </div>
//               <button
//                 onClick={handleCommentSubmit}
//                 className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition duration-300"
//               >
//                 Submit
//               </button>
//             </div>
//           )}

//             <div>
//               {filteredComments.length > 0 ? (
//                 filteredComments.map((comment, index) => (
//                   <div key={index} className="mb-4 p-4 bg-gray-700 rounded">
//                     <p className="text-yellow-500">
//                       Rating: {'★'.repeat(comment.rating)} {/* Menampilkan bintang berdasarkan rating */}
//                     </p>
//                     <p className="text-gray-200">{comment.user || 'Anonymous'} says:</p> {/* Menampilkan nama user */}
//                     <p className="text-white">{comment.text}</p> {/* Menampilkan teks komentar */}
//                     <p className="text-gray-400 text-sm">
//                       {comment.date && !isNaN(new Date(comment.date).getTime()) // Validasi tanggal
//                         ? new Date(comment.date).toLocaleString()
//                         : 'Unknown Date'}
//                     </p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-400">No comments available.</p>
//               )}
//             </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default MovieDetail;
