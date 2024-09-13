import React from 'react';
import Cms from '../components/cms'; // Import the Cms component

const Actors = () => {
    return (
        <Cms activePage="actors">
            <div className="w-7/8 p-3 mx-auto mt-0"> {/* Kurangi padding dan tambahkan margin atas */}
                    {/* Form */}
                    <div className="bg-gray-800 p-3 rounded mb-6 flex justify-between items-center space-x-4"> {/* Kurangi padding dan margin */}
                        <div className="w-3/5 space-y-3"> {/* Kurangi jarak antar elemen */}
                            <input type="text" placeholder="Country" className="bg-gray-700 p-2 rounded w-1/3 text-white" />
                            <input type="text" placeholder="Actor Name" className="bg-gray-700 p-2 rounded w-1/3 text-white" />
                            <input type="text" placeholder="Birth Date" className="bg-gray-700 p-2 rounded w-1/3 text-white" />
                            <button type="submit" class="p-1 bg-teal-600 w-20 rounded-xl text-white hover:bg-teal-700">Submit</button>
                        </div>
                        <div className="bg-gray-700 rounded w-1/5 h-40 flex flex-col justify-center items-center">
                            <label htmlFor="upload-picture" className="mb-4 text-white">Upload Picture</label>
                            <input type="file" id="upload-picture" className="hidden" />
                            <button className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded" onClick={() => document.getElementById('upload-picture').click()}>
                                Choose File
                            </button>
                        </div>
                    </div>


                {/* Search Box Above Table */}
                <div className="flex justify-end mb-4">
                    <input type="text" placeholder="Search in Table" className="bg-gray-700 p-2 rounded w-1/4 text-white" />
                </div>

                {/* Actors Table */}
                <div className="max-h-[400px] overflow-y-auto rounded-xl">
                    <table className="min-w-full bg-gray-800 rounded">
                        <thead className="bg-purple-900 text-white">
                            <tr>
                                <th className="py-3 px-6 text-left">#</th>
                                <th className="py-3 px-6 text-left">Countries</th>
                                <th className="py-3 px-6 text-left">Actor Name</th>
                                <th className="py-3 px-6 text-left">Birth Date</th>
                                <th className="py-3 px-6 text-left">Photos</th>
                                <th className="py-3 px-6 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Example row */}
                            <tr className="bg-blue-900 hover:bg-blue-800 text-white">
                                <td className="py-3 px-6">1</td>
                                <td className="py-3 px-6">Japan</td>
                                <td className="py-3 px-6">Takuya Kimura</td>
                                <td className="py-3 px-6">19 December 1975</td>
                                <td className="py-3 px-6">
                                    <img src="your-image-url-1.jpg" alt="Actor Photo" className="w-12 h-12 rounded" />
                                </td>
                                <td className="py-3 px-6">
                                    <a href="#" className="text-blue-500 hover:underline">Edit</a> |
                                    <a href="#" className="text-red-500 hover:underline">Delete</a>
                                </td>
                            </tr>
                            {/* Repeat similar rows for more actors */}
                        </tbody>
                    </table>
                </div>
            </div>
        </Cms>
    );
}

export default Actors;
