import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPlus, FaList, FaClock, FaWalking, FaChartLine, FaMapMarkerAlt } from 'react-icons/fa';
import './NavigationPane.css';

const NavigationPane = () => {
  return (
    <div className="navigation-pane">
      <Link to="/dashboard" className="nav-link"><FaHome /> Dashboard</Link>
      <Link to="/add-exercise" className="nav-link"><FaPlus /> Add Exercise</Link>
      <Link to="/exercise-log" className="nav-link"><FaList /> Exercise Log</Link>
      <Link to="/set-alarm" className="nav-link"><FaClock /> Set Alarm</Link>
      <Link to="/step-counter-detail" className="nav-link"><FaWalking /> Step Counter</Link>
      <Link to="/progress-tracker" className="nav-link"><FaChartLine /> Progress Tracker</Link>
      <Link to="/metrics-display" className="nav-link"><FaChartLine /> Metrics Display</Link>
      <Link to="/map-tracker" className="nav-link"><FaMapMarkerAlt /> Map Tracker</Link>
    </div>
  );
};

export default NavigationPane;