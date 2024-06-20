import React, { useState } from "react";

const AddExercise = ({ userId }) => {
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = new Date(date).toISOString();

    const response = await fetch('http://localhost:3000/api/exercises', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId, description, duration, date: formattedDate
      })
    });

    if (response.ok){
      const exerciseData = await response.json();

      setDescription('');
      setDuration(0);
      setDate('');
      console.log(exerciseData);
    } else {
      const errorData = await response.json();
      console.error('Error:', errorData);
    }
  }

  return (
    <div>
      <h2>Add Exercise</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          placeholder="Duration (mins)"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Add Exercise</button>
      </form>
    </div>
  )
}

export default AddExercise;
