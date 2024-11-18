import React, { useState } from 'react';
import Cms from '../components/cms';
import ModalDrama from '../components/modalDrama';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 10;

const DramaList = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortColumn, setSortColumn] = useState('title');
    const navigate = useNavigate();


    const openModal = (movieId) => {
        const movieData = movies.find((movie) => movie.id === movieId);
        if (movieData) {
            setSelectedMovie(movieData);
            setIsModalOpen(true);
        }
    };

    const updateMoviesAfterDelete = (id) => {
        setMovies(movies.filter(movie => movie.id !== id));
    };

    const updateMoviesAfterApproval = (id) => {
        setMovies(movies.map(movie => {
            if (movie.id === id) {
                return { ...movie, status: 'approved' };
            }
            return movie;
        }
        ))
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
    };

    const handleSort = (column) => {
        const sortedMovies = [...movies];

        if (sortColumn === column && sortOrder === 'asc') {
            if (column === 'status') {
                sortedMovies.sort((a, b) => b[column].localeCompare(a[column]));
            } else {
                sortedMovies.sort((a, b) => b[column].localeCompare(a[column]));
            }
            setSortOrder('desc');
        } else {
            if (column === 'status') {
                sortedMovies.sort((a, b) => a[column].localeCompare(b[column]));
            } else {
                sortedMovies.sort((a, b) => a[column].localeCompare(b[column]));
            }
            setSortOrder('asc');
        }

        setMovies(sortedMovies);
        setSortColumn(column);
    };


    const fetchMovies = async () => {
        try {
            const response = await fetch(`http://localhost:3005/movies`);
            const data = await response.json();

            if (data.length > 0) {
                setMovies(data); // Store all movies
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    // Fetch countries when component mounts
    useEffect(() => {
        fetchMovies();
    }, []);

    const filteredMovies = movies.filter(movie => {
        const matchesStatus = statusFilter === "all" || movie.status.toLowerCase() === statusFilter;
        const matchesSearch = movie.title.toLowerCase().startsWith(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    // Adjust pagination logic based on filteredMovies
    const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentMovies = filteredMovies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <Cms activePage="drama">
            {/* Main Container for Form and Table */}
            <div className="w-full p-4 mb-5 max-w-full mx-auto">

                {/* Movie Search Bar */}
                <div className="flex justify-end items-center mb-10">
                    {/* Add Movie Filter Status Option  */}
                    <div className="w-1/2 flex justify-start">
                        <select
                            className="p-1 rounded-lg bg-gray-100 text-black focus:outline-none w-1/4"
                            value={statusFilter} // Set nilai sesuai dengan state statusFilter
                            onChange={(e) => setStatusFilter(e.target.value)} // Update state statusFilter saat berubah
                        >
                            <option value="all">All</option>
                            <option value="approved">Approved</option>
                            <option value="unapproved">Unapproved</option>
                        </select>
                    </div>
                    {/* Search Bar Section */}
                    <div className="w-1/2 flex justify-end">
                        <input
                            type="text"
                            placeholder="Search movie..."
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="p-1 rounded-lg bg-gray-100 text-black focus:outline-none w-1/2"
                        />
                    </div>
                </div>

                {/* Movie List Table */}
                <table className="w-full text-left border-collapse p-4 mb-5 max-w-full mx-auto">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th style={{ width: '10px' }} className="px-4 py-3">#</th>
                            <th style={{ width: '100px' }} className="px-4 py-3">
                                Title
                                <button onClick={() => handleSort('title')} className="ml-2 text-xs">
                                    {sortColumn === 'title' && sortOrder === 'asc' ? '▲' : '▼'}
                                </button>
                            </th>
                            <th style={{ width: '150px' }} className="px-4 py-3">Actors</th>
                            <th style={{ width: '100px' }} className="px-4 py-3">Genres</th>
                            <th style={{ width: '150px' }} className="px-4 py-3">Synopsis</th>
                            <th style={{ width: '50px' }} className="px-4 py-3">Status
                            </th>
                            <th style={{ width: '50px' }} className="py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentMovies.map((movie, index) => (
                            <tr key={movie.id} className="bg-white">
                                <td className="py-3 px-4 border-b border-gray-300 text-gray-800">{startIndex + index + 1}</td> {/* Column 1 */}
                                <td className="py-3 px-4 border-b border-gray-300 text-gray-800">{movie.title}</td> {/* Column 2 */}

                                {/* Render actors */}
                                <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                                    {movie.actors && movie.actors.length > 0
                                        ? movie.actors.map((actor, index) => (
                                            <span key={index}>
                                                {actor.name}{index < movie.actors.length - 1 && ', '}
                                            </span>
                                        ))
                                        : 'N/A'
                                    }
                                </td>

                                {/* Render genres */}
                                <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                                    {movie.genres ? movie.genres.split(',').map((genre, index) => (
                                        <span key={index}>{genre}{index < movie.genres.split(',').length - 1 && ', '}</span>
                                    )) : 'N/A'}
                                </td>

                                {/* Render synopsis */}
                                <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                                    {movie.synopsis && movie.synopsis.length > 100
                                        ? `${movie.synopsis.slice(0, 100)}...`
                                        : movie.synopsis}
                                </td>

                                {/* Render status */}
                                <td className="py-3 px-4 border-b border-gray-300 text-gray-800">{movie.status}</td>

                                <td className="py-3 px-4 border-b border-gray-300 text-gray-800 text-center">
                                    {/* Approval button (replaces "Edit" action) */}
                                    <button
                                        className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                                        onClick={() => openModal(movie.id)}>Approval
                                    </button>

                                    {/* Edit button (replaces "Delete" action) */}
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 ml-2"
                                        onClick={() => {
                                            navigate(`/dramaEdit/${movie.id}`);
                                        }}
                                    >
                                        Edit
                                    </button>

                                </td>

                                {isModalOpen && selectedMovie && (
                                    <ModalDrama
                                        movie={selectedMovie}
                                        closeModal={closeModal}
                                        updateMoviesAfterDelete={updateMoviesAfterDelete}
                                        updateMoviesAfterApproval={updateMoviesAfterApproval}
                                    />
                                )}

                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="flex justify-center space-x-2 mt-4">
                    <button
                        className="p-2 bg-gray-200 text-black rounded-md hover:bg-gray-100 font-bold"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}>{"<<"}
                    </button>
                    <button
                        className="p-2 bg-gray-200 text-black rounded-md hover:bg-gray-100 font-bold"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}>{"<"}
                    </button>
                    <span className="flex items-center">
                        {currentPage} of {totalPages}
                    </span>
                    <button
                        className="p-2 bg-gray-200 text-black rounded-md hover:bg-gray-100 font-bold"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}>{">"}
                    </button>
                    <button
                        className="p-2 bg-gray-200 text-black rounded-md hover:bg-gray-100 font-bold"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}>{">>"}
                    </button>
                </div>
            </div>
        </Cms>
    );
};

export default DramaList;
