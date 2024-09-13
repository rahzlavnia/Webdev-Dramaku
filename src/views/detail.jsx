import myIcon from '../assets/mufasa-poster-1.webp'; 
import React from 'react';


const SearchResult = () => {
  return (
    <div>
    {/* Main content */}
    <main className="p-8 max-w-6xl mx-auto">
                {/* Drama Info Section */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Image Section */}
                    <div className="flex-none w-full md:w-1/5">
                        <img src={myIcon} alt="Drama Poster" className="w-full h-auto rounded shadow-lg mb-4" />
                    </div>

                    {/* Title and Description */}
                    <div className="flex-grow">
                        <h1 className="text-3xl text-gray-200 font-bold mb-2">Judul</h1>
                        <p className="text-sm text-gray-400 mb-2">Other titles: Title 2, Title 3, Title 4</p>
                        <p className="text-sm text-gray-400 mb-4">Year: Spring 2016</p>
                        <p className="text-sm text-gray-200 mb-4">
                            When an unprecedented heinous criminal is released from prison, a public bounty with a payout of 20 billion won is offered for his murder...
                        </p>
                        <p className="text-sm text-gray-200 mb-2">Genres: Action, Thriller, Horror</p>
                        <p className="text-sm text-gray-200 mb-2">Rating: 3.5/5</p>
                        <p className="text-sm text-gray-400">Availability: Fansub: @solsub on X</p>
                    </div>
                </div>

                {/* Stars Section */}
                <div className="my-8 text-center">
                    <h2 className="text-2xl text-gray-200 font-bold mb-4">Stars</h2>
                    <div className="flex justify-center space-x-4 overflow-x-auto">
                        {['Song Joong Ki', 'Kim Ji Won', 'Son Hye Kyo', 'Jin Goo', 'Actor 1', 'Actor 2'].map((actor, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <img src="https://via.placeholder.com/100" alt={actor} className="w-20 h-20 bg-gray-700 rounded-full mb-2" />
                                <p>{actor}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Video Section */}
                <div className="bg-gray-800 rounded mb-8 p-10">
                    <div className="flex items-center justify-center">
                        <img src="https://via.placeholder.com/600x300" alt="Drama Video" className="rounded shadow-lg" />
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-gray-800 p-4 rounded mb-8">
                    <h2 className="text-2xl text-white font-bold mb-4">People think about this drama</h2>
                    <div className="flex justify-between items-center mb-4">
                    <p className="text-white">(4) Comments</p>

    
    <div className="flex items-center">
        {/* Label for Filter By */}
        <label className="text-white mr-2">Filter by:</label>
        
        {/* Select Dropdown */}
        <select className="bg-gray-700 text-white p-2 rounded">
            <option value="5" className="text-yellow-500">★★★★★</option>
            <option value="4" className="text-yellow-500">★★★★</option>
            <option value="3" className="text-yellow-500">★★★</option>
            <option value="2" className="text-yellow-500">★★</option>
            <option value="1" className="text-yellow-500">★</option>
        </select>
    </div>
</div>


                    {/* Scrollable Comments Section */}
                    <div className="space-y-4 max-h-60 overflow-y-auto">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="border-b border-gray-700 pb-4">
                                <p className="text-sm text-white">Nara (4/24/2016) said:</p>
                                <p className="mb-2 text-white">It is a wonderful drama! I Love it so much!!!</p>
                                <div className="text-yellow-500">★★★★★</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add Your Comment Section */}
                <div className="bg-gray-800 p-4 rounded max-w-md">
                    <h3 className="text-lg text-white font-bold mb-2">Add yours!</h3>
                    <form className="space-y-4">
                        <input type="text" placeholder="Name" className="w-full p-2 bg-gray-700 rounded text-white" />
                        <div className="flex items-center">
                            <span className="mr-2 text-white">Rate:</span>
                            {/* Select Dropdown */}
                                <select className="bg-gray-700 text-white p-2 rounded">
                                    <option value="5" className="text-yellow-500">★★★★★</option>
                                    <option value="4" className="text-yellow-500">★★★★</option>
                                    <option value="3" className="text-yellow-500">★★★</option>
                                    <option value="2" className="text-yellow-500">★★</option>
                                    <option value="1" className="text-yellow-500">★</option>
                                </select>
                        </div>
                        <textarea placeholder="Your thoughts" className="w-full p-2 bg-gray-700 rounded text-white"></textarea>
                        <button type="submit" className="w-full  bg-teal-500 hover:bg-teal-600 p-2 rounded text-white">Submit</button>
                    </form>
                </div>
            </main>
    </div>
    );
}

export default SearchResult;
