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
import {jwtDecode as jwt_decode} from 'jwt-decode';
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
    <div className="container">
      <Routes>
        <Route path="/register" element={<UserRegistration setUser={handleLogin} />} />
        <Route path="/login" element={<Login setUser={handleLogin} />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} handleLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/add-exercise" element={user ? <AddExercise userId={user._id} /> : <Navigate to="/login" />} />
        <Route path="/exercise-log" element={user ? <ExerciseLog userId={user._id} /> : <Navigate to="/login" />} />
        <Route path="/set-alarm" element={user ? <SetAlarm /> : <Navigate to="/login" />} />
        <Route path="/weather-detail" element={user ? <WeatherDetail /> : <Navigate to="/login" />} />
        <Route path="/logout" element={<Logout setUser={handleLogout} />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;