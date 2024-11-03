import React, { useState, useEffect } from "react";
import axios from "axios";
import Cms from "../components/cms";

const Comments = () => {
  const [filter, setFilter] = useState("");
  const [shows, setShows] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [commentsData, setCommentsData] = useState([]);
  const [visibleComments, setVisibleComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get("http://localhost:3005/comments", {
        params: { searchTerm, shows },
      });
      setCommentsData(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [searchTerm, shows]);

  
  useEffect(() => {
    let filteredComments = commentsData;
  
    console.log("Comments Data:", commentsData);
  
    if (filter) {
      filteredComments = filteredComments.filter(comment => {
        console.log(`Filtering comment: ${comment.id}, rate: ${comment.rate}, filter: ${filter}`);
        return comment.rate === parseInt(filter, 10);
      });
    }
  
    console.log("Filtered Comments:", filteredComments);
    setVisibleComments(filteredComments.slice(0, shows));
  
    // Update checked items
    const newCheckedItems = filteredComments.reduce((acc, _, index) => {
      acc[index] = selectAll;
      return acc;
    }, {});
    setCheckedItems(newCheckedItems);
  }, [filter, commentsData, selectAll, shows]);
  

  const handleApprove = async () => {
    const idsToApprove = visibleComments
      .filter((_, index) => checkedItems[index])
      .map(comment => comment.id);

    try {
      await Promise.all(idsToApprove.map(id => axios.put(`http://localhost:3005/comments/${id}`, { status: true })));
      fetchComments(); // Refresh comments after updating
    } catch (error) {
      console.error("Error approving comments:", error);
    }
  };

  const handleDelete = async () => {
    const idsToDelete = visibleComments
      .filter((_, index) => checkedItems[index])
      .map(comment => comment.id);

    try {
      await axios.delete("http://localhost:3005/comments", { data: { ids: idsToDelete } });
      fetchComments(); // Refresh the comments list
    } catch (error) {
      console.error("Error deleting comments:", error);
    }
  };

  // Function to render stars based on the rating value
  const renderStars = (rate) => {
    return "★".repeat(rate) + "☆".repeat(5 - rate);
  };

  const handleCheckboxChange = (index) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [index]: !prevCheckedItems[index],
    }));
  };

  return (
    <Cms activePage="comments">
      <div className="flex">
        <main className="flex-1 p-4">
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
  <thead className="bg-gray-800 text-white">
    <tr>
      <th className="p-3">
        <input
          type="checkbox"
          className="mr-2"
          checked={selectAll}
          onChange={() => {
            setSelectAll(!selectAll);
            setCheckedItems(visibleComments.reduce((acc, _, index) => {
              acc[index] = !selectAll;
              return acc;
            }, {}));
          }}
        />
        Select All
      </th>
      <th className="p-3 text-white">Username</th>
      <th className="p-3 text-white">Rate</th>
      <th className="p-3 text-white">Drama</th>
      <th className="p-3 text-white">Comments</th>
      <th className="p-3 text-white">Status</th>
    </tr>
  </thead>
  <tbody>
    {visibleComments.map((comment, index) => (
      <tr
        key={comment.id} // Use comment.id for the key
        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
      >
        <td className="p-3 text-gray-800">
          <input
            type="checkbox"
            className="mr-2"
            checked={checkedItems[index] || false}
            onChange={() => handleCheckboxChange(index)}
          />
        </td>
        <td className="p-3 text-gray-800">{comment.username}</td>
        <td className="p-3 text-gray-800">{renderStars(comment.rate)}</td>
        <td className="p-3 text-gray-800">{comment.drama}</td>
        <td className="p-3 text-gray-800">{comment.comment}</td>
        <td className={`p-3 text-${comment.status ? 'green' : 'red'}-500`}>
          {comment.status ? "Approved" : "Unapproved"}
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
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
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
