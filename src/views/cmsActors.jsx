import React, { useState, useEffect } from 'react';
import Cms from '../components/cms'; // Import the Cms component

const Actors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    country: '',
    actorName: '',
    birthDate: '',
    photo: null, // Added for photo upload
  });
  const [actorsData, setActorsData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch data from the API (replace with actual API URL)
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts') // Dummy URL
      .then(response => response.json())
      .then(data => {
        const mappedData = data.map((item, index) => ({
          id: index + 1,
          country: 'Japan',
          actorName: `Actor ${index + 1}`,
          birthDate: '19 December 1975',
          photo: null, // Dummy photo data, replace with actual API data if available
        }));
        setActorsData(mappedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Handle form submission for adding/updating actor data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Update existing actor
      setActorsData(
        actorsData.map((actor) =>
          actor.id === editingId ? { ...actor, ...formData } : actor
        )
      );
      setEditingId(null);
    } else {
      // Add new actor
      setActorsData([
        ...actorsData,
        { ...formData, id: actorsData.length + 1 },
      ]);
    }
    // Clear the form after submission
    setFormData({ country: '', actorName: '', birthDate: '', photo: null });
  };

  // Handle edit click
  const handleEdit = (actor) => {
    setFormData({
      country: actor.country,
      actorName: actor.actorName,
      birthDate: actor.birthDate,
      photo: actor.photo,
    });
    setEditingId(actor.id);
  };

  // Handle delete
  const handleDelete = (id) => {
    setActorsData(actorsData.filter((actor) => actor.id !== id));
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Cms activePage="actors">
      <div className="w-full p-0"> {/* Full-width container */}

        {/* Form Section */}
        <div className="w-4/5 text-left p-0 mb-4 mx-auto">
          <form className="flex flex-wrap space-x-4" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              {/* Country and Birth Date Inputs */}
              <div className="flex space-x-4">
                <div>
                  <label className="text-white font-bold" htmlFor="country">
                    Country
                  </label>
                  <input
                    id="country"
                    type="text"
                    name="country"
                    className="rounded-lg ml-9 bg-gray-100 text-black focus:outline-none h-8 w-40"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="text-white font-bold" htmlFor="birthDate">
                    Birth Date
                  </label>
                  <input
                    id="birthDate"
                    type="text"
                    name="birthDate"
                    className="rounded-lg ml-4 bg-gray-100 text-black focus:outline-none h-8 w-40"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Actor Name Input */}
              <div>
                <label className="text-white font-bold" htmlFor="actorName">
                  Actor Name
                </label>
                <input
                  id="actorName"
                  type="text"
                  name="actorName"
                  className="rounded-lg ml-2 bg-gray-100 text-black focus:outline-none h-8 w-40"
                  value={formData.actorName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <div>
                <button type="submit" className="bg-teal-600 w-20 rounded-xl text-white hover:bg-teal-700 h-8">
                  {editingId ? 'Update' : 'Submit'}
                </button>
              </div>
            </div>

            {/* Upload Picture Section */}
            <div className="bg-gray-700 rounded w-1/5 h-40 flex flex-col justify-center items-center">
              <label htmlFor="upload-picture" className="mb-4 text-white">Upload Picture</label>
              <input type="file" id="upload-picture" name="photo" onChange={handleChange} className="hidden" />
              <button className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded" onClick={() => document.getElementById('upload-picture').click()}>
                Choose File
              </button>
            </div>
          </form>
        </div>

        {/* Search Box Above Table */}
        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search in Table"
            className="bg-gray-700 p-2 rounded w-1/4"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Actors Table */}
        <div className="overflow-x-auto">
          <div className="max-h-[400px] overflow-y-auto rounded-xl">
            <table className="min-w-full bg-gray-800 rounded-xl">
              <thead className="bg-purple-900">
                <tr>
                  <th className="py-3 px-6 text-left">#</th>
                  <th className="py-3 px-6 text-left">Country</th>
                  <th className="py-3 px-6 text-left">Actor Name</th>
                  <th className="py-3 px-6 text-left">Birth Date</th>
                  <th className="py-3 px-6 text-left">Photo</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {actorsData
                  .filter((actor) =>
                    actor.actorName.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((actor, index) => (
                    <tr
                      key={actor.id}
                      className={index % 2 === 0 ? 'bg-blue-900 hover:bg-blue-800' : 'bg-gray-700 hover:bg-gray-600'}
                    >
                      <td className="py-3 px-6">{actor.id}</td>
                      <td className="py-3 px-6">{actor.country}</td>
                      <td className="py-3 px-6">{actor.actorName}</td>
                      <td className="py-3 px-6">{actor.birthDate}</td>
                      <td className="py-3 px-6">
                        {actor.photo ? (
                          <img src={URL.createObjectURL(actor.photo)} alt={actor.name} className="w-12 h-12 rounded" />
                        ) : 'No Photo'}
                      </td>
                      <td className="py-3 px-6">
                        <button onClick={() => handleEdit(actor)} className="text-blue-500 hover:underline">Edit</button>{' '}
                        |{' '}
                        <button onClick={() => handleDelete(actor.id)} className="text-red-500 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Cms>
  );
};

export default Actors;
