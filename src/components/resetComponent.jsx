import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const resetToken = urlParams.get("token");
    const emailParam = urlParams.get("email");
  
    if (resetToken && emailParam) {
      setToken(resetToken);
    } else {
      setError("Invalid or missing token or email.");
    }
  }, []);
  
  
  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3005/api/reset-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword, token }), // Gunakan newPassword sesuai dengan backend
      });

      if (response.ok) {
        setMessage("Your password has been reset successfully.");
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };


  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center space-y-4">
          <img src={logo} className="w-40 h-10" alt="Logo" />
          <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
            <h2 className="text-white text-3xl text-center font-bold mb-6">Reset Password</h2>

            {error && <p className="text-red-500 text-center">{error}</p>}
            {message && <p className="text-green-500 text-center">{message}</p>}

            <form onSubmit={handleReset}>
              <div className="mb-4">
                <input
                  className="w-full p-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  type="password"
                  id="new-password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  className="w-full p-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
