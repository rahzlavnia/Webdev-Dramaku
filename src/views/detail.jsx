import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = () => {
  const { id } = useParams(); // Get the movie ID from URL
  const [movie, setMovie] = useState(null);
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State untuk status login

  // Simulasi pengecekan login
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Jika ada token, berarti pengguna sudah login
  }, []);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3005/api/movies/${id}`);
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

  const extractYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = extractYouTubeId(movie.trailer);

  const handleCommentSubmit = async () => {
    if (!commentText.trim() || rating === 0) {
      alert("Please provide a comment and a rating.");
      return; // Tidak lanjutkan jika komentar atau rating tidak valid
    }

    try {
      const response = await axios.post(
        `http://localhost:3005/movies/${id}/comments`,
        { commentText, rating },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Ambil token dari localStorage
          },
        }
      );
      console.log(response.data); // Tampilkan pesan sukses
      setCommentText(''); // Clear input after submit
      setRating(0); // Reset rating
      setIsCommentFormVisible(false); // Sembunyikan form setelah submit
      setMovie(prevMovie => ({
        ...prevMovie,
        comments: [
          ...(prevMovie.comments || []), // Pastikan comments ada dan merupakan array
          { userName: "You", text: commentText, rating, createdAt: new Date().toISOString() } // Menambahkan createdAt
        ]
      }));
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment."); // Tampilkan alert jika gagal
    }
  };

  return (
    <div>
      <main className="p-8 max-w-5xl mx-auto">
        {movie ? (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-none w-full md:w-1/5">
              <img
                src={movie.images || 'https://via.placeholder.com/200x300?text=No+Image+Available'}
                alt={`${movie.title || 'Movie'} Poster`}
                className="w-full h-72 rounded shadow-lg mb-4"
              />
            </div>
            <div className="flex-grow">
              <h1 className="text-3xl text-gray-200 font-bold mb-2">{movie.title || 'Title Not Available'}</h1>
              <p className="text-sm text-gray-400 mb-2">
                Alternative titles: {movie.alt_title === "NaN" ? "-" : (movie.alt_title || 'N/A')}
              </p>
              <p className="text-sm text-gray-400 mb-4">Year: {movie.year || 'Unknown'}</p>
              <p className="text-sm text-gray-200 mb-4">{movie.synopsis || 'No synopsis available'}</p>
              <p className="text-sm text-gray-200 mb-2">
                Genres: {movie.genres || 'No genres available'}
              </p>
              <p className="text-sm text-gray-200 mb-2">
                Rating: {movie.rating ? Number(movie.rating).toFixed(1) || '0.0' : 'N/A'}
              </p>
              <p className="text-sm text-gray-400 mb-2">Availability: {movie.availability || 'Unknown'}</p>
              <p className="text-sm text-gray-400 mb-4">Awards: {movie.awards || 'No Awards'}</p>
            </div>
          </div>
        ) : (
          <div>No movie data available</div>
        )}

        {/* Stars Section */}
        <div className="my-8 text-center">
          <h2 className="text-2xl text-gray-200 font-bold mb-4">Stars</h2>
          <div className="flex justify-center space-x-7 flex-wrap">
            {movie.actors && movie.actors.length > 0 ? (
              movie.actors.slice(0, 9).map((actor, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center flex-shrink-0"
                >
                  <img
                    src={actor.url_photos || 'https://via.placeholder.com/100'}
                    alt={actor.name}
                    className="w-20 h-20 bg-gray-700 rounded-full mb-2"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop if the fallback image fails
                      e.target.src = 'https://via.placeholder.com/100'; // Fallback placeholder image
                    }}
                  />
                  <p className="text-gray-200 whitespace-normal break-words text-center max-w-[70px] text-xs">
                    {actor.name.split(' ').length > 3
                      ? actor.name.split(' ').map((word, i) => (
                        <span key={i}>
                          {word}
                          <br />
                        </span>
                      ))
                      : actor.name}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No actors available</p>
            )}
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">People think about this drama</h2>
            {isLoggedIn ? (
              <button
                onClick={() => setIsCommentFormVisible(!isCommentFormVisible)}
                className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition duration-300"
              >
                Add Comment
              </button>
            ) : (
              <p className="text-gray-400">Please log in to add a comment.</p>
            )}
          </div>

          <div className="flex justify-between items-center mb-4">
            <p className="text-white">({movie.comments ? movie.comments.length : 0}) Comments</p>

            <select className="bg-gray-700 text-white p-2 rounded">
              <option value="5" className="text-yellow-500">Filter by: ★★★★★</option>
              <option value="4" className="text-yellow-500">★★★★</option>
              <option value="3" className="text-yellow-500">★★★</option>
              <option value="2" className="text-yellow-500">★★</option>
              <option value="1" className="text-yellow-500">★</option>
            </select>
          </div>

          {isCommentFormVisible && isLoggedIn && (
            <div className="mb-4 p-4 bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Add Your Comment</h3>

              {/* Rating Bintang */}
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer text-3xl ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Input Teks untuk Komentar */}
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full p-2 mb-2 rounded-lg bg-gray-800 text-white"
                placeholder="Write your comment here..."
                rows="3"
              ></textarea>

              <button
                onClick={handleCommentSubmit}
                className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-300"
              >
                Submit Comment
              </button>
            </div>
          )}

          {/* Daftar komentar */}
          {movie.comments && movie.comments.length > 0 ? (
            movie.comments.map((comment, index) => (
              <div key={index} className="mb-2 p-2 bg-gray-600 rounded">
                <p className="text-yellow-500">{comment.username || 'Anonymous'}</p> {/* Default jika userName tidak ada */}
                <p className="text-gray-400">{comment.created_at ? new Date(comment.created_at).toLocaleString() : 'Date not available'}</p> {/* Penanganan tanggal */}
                <p className="text-white">{comment.text}</p>
                <p className="text-gray-400">Rating: {comment.rating} ★</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No comments yet.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default MovieDetail;
