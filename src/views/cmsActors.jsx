// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Make sure to install axios if you haven't already
// import Cms from '../components/cms';

// const CmsActors = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [formData, setFormData] = useState({
//     country: '',
//     actorName: '',
//     birthDate: '',
//     photo: null, // Store the photo file as a blob
//   });
//   const [actorsData, setActorsData] = useState([]);
//   const [countries, setCountries] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [previewImage, setPreviewImage] = useState(''); // State for image preview

//   useEffect(() => {
//     fetchCountries();
//     fetchActors();
//   }, []);

//   const fetchCountries = async () => {
//     try {
//       const response = await fetch('http://localhost:3005/countries');
//       const data = await response.json();
//       setCountries(data);
//     } catch (error) {
//       console.error('Error fetching countries:', error);
//     }
//   };

//   const fetchActors = async () => {
//     try {
//       const response = await fetch("http://localhost:3005/actors");
//       if (!response.ok) {
//         throw new Error("Failed to fetch actors");
//       }
//       const data = await response.json();
//       setActorsData(data); // Assuming you have a state variable to store actors
//     } catch (error) {
//       console.error("Error fetching actors:", error);
//     }
//   };
  

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Use functional state update to ensure you have the latest formData
//       setFormData(prevFormData => ({
//         ...prevFormData,
//         photo: file, // Store the file as a Blob
//       }));
//       setPreviewImage(URL.createObjectURL(file)); // Set the preview image
//     }
//   };
  

//   const handleEditClick = (actor) => {
//     setEditId(actor.id);
//     setFormData({
//       country: actor.country_id || '',
//       actorName: actor.actor_name || '',
//       birthDate: actor.birth_date || '',
//       photo: null, // Set photo to null for editing
//     });
//     setPreviewImage(actor.photo); // Set preview for edit
//   };

//   const handleSaveClick = async (id) => {
//     const actorData = {
//       country: formData.country,
//       actorName: formData.actorName,
//       birthDate: formData.birthDate,
//       photo: previewImage, // Send the updated photo URL
//     };

//     try {
//       await fetch(`http://localhost:3005/actors/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(actorData),
//       });
//       setEditId(null);
//       fetchActors(); // Refresh data in the table
//     } catch (error) {
//       console.error('Error updating actor:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await fetch(`http://localhost:3005/actors/${id}`, {
//         method: "DELETE",
//       });
//       fetchActors(); // Refresh data after delete
//     } catch (error) {
//       console.error("Error deleting actor:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Current formData:', formData);

//     if (!formData.photo) {
//         console.error('Photo is required');
//         alert('Please upload a photo before submitting.');
//         return;
//     }

//     const formDataForActor = new FormData();
//     formDataForActor.append('country_id', formData.country);
//     formDataForActor.append('name', formData.actorName);
//     formDataForActor.append('birth_date', formData.birthDate);
//     formDataForActor.append('photo', formData.photo);

//     try {
//         const response = await fetch("http://localhost:3005/actors", {
//             method: "POST",
//             body: formDataForActor,
//         });

//         if (!response.ok) {
//             const errorResponse = await response.text();
//             throw new Error(`Error: ${errorResponse || response.statusText}`);
//         }

//         // Refresh actors data and reset form
//         setFormData({ country: '', actorName: '', birthDate: '', photo: null });
//         setPreviewImage('');
//         fetchActors();
//     } catch (error) {
//         console.error("Error creating actor:", error);
//     }
// };

// const formatBirthdate = (dateString) => {
//   if (!dateString) return '';
//   const options = { year: 'numeric', month: 'long', day: 'numeric' }; // You can customize this format
//   const date = new Date(dateString);
//   return date.toLocaleDateString(undefined, options); // Use the browser's locale
// };


