// src/components/Navbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove the token from local storage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/products" className="text-white text-lg font-bold">Products</Link>
          <Link to="/cart" className="text-white text-lg font-bold">Cart</Link>
        </div>
        <button
          onClick={handleLogout}
          className="text-white text-lg font-bold"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
