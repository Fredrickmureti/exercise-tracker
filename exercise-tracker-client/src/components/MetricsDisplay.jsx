import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MetricsDisplay.css';
import withUserId from './WithUserId';

const apiUrl = 'http://localhost:3000/api';

const MetricsDisplay = ({ userId }) => {
  const [foodLog, setFoodLog] = useState([]);
  const [workoutLog, setWorkoutLog] = useState([]);

  useEffect(() => {
    // Fetch data from backend
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [foodLogResponse, workoutLogResponse] = await Promise.all([
          fetch(`${apiUrl}/calorie-logs/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`${apiUrl}/workout-logs/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        if (!foodLogResponse.ok || !workoutLogResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const foodLog = await foodLogResponse.json();
        const workoutLog = await workoutLogResponse.json();

        setFoodLog(Array.isArray(foodLog) ? foodLog : []);
        setWorkoutLog(Array.isArray(workoutLog) ? workoutLog : []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    fetchData();
  }, [userId]);

  const handleDeleteFoodLog = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/calorie-logs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setFoodLog(foodLog.filter(log => log._id !== id));
        toast.success('Food log deleted successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        const errorText = await response.text();
        console.error('Error:', errorText);
        toast.error('Failed to delete food log.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleDeleteWorkoutLog = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/workout-logs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setWorkoutLog(workoutLog.filter(log => log._id !== id));
        toast.success('Workout log deleted successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        const errorText = await response.text();
        console.error('Error:', errorText);
        toast.error('Failed to delete workout log.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="metrics-display">
      <h2 className="metrics-title">Your Metrics</h2>
      <div className="metrics-section">
        <h3 className="metrics-subtitle">Food Log</h3>
        <ul className="metrics-list">
          {foodLog.map(log => (
            <li key={log._id} className="metrics-item">
              <p>{log.date}: {log.foodItem} - {log.calories} calories</p>
              <button onClick={() => handleDeleteFoodLog(log._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="metrics-section">
        <h3 className="metrics-subtitle">Workout Log</h3>
        <ul className="metrics-list">
          {workoutLog.map(log => (
            <li key={log._id} className="metrics-item">
              <p>{log.date}: {log.workoutType} - {log.duration} mins - {log.intensity}</p>
              <button onClick={() => handleDeleteWorkoutLog(log._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default withUserId(MetricsDisplay);