// App.js
import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes'; // Import router configuration

function App() {
  return (
    <RouterProvider router={router} /> // Use RouterProvider to set up routing
  );
}

export default App;


