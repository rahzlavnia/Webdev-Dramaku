import React, { useState, useEffect } from "react";
import Cms from "../components/cms";

const Comments = () => {
  const [filter, setFilter] = useState("");
  const [shows, setShows] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [commentsData, setCommentsData] = useState([
    { username: "Nara", rate: "⭐⭐⭐⭐⭐", drama: "[2024] Japan - Eye Love You", comments: "I love this drama. It taught me a lot about money and finance...", status: "Unapproved" },
    { username: "Luffy", rate: "⭐⭐", drama: "[2024] Japan - Eye Love You", comments: "Meh", status: "Approved" },
    // Add more rows as needed
  ]);
  const [visibleComments, setVisibleComments] = useState([]);

  // Function to filter comments based on search term
  useEffect(() => {
    const filteredComments = commentsData.filter((comment) =>
      comment.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setVisibleComments(filteredComments.slice(0, shows));
  }, [searchTerm, shows, commentsData]);

  useEffect(() => {
    const newCheckedItems = visibleComments.reduce((acc, comment, index) => {
      acc[index] = selectAll;
      return acc;
    }, {});
    setCheckedItems(newCheckedItems);
  }, [selectAll, visibleComments]);

  const handleCheckboxChange = (index) => {
    setCheckedItems({
      ...checkedItems,
      [index]: !checkedItems[index],
    });
  };

  const handleApprove = () => {
    // Approve selected comments logic
    const approvedComments = visibleComments.filter((_, index) => checkedItems[index]);
    console.log("Approved comments:", approvedComments);
  };

  const handleDelete = () => {
    // Delete selected comments logic
    const remainingComments = visibleComments.filter((_, index) => !checkedItems[index]);
    setCommentsData(remainingComments);
  };

  return (
    <Cms activePage="awards">
      <div className="flex">
        {/* Main content */}
        <main className="flex-1 p-4">
          {/* Filter and Controls */}
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <label htmlFor="filter" className="mr-2">Filtered by:</label>
              <select
                id="filter"
                className="bg-gray-700 text-white p-2 rounded"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">None</option>
                <option value="5" className="text-yellow-500">★★★★★</option>
                <option value="4" className="text-yellow-500">★★★★</option>
                <option value="3" className="text-yellow-500">★★★</option>
                <option value="2" className="text-yellow-500">★★</option>
                <option value="1" className="text-yellow-500">★</option>
              </select>
            </div>

            <div className="flex items-center">
              <label htmlFor="shows" className="mr-2">Shows:</label>
              <select
                id="shows"
                className="bg-gray-700 p-2 rounded text-white"
                value={shows}
                onChange={(e) => setShows(parseInt(e.target.value, 10))}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 p-2 rounded text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Comments Table */}
          <div className="overflow-y-auto rounded-xl">
            <table className="min-w-full bg-gray-800 rounded-xl">
              <thead className="bg-purple-900">
                <tr>
                  <th className="p-3">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectAll}
                      onChange={() => setSelectAll(!selectAll)}
                    />
                    Select All
                  </th>
                  <th className="p-3">Username</th>
                  <th className="p-3">Rate</th>
                  <th className="p-3">Drama</th>
                  <th className="p-3">Comments</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {visibleComments.map((comment, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-700 hover:bg-gray-600" : "bg-blue-900 hover:bg-blue-800"}
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={checkedItems[index] || false}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </td>
                    <td className="p-3">{comment.username}</td>
                    <td className="p-3">{comment.rate}</td>
                    <td className="p-3">{comment.drama}</td>
                    <td className="p-3">{comment.comments}</td>
                    <td className={`p-3 text-${comment.status === 'Approved' ? 'green' : 'red'}-500`}>
                      {comment.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Actions */}
          <div className="mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleApprove}
            >
              Approve
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </main>
      </div>
    </Cms>
  );
};

export default Comments;
