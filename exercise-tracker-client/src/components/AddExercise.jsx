import React, { useState } from 'react';
import './AddExercise.css';
import NavigationPane from './NavigationPane';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToggleComponent from './ToggleComponent';

const apiUrl = 'https://backend-gules-seven-67.vercel.app/api';
// const apiUrl = 'http://localhost:3000/api';

const AddExercise = ({ userId }) => {
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = new Date(`${date}T${time}`).toISOString();

    try {
      const response = await fetch(`${apiUrl}/exercises`, {
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

        toast.success('Exercise added successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        console.log(exerciseData);
      } else {
        const errorText = await response.text();
        console.error('Error:', errorText);
        toast.error('Failed to add exercise. Please try again.', {
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
      toast.error('An unexpected error occurred. Please try again.', {
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
    <div className="add-exercise">
      <h2>Add Exercise</h2>

      <ToggleComponent  ComponentToToggle={NavigationPane} iconSrc={"images/ToggleButton.png"}/>
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