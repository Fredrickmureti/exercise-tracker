import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPlus, FaList, FaClock, FaWalking } from 'react-icons/fa';
import './NavigationPane.css';

const NavigationPane = () => {
  return (
    <div className="navigation-pane">
      <Link to="/dashboard" className="nav-link"><FaHome /> Dashboard</Link>
      <Link to="/add-exercise" className="nav-link"><FaPlus /> Add Exercise</Link>
      <Link to="/exercise-log" className="nav-link"><FaList /> Exercise Log</Link>
      <Link to="/set-alarm" className="nav-link"><FaClock /> Set Alarm</Link>
      <Link to="/step-counter-detail" className="nav-link"><FaWalking /> Step Counter</Link>
    </div>
  );
};

export default NavigationPane;