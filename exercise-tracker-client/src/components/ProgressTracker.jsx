import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import './ProgressTracker.css';
import withUserId from './WithUserId';

const apiUrl = 'https://backend-gules-seven-67.vercel.app/api';
//const apiUrl = 'http://localhost:3000/api';

const ProgressTracker = ({ userId }) => {
  const [stepsData, setStepsData] = useState([]);
  const [distanceData, setDistanceData] = useState([]);
  const [caloriesData, setCaloriesData] = useState([]);
  const [foodLog, setFoodLog] = useState([]);
  const [workoutLog, setWorkoutLog] = useState([]);
  const [foodItem, setFoodItem] = useState('');
  const [calories, setCalories] = useState(0);
  const [workoutType, setWorkoutType] = useState('');
  const [workoutDuration, setWorkoutDuration] = useState(0);
  const [workoutIntensity, setWorkoutIntensity] = useState('');
  const [workoutNotes, setWorkoutNotes] = useState('');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [stepsResponse, distanceResponse, caloriesResponse, foodLogResponse, workoutLogResponse] = await Promise.all([
          fetch(`${apiUrl}/exercises/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`${apiUrl}/exercises/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`${apiUrl}/exercises/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`${apiUrl}/calorie-logs/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`${apiUrl}/workout-logs/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        if (!stepsResponse.ok || !distanceResponse.ok || !caloriesResponse.ok || !foodLogResponse.ok || !workoutLogResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const stepsData = await stepsResponse.json();
        const distanceData = await distanceResponse.json();
        const caloriesData = await caloriesResponse.json();
        const foodLog = await foodLogResponse.json();
        const workoutLog = await workoutLogResponse.json();

        setStepsData(Array.isArray(stepsData) ? stepsData : []);
        setDistanceData(Array.isArray(distanceData) ? distanceData : []);
        setCaloriesData(Array.isArray(caloriesData) ? caloriesData : []);
        setFoodLog(Array.isArray(foodLog) ? foodLog : []);
        setWorkoutLog(Array.isArray(workoutLog) ? workoutLog : []);
      } catch (error) {
        console.error('Error fetching data from backend:', error);
        toast.error('Failed to fetch data from backend.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      // Fetch data from local storage
      try {
        const storedStepsData = JSON.parse(localStorage.getItem('stepsData')) || [];
        const storedDistanceData = JSON.parse(localStorage.getItem('distanceData')) || [];
        const storedCaloriesData = JSON.parse(localStorage.getItem('caloriesData')) || [];

        setStepsData(storedStepsData);
        setDistanceData(storedDistanceData);
        setCaloriesData(storedCaloriesData);
      } catch (error) {
        console.error('Error fetching data from local storage:', error);
        toast.error('Failed to fetch data from local storage.', {
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

    // Initial fetch
    fetchData();

    // Continuously check for data updates every 5 seconds
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  const handleAddFood = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/calorie-logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId, date, foodItem, calories })
      });

      if (response.ok) {
        const newFoodLog = await response.json();
        setFoodLog([...foodLog, newFoodLog]);
        toast.success('Food log added successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFoodItem('');
        setCalories(0);
      } else {
        const errorText = await response.text();
        console.error('Error:', errorText);
        toast.error('Failed to add food log.', {
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

  const handleAddWorkout = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/workout-logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          date,
          workoutType,
          duration: workoutDuration,  // Ensure the key matches the model
          intensity: workoutIntensity,  // Ensure the key matches the model
          notes: workoutNotes
        })
      });

      if (response.ok) {
        const newWorkoutLog = await response.json();
        setWorkoutLog([...workoutLog, newWorkoutLog]);
        toast.success('Workout log added successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setWorkoutType('');
        setWorkoutDuration(0);
        setWorkoutIntensity('');
        setWorkoutNotes('');
      } else {
        const errorText = await response.text();
        console.error('Error:', errorText);
        toast.error('Failed to add workout log.', {
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
    <div className="progress-tracker">
      <h2 className="progress-tracker-title">Progress Tracker</h2>
      <div className="progress-tracker-graph-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stepsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="steps" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={distanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="distance" stroke="#82ca9d" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={caloriesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="calories" stroke="#ffc658" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="progress-tracker-log-container">
        <h3 className="progress-tracker-subtitle">Calorie Tracker</h3>
        <div className="progress-tracker-food-log">
          <DatePicker selected={date} onChange={(date) => setDate(date)} />
          <input
            type="text"
            placeholder="Food Item"
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
          />
          <input
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={(e) => setCalories(Number(e.target.value))}
          />
          <button onClick={handleAddFood}>Add Food</button>
        </div>
        <h3 className="progress-tracker-subtitle">Workout Logging</h3>
        <div className="progress-tracker-workout-log">
          <DatePicker selected={date} onChange={(date) => setDate(date)} />
          <input
            type="text"
            placeholder="Workout Type"
            value={workoutType}
            onChange={(e) => setWorkoutType(e.target.value)}
          />
          <input
            type="number"
            placeholder="Duration (mins)"
            value={workoutDuration}
            onChange={(e) => setWorkoutDuration(Number(e.target.value))}
          />
          <input
            type="text"
            placeholder="Intensity"
            value={workoutIntensity}
            onChange={(e) => setWorkoutIntensity(e.target.value)}
          />
          <textarea
            placeholder="Notes"
            value={workoutNotes}
            onChange={(e) => setWorkoutNotes(e.target.value)}
          />
          <button onClick={handleAddWorkout}>Add Workout</button>
        </div>
      </div>
    </div>
  );
};

export default withUserId(ProgressTracker);