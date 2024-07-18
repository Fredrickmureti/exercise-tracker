import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import UserRegistration from './components/UserRegistration';
import AddExercise from './components/AddExercise';
import ExerciseLog from './components/ExerciseLog';
import Login from './components/Login';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';
import SetAlarm from './components/SetAlarm';
import WeatherDetail from './components/WeatherDetail';
import StepCounterDetail from './components/StepCounterDetail';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ProgressTracker from './components/ProgressTracker';
import MetricsDisplay from './components/MetricsDisplay';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import './App.css';

const App = () => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? jwt_decode(token) : null;
  });

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/register' || path === '/login') {
      document.body.className = 'auth-background';
    } else if (path === '/dashboard') {
      document.body.className = 'dashboard-background';
    } else {
      document.body.className = '';
    }
  }, [location]);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setUser(jwt_decode(token));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div className="root-container">
      {location.pathname === '/' && (
        <video
          className="background-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/HOMEPage.mp4" type="video/mp4" />
        </video>
      )}
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<UserRegistration setUser={handleLogin} />} />
          <Route path="/login" element={<Login setUser={handleLogin} />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} handleLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/add-exercise" element={user ? <AddExercise userId={user._id} /> : <Navigate to="/login" />} />
          <Route path="/exercise-log" element={user ? <ExerciseLog userId={user._id} /> : <Navigate to="/login" />} />
          <Route path="/set-alarm" element={user ? <SetAlarm isDetailPage={true} /> : <Navigate to="/login" />} />
          <Route path="/weather-detail" element={user ? <WeatherDetail /> : <Navigate to="/login" />} />
          <Route path="/step-counter-detail" element={user ? <StepCounterDetail /> : <Navigate to="/login" />} />
          <Route path="/progress-tracker" element={user ? <ProgressTracker /> : <Navigate to="/login" />} />
          <Route path="/metrics-display" element={user ? <MetricsDisplay /> : <Navigate to="/login" />} /> {/* Add MetricsDisplay route */}
          <Route path="/logout" element={<Logout setUser={handleLogout} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;