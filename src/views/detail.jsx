import React from 'react';
import DefaultLayout from '../components/base'; 
import SearchBar from '../components/search';
import myIcon from '../assets/mufasa-poster-1.webp'; 
import FilterComponent from '../components/filter';

const DetailPage = () => {
    return (
        <DefaultLayout>
            <SearchBar />  <FilterComponent/>
            <div className="main-content p-8 text-white">
                {/* Title and Description */}
                <div className="flex flex-col md:flex-row md:justify-between ">
                    {/* Image Section (With margin for spacing) */}
                    <div className="flex-1 flex justify-center md:justify-start mb-4 md:mb-0">
                        <img src={myIcon} alt="Drama Icon" className="w-64 h-80 md:mr-16" /> {/* Added margin-right */}
                    </div>

                    {/* Title and Description */}
                    <div className="flex-3">
                        <h1 className="text-4xl font-bold">Title</h1>
                        <p className="text-sm text-gray-400">
                            Other titles: Title 2, Title 3, Title 4 <br />
                            Year: Spring 2016
                        </p>
                        <p className="mt-4">
                            When an unprecedented heinous criminal is released from prison, a public bounty with a payout of 20 billion won is offered for his murder.
                        </p>
                        <p>Action, Thriller, Horror</p>
                        <p className="mt-2">Rating: 3.5/5</p>
                        <p className="mt-1">Availability: Fansub @subsub on X</p>
                    </div>
                </div>

                {/* Stars Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold">Stars</h2>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        {['Song Joong Ki', 'Kim Ji Won', 'Son Hye Kyo', 'Jin Goo', 'Actor 1', 'Actor 2'].map((actor, index) => (
                            <div key={index} className="text-center">
                                <div className="w-20 h-20 bg-gray-700"></div>
                                <p className="mt-2">{actor}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Video Placeholder */}
                <div className="mt-8 flex justify-center ">
                    <div className="w-full max-w-3xl h-64 bg-gray-700 flex items-center justify-center ronded">
                        <div className="text-2xl">Video Player Placeholder</div>
                    </div>
                </div>

                {/* User Reviews */}
                <div className="mt-8 " >
                    <h2 className="text-2xl font-bold">People think about this drama</h2>
                    <div className="flex justify-between items-center mt-2">
                        <span>Filtered by:</span>
                        <select className="bg-gray-800 p-2 rounded text-white">
                            <option value="5">★★★★★</option>
                            <option value="4">★★★★☆</option>
                            <option value="3">★★★☆☆</option>
                            <option value="2">★★☆☆☆</option>
                            <option value="1">★☆☆☆☆</option>
                        </select>
                    </div>

                    {/* Scrollable Comments Section */}
                    <div className="mt-4 h-48 overflow-y-auto bg-gray-800 p-4 rounded">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="flex items-start mb-4">
                                <div className="w-12 h-12 bg-gray-700 rounded-full mr-4"></div>
                                <div>
                                    <p><strong>Nara</strong> (04/04/2016) said: "It is a wonderful drama! Love it so much! I need long comments to see how it is being seen in the display."</p>
                                    <p className="mt-2">★★★★★</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Review Submission Form */}
                <div className="mt-8 flex">
                    <h2 className="text-2xl font-bold">Add yours!</h2>
                    <form className="mt-4">
                        <div className="flex flex-col mb-4">
                            <label className="mb-2" htmlFor="name">Name</label>
                            <input className="p-2 bg-gray-800 rounded" type="text" id="name" name="name" required />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label className="mb-2" htmlFor="rating">Rating</label>
                            <select className="p-2 bg-gray-800 rounded" id="rating" name="rating">
                                <option value="5">★★★★★</option>
                                <option value="4">★★★★☆</option>
                                <option value="3">★★★☆☆</option>
                                <option value="2">★★☆☆☆</option>
                                <option value="1">★☆☆☆☆</option>
                            </select>
                        </div>
                        <div className="flex flex-col mb-4">
                            <label className="mb-2" htmlFor="thoughts">Your thoughts</label>
                            <textarea className="p-2 bg-gray-800 rounded" id="thoughts" name="thoughts" rows="4" required></textarea>
                        </div>
                        <button className="bg-blue-600 p-2 rounded">Submit</button>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default DetailPage;
