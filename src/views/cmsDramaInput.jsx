import React, { useState } from 'react';
import Cms from '../components/cms';

const DramaInput = () => {
//   const [image, setImage] = useState(null);
  const [setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedActors, setSelectedActors] = useState([]);
  const [newActorName, setNewActorName] = useState('');

  // Load the uploaded image for preview
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
    setImage(file);
  };

  // Cancel image upload
  const cancelImageUpload = () => {
    setPreviewImage(null);
    setImage(null);
  };

  // Add an actor to the selected list
//   const addActor = (actorName, actorImage) => {
//     setSelectedActors([...selectedActors, { name: actorName, image: actorImage }]);
//     setNewActorName('');
//   };

  // Remove an actor from the selected list
  const removeActor = (index) => {
    const updatedActors = [...selectedActors];
    updatedActors.splice(index, 1);
    setSelectedActors(updatedActors);
  };

  return (
    <Cms activePage="genres">
        <div className="flex-1 p-12 ml-64 pt-20">
        {/* Input Form */}
        <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1">
            {/* Image Upload Section */}
            <div className="relative w-full h-64 rounded-xl mb-4 bg-gray-100 flex items-center justify-center">
                {!previewImage ? (
                <label
                    htmlFor="upload-image"
                    className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
                >
                    <span className="text-gray-400">Click to upload movie poster</span>
                    <input
                    type="file"
                    id="upload-image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    />
                </label>
                ) : (
                <img src={previewImage} alt="Preview" className="absolute inset-0 w-full h-full rounded-xl object-cover" />
                )}
                {previewImage && (
                <button
                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded"
                    onClick={cancelImageUpload}
                >
                    Cancel
                </button>
                )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
                <button type="submit" className="p-1 bg-teal-600 w-20 rounded-xl text-white hover:bg-teal-700">
                Submit
                </button>
            </div>
            </div>

            {/* Right Column */}
            <div className="col-span-2 grid grid-cols-2 gap-4">
            {/* Title and Alt Title */}
            <div className="col-span-2 grid grid-cols-2 gap-4">
                <input
                type="text"
                placeholder="Title"
                className="bg-gray-100 p-2 rounded-full w-full text-black"
                />
                <input
                type="text"
                placeholder="Alternative Title"
                className="bg-gray-100 p-2 rounded-full w-full text-black"
                />
            </div>

            {/* Year and Country */}
            <div className="grid grid-cols-3 gap-4">
                <select className="bg-gray-100 p-2 rounded-full w-full text-black">
                <option value="" disabled selected>
                    Year
                </option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                </select>

                <select className="bg-gray-100 p-2 rounded-full w-full text-black col-span-2">
                <option value="" disabled selected>
                    Country
                </option>
                <option value="Indonesia">Indonesia</option>
                <option value="USA">USA</option>
                <option value="Japan">Japan</option>
                </select>
            </div>

            {/* Synopsis */}
            <div className="col-span-2">
                <textarea
                placeholder="Synopsis"
                rows="4"
                className="bg-gray-100 p-2 rounded-xl w-full text-black resize-none"
                />
            </div>

            {/* Availability */}
            <input
                type="text"
                placeholder="Availability"
                className="col-span-2 bg-gray-100 p-2 rounded-full w-full"
            />

            {/* Genres */}
            <div className="col-span-2">
                <div className="grid grid-cols-4 gap-4 p-4 border border-gray-100 rounded-xl">
                {/* Genres with checkboxes */}
                {['Adventure', 'Romance', 'Drama', 'Slice of Life', 'Action', 'Comedy', 'Fantasy', 'Science Fiction'].map(
                    (genre) => (
                    <label key={genre} className="flex items-center space-x-2">
                        <input type="checkbox" className="form-checkbox h-6 w-6" />
                        <span>{genre}</span>
                    </label>
                    )
                )}
                </div>
            </div>

            {/* Add Actors */}
            <div className="col-span-2">
                {/* Search Input */}
                <input
                type="text"
                placeholder="Search Actor Names"
                value={newActorName}
                onChange={(e) => setNewActorName(e.target.value)}
                className="bg-gray-100 p-2 rounded-full w-full mb-1 text-black"
                />

                {/* Selected Actors Section */}
                <div className="mt-1 p-2 grid grid-cols-3 sm:grid-cols-9 gap-4" id="selected-actors">
                {selectedActors.map((actor, index) => (
                    <div key={index} className="flex flex-col items-center relative">
                    <div className="w-20 h-24 bg-gray-200 rounded-lg overflow-hidden">
                        <img src={actor.image} alt={actor.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-gray-300 text-sm text-center">{actor.name}</p>
                    <button
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm"
                        onClick={() => removeActor(index)}
                    >
                        ×
                    </button>
                    </div>
                ))}
                </div>
            </div>

            {/* Trailer and Award */}
            <div className="grid grid-cols-2 gap-4 col-span-2 relative">
                <input
                type="text"
                placeholder="Link Trailer"
                className="bg-gray-100 p-2 rounded-full w-full text-black"
                />
                <select className="bg-gray-100 p-2 rounded-full w-full text-black z-10">
                <option value="" disabled selected>
                    Award
                </option>
                <option value="Award 1">Award 1</option>
                <option value="Award 2">Award 2</option>
                </select>
            </div>
            </div>
        </div>
        </div>
    </Cms>
  );
};

export default DramaInput;
