import React, { useState, useEffect } from 'react';

function ModalDrama({ movie, closeModal, setMovies, movies, updateMoviesAfterDelete, updateMoviesAfterApproval }) {
    const [genreColors, setGenreColors] = useState({});

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch('http://localhost:3005/api/genres');
                const genres = await response.json();

                const colors = generateGenreColors(genres);
                setGenreColors(colors);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, []);

    const generateGenreColors = (genres) => {
        const colors = {};

        const colorPalette = [
            '#f87171', '#fbbf24', '#34d399', '#ec4899', '#60a5fa', '#f43f5e', '#a855f7', '#10b900', '#4338ca', '#fb923c',
            '#e879f9', '#a3e635', '#2563eb', '#9ca3af', '#fca5a5', '#fde047', '#4ade80', '#f9a8d4', '#93c5fd', '#f8719d',
            '#8b5cf6', '#bbf7d0', '#4f46e5', '#fdba74', '#e0aaff', '#bef264', '#7dd3fc', '#d4e100', '#166534', '#65a30d',
            '#fbcfe8', '#f97316', '#fde68a', '#0ea5e9', '#9aa800', '#22c55e', '#c084fc', '#14532d', '#2dd4bf', '#d1fae5',
            '#d946ef', '#0284c7', '#a3e635', '#6366f1', '#059669', '#facc15', '#b91c1c', '#4c1d95', '#dc2626', '#1d4ed8'
        ];

        genres.forEach((genre, index) => {
            colors[genre.name.toLowerCase()] = colorPalette[index % colorPalette.length];
        });

        return colors;
    };

    if (!movie) return null;

    // Function to extract video ID from a YouTube URL
    const extractYouTubeVideoId = (url) => {
        const patterns = [
            /youtu\.be\/([a-zA-Z0-9_-]{11})/,        // Matches youtu.be/VIDEO_ID
            /youtube\.com\/.*v=([a-zA-Z0-9_-]{11})/, // Matches youtube.com/?v=VIDEO_ID
            /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/, // Matches youtube.com/embed/VIDEO_ID
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) return match[1];
        }
        return null; // Returns null if no valid ID is found
    };

    // Extract video ID from movie trailer URL
    const videoId = movie.trailer ? extractYouTubeVideoId(movie.trailer) : null;

    // Construct the embed URL only if a valid video ID is found
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

    const handleApproved = async (id) => {
        try {
            const response = await fetch(`http://localhost:3005/movies/${id}/approve`, {
                method: 'PUT',
            });
            console.log('Approve Status:', response.status);
    
            if (response.ok) {
                if (movies && Array.isArray(movies)) { // Tambahkan pengecekan ini
                    const updatedMovies = movies.map((m) =>
                        m.id === id ? { ...m, status: 'Approved' } : m
                    );
                    setMovies(updatedMovies);
                }
                closeModal(); // Close the modal
                updateMoviesAfterApproval(id); // Update list in CmsDrama
                window.alert('Movie approved successfully');
            } else {
                console.error('Failed to approve movie');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };    
   
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:3005/movies/${id}`, {
                    method: 'DELETE',
                });
                console.log('Delete Status:', response.status);

                if (response.ok) {
                    window.alert('Movie deleted successfully');
                    updateMoviesAfterDelete(id);  // Update list in CmsDrama
                    closeModal();                 // Close the modal
                } else {
                    console.error('Failed to delete movie');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div
            id="editModal"
            className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50"
            onClick={closeModal}
        >
            <div
                className="bg-gray-800 text-white rounded-lg w-2/3 max-w-4xl h-5/6 p-6 overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-center mb-4">
                    <button
                        type="button"
                        className="bg-teal-600 rounded-xl text-white hover:bg-teal-700 py-1 px-4 mr-2"
                        onClick={() => handleApproved(movie.id)}
                    >
                        Approve
                    </button>
                    <button
                        type="button"
                        className="bg-red-500 rounded-xl text-white hover:bg-red-600 py-1 px-4 mr-2"
                        onClick={() => handleDelete(movie.id)}
                    >
                        Delete
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-6">
                    {/* Left Section: Movie Poster */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="w-48 h-72 rounded-lg shadow-lg overflow-hidden">
                            <img
                                src={movie.images || 'https://via.placeholder.com/200x300?text=No+Image+Available'}
                                alt={`${movie.title || 'Movie'} Poster`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Section: Movie Details */}
                    <div className="flex flex-col">
                        <h3 className="text-3xl font-bold mb-3">{movie.title || 'Title Not Available'}</h3>

                        <p className="text-sm text-gray-300 mb-2">
                            <strong>Alternative Titles:</strong> {movie.alt_title === "NaN" ? "-" : (movie.alt_title || 'N/A')}
                        </p>

                        <div className="flex items-center gap-2 mb-3">
                            {movie.year && (
                                <span className="px-3 py-1 rounded-full text-sm font-medium text-black bg-white">
                                    {movie.year}
                                </span>
                            )}
                            {movie.country_name && (
                                <span className="px-3 py-1 rounded-full text-sm font-medium text-black bg-white">
                                    {movie.country_name}
                                </span>
                            )}
                        </div>

                        <p className="text-sm text-gray-300 mb-4">{movie.synopsis || 'No synopsis available'}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {movie.genres ? (
                                movie.genres.split(',').map((genre, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 rounded-full text-sm font-medium text-black"
                                        style={{
                                            backgroundColor: genreColors[genre.trim().toLowerCase()] || '#9ca3af',
                                        }}
                                    >
                                        {genre.trim()}
                                    </span>
                                ))
                            ) : (
                                <span className="text-sm text-gray-200">No genres available</span>
                            )}
                        </div>


                        <div className="flex items-center mb-2">
                            <svg
                                className="w-5 h-5 text-yellow-400 mr-1"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 .587l3.668 7.568 8.332 1.213-6.016 5.885 1.418 8.288L12 18.897l-7.402 3.888 1.418-8.288L.584 9.368l8.332-1.213z" />
                            </svg>
                            <p className="text-sm text-gray-300">Rating: {movie.rating ? Number(movie.rating).toFixed(1) : 'N/A'}</p>
                        </div>

                        <p className="text-sm text-gray-300 mb-2">
                            <strong>Availability:</strong> {movie.availability || 'Unknown'}
                        </p>
                        <p className="text-sm text-gray-300 mb-4"><strong>Awards:</strong> {movie.award || 'No Awards'}</p>
                    </div>
                </div>

                {/* Full-Width Actors Section */}
                <div className="w-full text-center mt-6 mb-4">
                    <h4 className="text-xl font-semibold mb-2">Stars</h4>
                    <div className="flex justify-center flex-wrap gap-2">
                        {movie.actors && movie.actors.length > 0 ? (
                            [...movie.actors]
                                .sort((a, b) => (a.url_photos ? -1 : 1)) // Sort: prioritize actors with URLs
                                .slice(0, 9)
                                .map((actor, index) => (
                                    <div key={index} className="flex flex-col items-center flex-shrink-0">
                                        <img
                                            src={actor.url_photos || 'https://via.placeholder.com/100'}
                                            alt={actor.name}
                                            className="w-20 h-20 bg-gray-700 rounded-full mb-2 object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/100';
                                            }}
                                        />
                                        <p className="text-gray-200 whitespace-normal break-words text-center max-w-[70px] text-xs">
                                            {actor.name && typeof actor.name === 'string' && actor.name.split(' ').length > 3
                                                ? actor.name.split(' ').map((word, i) => (
                                                    <span key={i}>
                                                        {word}
                                                        <br />
                                                    </span>
                                                ))
                                                : actor.name || "No name available"}
                                        </p>
                                    </div>
                                ))
                        ) : (
                            <p className="text-gray-400">No actors available</p>
                        )}
                    </div>
                </div>

                {/* Full-Width Trailer Section */}
                <div className="w-full justify-center text-center mb-4 mt-10">
                    {embedUrl ? (
                        <iframe
                            width="60%"
                            height="250"
                            src={embedUrl}
                            title="Trailer"
                            className="rounded-lg shadow-lg mx-auto" // Menambahkan mx-auto
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <p className="text-sm text-gray-300">No trailer available</p>
                    )}
                </div>

            </div>
        </div>
    );
}

export default ModalDrama;
