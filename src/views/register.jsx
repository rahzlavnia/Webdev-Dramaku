import React from "react";

export default function Register() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
        <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
          <h2 className="text-white text-3xl text-center font-bold mb-6">Register</h2>
          
          {/* Username Field */}
          <div className="mb-4">
            <input
              className="w-full p-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              type="text"
              id="username"
              name="username"
              placeholder="Username" // This will show the label inside the input
            />
          </div>

          <div className="mb-4">
            <input
              className="w-full p-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              type="text"
              id="username"
              name="username"
              placeholder="Email" // This will show the label inside the input
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <input
              className="w-full p-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              type="password"
              id="password"
              name="password"
              placeholder="Password" // This will show the label inside the input
            />
          </div>

          {/* Sign-in Buttons */}
          <div className="flex flex-col space-y-4">
            <button className="w-full bg-teal-500 hover:bg-teal-600 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
              Sign in
            </button>
            <button className="w-full bg-teal-500 hover:bg-teal-600 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