//   return (
//     <Cms activePage="actors">
//       <div className="w-full p-0">
//         <form onSubmit={handleSubmit}>
//           <div className="flex space-x-4">
//             <div className="flex-1 flex flex-col space-y-4">
//               <div className="flex space-x-4">
//                 <div>
//                   <label className="text-white font-bold" htmlFor="country">Country</label>
//                   <select
//                     id="country"
//                     name="country"
//                     className="rounded-lg ml-9 bg-gray-100 text-black focus:outline-none h-8 w-40"
//                     value={formData.country}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Select Country</option>
//                     {countries.map(country => (
//                       <option key={country.id} value={country.id}>{country.name}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="text-white font-bold" htmlFor="birthDate">Birth Date</label>
//                   <input
//                     id="birthDate"
//                     type="date" 
//                     name="birthDate"
//                     className="rounded-lg ml-4 bg-gray-100 text-black focus:outline-none h-8 w-40"
//                     value={formData.birthDate}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="text-white font-bold" htmlFor="actorName">Actor Name</label>
//                 <input
//                   id="actorName"
//                   type="text"
//                   name="actorName"
//                   className="rounded-lg ml-2 bg-gray-100 text-black focus:outline-none h-8 w-40"
//                   value={formData.actorName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div>
//                 <button type="submit" className="bg-teal-600 w-20 rounded-xl text-white hover:bg-teal-700 h-8">
//                   {editId ? 'Update' : 'Submit'}
//                 </button>
//               </div>
//               {/* Image preview section */}
//               {previewImage && (
//                 <div className="mt-4">
//                   <img src={previewImage} alt="Preview" className="w-20 h-20 rounded"/>
//                 </div>
//               )}
//             </div>
//             <div className="bg-gray-700 rounded w-1/5 h-40 flex flex-col justify-center items-center">
//               <label htmlFor="upload-picture" className="mb-2 text-white">Upload Picture</label>
//               <input type="file" id="upload-picture" name="photo" accept="image/*" onChange={handleFileChange} className="hidden" />
//               <button className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded" onClick={() => document.getElementById('upload-picture').click()}>
//                 Choose File
//               </button>
//             </div>
//           </div>
//         </form>

//         <div className="flex justify-end mb-4 mt-5">
//           <input
//             type="text"
//             placeholder="Search in Table"
//             className="bg-gray-700 p-2 rounded w-1/4"
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//         </div>

//         <div className="overflow-x-auto">
//           <div className="max-h-[400px] overflow-y-auto rounded-xl">
//             <table className="min-w-full bg-gray-800 rounded-xl">
//               <thead className="bg-purple-900">
//                 <tr>
//                   <th className="py-3 px-6">#</th>
//                   <th className="py-3 px-6">Countries</th>
//                   <th className="py-3 px-6">Actor Name</th>
//                   <th className="py-3 px-6">Birth Date</th>
//                   <th className="py-3 px-6">Photo</th>
//                   <th className="py-3 px-6">Actions</th>
//                 </tr>
//               </thead>
//               <tbody> 
//   {actorsData
//     .filter(actor => actor.name && actor.name.toLowerCase().includes(searchTerm.toLowerCase()))
//     .map((actor, index) => (
//       <tr 
//         key={actor.id} // Unique key for each actor
//         className={index % 2 === 0 ? "bg-gray-700 hover:bg-gray-600" : "bg-blue-900 hover:bg-blue-800"} // Alternating row colors
//       >
//         <td className="py-3 px-6 text-center">{index + 1}</td>
//         <td className="py-3 px-6 text-center">{actor.country_name}</td> {/* Display country name */}
//         <td className="py-3 px-6 text-center">{actor.name}</td>
//         <td className="py-3 px-6 text-center">{formatBirthdate(actor.birthdate)}</td> {/* Formatted birthdate */}
//         <td className="py-3 px-6 text-center">
//           <img src={actor.url_photos} alt={actor.name} className="w-20 h-20 rounded" />
//         </td>
//                   <td className="py-3 px-6 text-center">
//             <span 
//               className="text-blue-500 hover:underline cursor-pointer mr-2" 
//               onClick={() => handleEditClick(actor)}
//             >
//               Edit
//             </span>
//             <span 
//               className="text-red-500 hover:underline cursor-pointer" 
//               onClick={() => handleDelete(actor.id)}
//             >
//               Delete
//             </span>
//           </td>

//       </tr>
//     ))}
// </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </Cms>
//   );
// };

// export default CmsActors;
