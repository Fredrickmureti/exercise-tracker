import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

const Logout = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="logout-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;