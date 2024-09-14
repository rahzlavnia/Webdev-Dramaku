import React, { useState, useEffect } from 'react';
import Cms from '../components/cms'; // Assuming you have a Cms component

const Users = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });
  const [usersData, setUsersData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulated initial user data (you can replace this with API call)
  useEffect(() => {
    const initialUsers = [
      { id: 1, username: 'ariel21', email: 'ariel21@gmail.com' },
      { id: 2, username: 'borang', email: 'borang@yahoo.com' },
      { id: 3, username: 'example', email: 'example@example.com' },
      { id: 4, username: 'example', email: 'example@example.com' },
      { id: 5, username: 'example', email: 'example@example.com' },
      { id: 6, username: 'example', email: 'example@example.com' },
      { id: 7, username: 'example', email: 'example@example.com' },
      { id: 8, username: 'example', email: 'example@example.com' },
    ];
    setUsersData(initialUsers);
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission for adding/updating user data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Update existing user
      setUsersData(
        usersData.map((user) =>
          user.id === editingId ? { ...user, ...formData } : user
        )
      );
      setEditingId(null);
    } else {
      // Add new user
      setUsersData([
        ...usersData,
        { ...formData, id: usersData.length + 1 },
      ]);
    }
    // Clear form after submission
    setFormData({ username: '', email: '' });
  };

  // Handle edit click
  const handleEdit = (user) => {
    setFormData({
      username: user.username,
      email: user.email,
    });
    setEditingId(user.id);
  };

  // Handle delete
  const handleDelete = (id) => {
    setUsersData(usersData.filter((user) => user.id !== id));
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Cms activePage="users">
      <div className="flex">
        {/* Main content */}
        <main className="flex-1 p-6">
          {/* Form Section */}
<div className="flex flex-col space-y-4"> 
  {/* Username and Email Input side by side */}
  <div className="flex space-x-4">
    <div>
      <label className="text-white font-bold" htmlFor="username">
        Username
      </label>
      <input
        id="username"
        type="text"
        name="username"
        className="rounded-lg ml-4 bg-gray-100 text-black focus:outline-none h-8 w-40" // Adjust height and width
        value={formData.username}
        onChange={handleChange}
        required
      />
    </div>

    <div>
      <label className="text-white font-bold" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        name="email"
        className="rounded-lg ml-5 bg-gray-100 text-black focus:outline-none h-8 w-40" // Adjust height and width
        value={formData.email}
        onChange={handleChange}
        required
      />
    </div>
  </div>

  {/* Submit Button below inputs */}
  <div>
    <button
      type="submit"
      className="bg-teal-600 w-20 rounded-xl text-white hover:bg-teal-700 h-8"
    >
      {editingId ? 'Update' : 'Submit'}
    </button>
  </div>
</div>


          {/* Search Box */}
          <div className="flex justify-end mb-4">
            <input
              type="text"
              placeholder="Search Users"
              className="bg-gray-700 p-2 rounded w-1/4"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <div className="max-h-[400px] overflow-y-auto bg-gray-800 rounded-xl shadow-lg">
              <table className="min-w-full bg-gray-800 rounded-xl">
                <thead className="bg-purple-900">
                  <tr>
                    <th className="py-3 px-6 text-left text-white">#</th>
                    <th className="py-3 px-6 text-left text-white">Username</th>
                    <th className="py-3 px-6 text-left text-white">Email</th>
                    <th className="py-3 px-6 text-left text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {usersData
                    .filter((user) =>
                      user.username.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((user, index) => (
                      <tr
                        key={user.id}
                        className={index % 2 === 0 ? 'bg-blue-900 hover:bg-blue-800' : 'bg-gray-700 hover:bg-gray-600'}
                      >
                        <td className="py-3 px-6">{user.id}</td>
                        <td className="py-3 px-6">{user.username}</td>
                        <td className="py-3 px-6">{user.email}</td>
                        <td className="py-3 px-6">
                          <a href="#" className="text-blue-500 hover:underline">
                            Send first email
                          </a>{' '}
                          |{' '}
                          <a
                            href="#"
                            onClick={() => handleEdit(user)}
                            className="text-yellow-500 hover:underline"
                          >
                            Edit
                          </a>{' '}
                          |{' '}
                          <a
                            href="#"
                            onClick={() => handleDelete(user.id)}
                            className="text-red-500 hover:underline"
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </Cms>
  );
};

export default Users;
