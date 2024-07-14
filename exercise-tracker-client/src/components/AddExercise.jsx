import React, { useState } from 'react';
import './AddExercise.css';
import NavigationPane from './NavigationPane';

const AddExercise = ({ userId }) => {
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = new Date(`${date}T${time}`).toISOString();

    const response = await fetch('https://backend-exercise-tracker-seven.vercel.app/exercises', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        userId, description, duration, date: formattedDate
      })
    });

    if (response.ok) {
      const exerciseData = await response.json();

      setDescription('');
      setDuration(0);
      setDate('');
      setTime('');
      console.log(exerciseData);
    } else {
      const errorData = await response.json();
      console.error('Error:', errorData);
    }
  };

  return (
    <div className="add-exercise">
      <h2>Add Exercise</h2>
      <NavigationPane />
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Duration (mins):
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <label>
          Time:
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Exercise</button>
      </form>
    </div>
  );
};

export default AddExercise;