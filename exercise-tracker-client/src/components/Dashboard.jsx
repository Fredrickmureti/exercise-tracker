import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Stopwatch from './Stopwatch';
import Clock from './Clock';
import Weather from './Weather';
import SetAlarm from './SetAlarm';
import NavigationPane from './NavigationPane';
import StepCounter from './StepCounter';

const Dashboard = ({ user, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h1 className="welcome-message">Welcome, {user.firstName }!</h1>
      <NavigationPane />
      <div className="dashboard-buttons">
        <button className="dashboard-button" onClick={() => navigate('/add-exercise')}>Add Exercise</button>
        <button className="dashboard-button" onClick={() => navigate('/exercise-log')}>View Exercises</button>
        <button className="dashboard-button" onClick={() => navigate('/progress-tracker')}>Progress Tracker</button>
        <button className="dashboard-button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="time-weather-section">
        <Clock />
        <Stopwatch />
        <div>
          <Weather />
        </div>

          <SetAlarm />


          <StepCounter/>

      </div>
    </div>
  );
};

export default Dashboard;