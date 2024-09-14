import React, { useState, useEffect } from 'react';
import Cms from '../components/cms'; // Import the Cms component

const CmsAwards = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    country: '',
    awards: '',
    year: '',
  });
  
  // State to store data fetched from API
  const [awardsData, setAwardsData] = useState([]);

  // Fetch data from the API (dummy URL used for now)
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts') // Replace with your actual API URL
      .then(response => response.json())
      .then(data => {
        // Map the data according to your structure
        const mappedData = data.map((item, index) => ({
          id: index + 1,
          country: 'Japan',
          year: '2024',
          award: `Award ${index + 1}`, // Update with actual data
        }));
        setAwardsData(mappedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Cms activePage="awards">
      <div className="w-full p-0"> {/* Full-width container */}

        {/* Search Form */}
<div className="w-4/5 text-left border-white p-0 mb-4 mx-auto">
  <form className="flex flex-wrap space-x-4">
    <div className="flex flex-col space-y-4">
      {/* Country Input and Year Input side by side */}
      <div className="flex space-x-4">
        <div>
          <label className="text-white font-bold" htmlFor="country">
            Country
          </label>
          <input
            id="country"
            type="text"
            name="country"
            className="rounded-lg ml-4 bg-gray-100 text-black focus:outline-none h-8 w-40" // Adjust height and width
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-white font-bold" htmlFor="year">
            Year
          </label>
          <input
            id="year"
            type="text"
            name="year"
            className="rounded-lg ml-5 bg-gray-100 text-black focus:outline-none h-8 w-40" // Adjust height and width
            value={formData.year}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Awards Input below Country */}
      <div>
        <label className="text-white font-bold" htmlFor="awards">
          Awards
        </label>
        <input
          id="awards"
          type="text"
          name="awards"
          className="rounded-lg ml-5 bg-gray-100 text-black focus:outline-none h-8 w-40" // Adjust height and width
          value={formData.awards}
          onChange={handleChange}
        />
      </div>

      {/* Submit Button below Awards */}
      <div>
        <button type="submit" className="bg-teal-600 w-20 rounded-xl text-white hover:bg-teal-700 h-10">
          Submit
        </button>
      </div>
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

        {/* Awards Table */}
        <div className="overflow-x-auto">
          <div className="max-h-[400px] overflow-y-auto rounded-xl">
            <table className="min-w-full bg-gray-800 rounded-xl">
              <thead className="bg-purple-900">
                <tr>
                  <th className="py-3 px-6 text-left">#</th>
                  <th className="py-3 px-6 text-left">Countries</th>
                  <th className="py-3 px-6 text-left">Years</th>
                  <th className="py-3 px-6 text-left">Awards</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {awardsData
                  .filter((item) =>
                    item.award.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((award, index) => (
                    <tr
                      key={award.id}
                      className={index % 2 === 0 ? 'bg-blue-900 hover:bg-blue-800' : 'bg-gray-700 hover:bg-gray-600'}
                    >
                      <td className="py-3 px-6">{award.id}</td>
                      <td className="py-3 px-6">{award.country}</td>
                      <td className="py-3 px-6">{award.year}</td>
                      <td className="py-3 px-6">{award.award}</td>
                      <td className="py-3 px-6">
                        <a href="#" className="text-blue-500 hover:underline">
                          Edit
                        </a>{' '}
                        |{' '}
                        <a href="#" className="text-red-500 hover:underline">
                          Delete
                        </a>
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

export default CmsAwards;
