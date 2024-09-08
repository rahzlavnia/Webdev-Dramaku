import React from "react";
import DefaultLayout from "../components/base";

export default function Login() {
  return (
    <DefaultLayout>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
          <h2 className="text-white text-3xl text-center font-bold mb-6">Login</h2>
          
          {/* Username Field */}
          <div className="mb-4">
            <input
              className="w-full p-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              type="text"
              id="username"
              name="username"
              placeholder="Username" 
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <input
              className="w-full p-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              type="password"
              id="password"
              name="password"
              placeholder="Password" 
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

          {/* Text and Register Link */}
          <div className="text-center mt-6">
            <p className="text-white text-sm">Don't have an account?</p>
            <a
              href="/register"
              className=" text-white text-sm hover:underline font-bold"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
