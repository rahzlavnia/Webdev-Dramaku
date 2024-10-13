import React, { useState } from "react";
import logo from '../assets/logo.png';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3005/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }), // Hanya kirim username, email, dan password
    });

    const data = await response.json();

    if (response.ok) {
      alert("Registration successful! Your role is: " + data.role);
    } else {
      alert(data.message); // Tampilkan pesan kesalahan
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center space-y-4">
          {/* Logo */}
          <img src={logo} className="w-40 h-10" alt="Logo" />
          <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
            <h2 className="text-white text-3xl text-center font-bold mb-6">Register</h2>
            
            <form onSubmit={handleRegister}>
              {/* Username Field */}
              <div className="mb-4">
                <input
                  className="w-full p-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <input
                  className="w-full p-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

                          
                              {/* Sign-in Buttons */}
                <div className="flex flex-col space-y-4">
                  <button 
                    type="submit" 
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    Register
                  </button>

                  {/* Perbaiki navigasi untuk Sign in */}
                  <a 
                    href="/login" 
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white p-2 rounded text-center focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    Sign in
                  </a>
                </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
