import React from 'react';
import "../App.css";
import { Link } from 'react-router-dom';

function Navbar() {
  const handleLogout = () => {
    // Implement logout logic here, e.g., clear token, redirect to login page
    localStorage.removeItem('token'); // Assuming token-based authentication
    window.location.href = '/';
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/upload">Upload Document</Link>
        </li>
        <li>
          <Link to="/documents">Document List</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;