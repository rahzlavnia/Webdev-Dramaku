import React, { useState, useEffect } from 'react'; 
import Cms from '../components/cms';

const CmsAwards = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    country_id: '',
    name: '',
    year: '',
  });
  const [awardsData, setAwardsData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [editId, setEditId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'year', order: 'asc' });

  // Sort the awardsData by specified key
  const handleSort = (key) => {
    const sortedAwards = [...awardsData];
    let order = 'asc';
  
    // Toggle the sort order if sorting the same key again
    if (sortConfig.key === key && sortConfig.order === 'asc') {
      order = 'desc';
    } 
  
    sortedAwards.sort((a, b) => {
      if (key === 'year') {
        return order === 'asc' ? a.year - b.year : b.year - a.year;
      } else if (key === 'country') {
        return order === 'asc' ? a.country.localeCompare(b.country) : b.country.localeCompare(a.country);
      } else if (key === 'award') {
        const awardA = a.award || ''; // Default to empty string if null
        const awardB = b.award || ''; // Default to empty string if null
        return order === 'asc' ? awardA.localeCompare(awardB) : awardB.localeCompare(awardA);
      }
      return 0;
    });
  
    setAwardsData(sortedAwards); // Update the state with the sorted data
    setSortConfig({ key, order }); // Set the sort configuration
  };
  
  
  useEffect(() => {
    fetchCountries();
    fetchAwards();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('http://localhost:3005/countries');
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchAwards = async () => {
    try {
      const response = await fetch('http://localhost:3005/awards');
      const data = await response.json();
      setAwardsData(data);
    } catch (error) {
      console.error('Error fetching awards:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = (award) => {
    setEditId(award.id);
    setFormData({
      country_id: award.country_id || '',
      awards: award.award || '', // Menampilkan penghargaan sebelumnya
      year: award.year || '',
    });
  };

  const handleSaveClick = async (id) => {
    if (!formData.country_id) {
      console.error("Country ID is missing or invalid.");
      return;
    }

    try {
      await fetch(`http://localhost:3005/awards/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country_id: formData.country_id,
          award: formData.awards,
          year: formData.year,
        }),
      });
      setEditId(null);
      fetchAwards(); // Refresh data in the table
    } catch (error) {
      console.error('Error updating award:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error("Invalid ID:", id);
      return;
    }
    try {
      const response = await fetch(`http://localhost:3005/awards/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchAwards(); // Refresh data after delete
      } else {
        console.error("Failed to delete award");
      }
    } catch (error) {
      console.error("Error deleting award:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3005/awards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Award created successfully");
      } else {
        console.error("Error creating award:", await response.text());
      }
    } catch (error) {
      console.error("Server error:", error);
    }
    fetchAwards();
  };

  return (
    <Cms activePage="awards">
      <div className="w-full p-0">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <div>
                <label className="text-white font-bold" htmlFor="country">
                  Country
                </label>
                <select
                  id="country"
                  name="country_id"
                  className="rounded-lg ml-4 bg-gray-100 text-black focus:outline-none h-8 w-40"
                  value={formData.country_id}
                  onChange={handleChange}
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-white font-bold" htmlFor="awards">
                  Awards
                </label>
                <input
                  id="awards"
                  type="text"
                  name="awards"
                  className="rounded-lg ml-5 bg-gray-100 text-black focus:outline-none h-8 w-40"
                  value={formData.awards}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label className="text-white font-bold" htmlFor="year">
                Year
              </label>
              <input
                id="year"
                type="text"
                name="year"
                className="rounded-lg ml-5 bg-gray-100 text-black focus:outline-none h-8 w-40"
                value={formData.year}
                onChange={handleChange}
              />
            </div>
            <div>
              <button type="submit" className="bg-teal-600 w-20 rounded-xl text-white hover:bg-teal-700 h-8">
                Submit
              </button>
            </div>
          </div>
        </form>

        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search in Table"
            className="bg-gray-700 p-2 rounded w-1/4"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="overflow-x-auto">
          <div className="max-h-[400px] overflow-y-auto rounded-xl">
          <table className="min-w-full bg-gray-800 rounded-xl">
  <thead className="bg-gray-800 text-white">
  <tr>
          <th className="py-3 px-6 text-left">ID</th>
          <th className="py-3 px-6 text-left">
            Countries
            <button onClick={() => handleSort('country')} className="ml-2 text-xs">
              {sortConfig.key === 'country' ? (sortConfig.order === 'asc' ? '▲' : '▼') : '▲▼'}
            </button>
          </th>
          <th className="py-3 px-6 text-left">
            Years
            <button onClick={() => handleSort('year')} className="ml-2 text-xs">
              {sortConfig.key === 'year' ? (sortConfig.order === 'asc' ? '▲' : '▼') : '▲▼'}
            </button>
          </th>
          <th className="py-3 px-6 text-left">
            Awards
            <button onClick={() => handleSort('award')} className="ml-2 text-xs">
              {sortConfig.key === 'award' ? (sortConfig.order === 'asc' ? '▲' : '▼') : '▲▼'}
            </button>
          </th>
          <th className="py-3 px-6 text-left">Actions</th>
        </tr>
  </thead>
  <tbody>
    {awardsData
      .filter((item) =>
        item.award ? item.award.toLowerCase().includes(searchTerm.toLowerCase()) : false
      )
      .map((award, index) => (
        <tr
          key={award.id}
          className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
        >
          <td className="py-3 px-6 border-b border-gray-300 text-gray-800">{index + 1}</td>
          <td className="py-3 px-6 border-b border-gray-300 text-gray-800">
            {editId === award.id ? (
              <select
                name="country_id"
                value={formData.country_id}
                onChange={handleChange}
                className="p-1 rounded-md bg-gray-300 text-black focus:outline-none"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            ) : (
              award.country
            )}
          </td>
          <td className="py-3 px-6 border-b border-gray-300 text-gray-800">
            {editId === award.id ? (
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="p-1 rounded-md bg-gray-300 text-black focus:outline-none"
              />
            ) : (
              award.year
            )}
          </td>
          <td className="py-3 px-6 border-b border-gray-300 text-gray-800">
            {editId === award.id ? (
              <input
                type="text"
                name="awards"
                value={formData.awards}
                onChange={handleChange}
                className="p-1 rounded-md bg-gray-300 text-black focus:outline-none"
              />
            ) : (
              award.award
            )}
          </td>
          <td className="py-3 px-6 border-b border-gray-300 text-gray-800 text-center">
              <div className="flex justify-center space-x-2">
                {editId === award.id ? (
                  <button
                    onClick={() => handleSaveClick(award.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                      onClick={() => handleEditClick(award)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                      onClick={() => handleDelete(award.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
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
