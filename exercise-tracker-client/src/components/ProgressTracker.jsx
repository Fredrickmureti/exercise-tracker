import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import './ProgressTracker.css';

const ProgressTracker = () => {
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
    // Fetch data from local storage or API
    const storedStepsData = JSON.parse(localStorage.getItem('stepsData')) || [];
    const storedDistanceData = JSON.parse(localStorage.getItem('distanceData')) || [];
    const storedCaloriesData = JSON.parse(localStorage.getItem('caloriesData')) || [];
    const storedFoodLog = JSON.parse(localStorage.getItem('foodLog')) || [];
    const storedWorkoutLog = JSON.parse(localStorage.getItem('workoutLog')) || [];

    setStepsData(storedStepsData);
    setDistanceData(storedDistanceData);
    setCaloriesData(storedCaloriesData);
    setFoodLog(storedFoodLog);
    setWorkoutLog(storedWorkoutLog);
  }, []);

  const handleAddFood = () => {
    const newFoodLog = [...foodLog, { date, foodItem, calories }];
    setFoodLog(newFoodLog);
    localStorage.setItem('foodLog', JSON.stringify(newFoodLog));
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
  };

  const handleAddWorkout = () => {
    const newWorkoutLog = [...workoutLog, { date, workoutType, workoutDuration, workoutIntensity, workoutNotes }];
    setWorkoutLog(newWorkoutLog);
    localStorage.setItem('workoutLog', JSON.stringify(newWorkoutLog));
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
  };

  return (
    <div className="progress-tracker">
      <h2>Progress Tracker</h2>
      <div className="graph-container">
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
      <div className="log-container">
        <h3>Calorie Tracker</h3>
        <div className="food-log">
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
        <h3>Workout Logging</h3>
        <div className="workout-log">
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

export default ProgressTracker;