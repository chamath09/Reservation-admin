import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('authToken'); 
      navigate('/'); 
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
    >
      Logout
    </button>
  );
}
