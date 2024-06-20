import React, { useState, useEffect } from 'react';

const ExerciseLog = ({ userId }) => {
  const [exercises, setExercises] = useState([]);
  const [editingExercise, setEditingExercise] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/exercises/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log("Response status: ", response.status);
        if (!response.ok) {
          throw new Error('Network response was not okay');
        }
        let data = await response.json();
        console.log("Fetched exercises: ", data);

        // Ensure the data is an array
        if (!Array.isArray(data)) {
          data = [data]; // Transform the data into an array
        }

        setExercises(data);
      } catch (err) {
        console.log('Error fetching exercises', err);
      }
    };

    if (userId) {
      fetchExercises();
    }
  }, [userId]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this exercise?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/exercises/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setExercises(exercises.filter(exercise => exercise._id !== id)); //filter out the exercise that was deleted
        } else {
          console.error('Failed to delete exercise');
        }
      } catch (err) {
        console.error('Error deleting exercise:', err);
      }
    }
  };

  //this functions set the editing exercise to the exercise that is being edited
  const handleEdit = (exercise) => {
    setEditingExercise({
      ...exercise,
      date: new Date(exercise.date).toISOString().substr(0, 10) // Ensure date is in YYYY-MM-DD format
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { _id, description, duration, date } = editingExercise;
    const formattedDate = new Date(date).toISOString();

    try {
      const response = await fetch(`http://localhost:3000/api/exercises/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description, duration, date: formattedDate })
      });
      if (response.ok) {
        const updatedExercise = await response.json();
        setExercises(exercises.map(ex => ex._id === _id ? updatedExercise : ex));
        setEditingExercise(null);
      } else {
        console.error('Failed to update exercise');
      }
    } catch (err) {
      console.error('Error updating exercise:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingExercise({ ...editingExercise, [name]: value });
  };

  return (
    <div>
      <h2>Exercise Log</h2>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise._id}>
            {exercise.description} - {exercise.duration} mins on {new Date(exercise.date).toLocaleDateString()}
            <button onClick={() => handleDelete(exercise._id)}>Delete</button>
            <button onClick={() => handleEdit(exercise)}>Modify</button>
          </li>
        ))}
      </ul>

      {editingExercise && (
        <form onSubmit={handleUpdate}>
          <h3>Edit Exercise</h3>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={editingExercise.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Duration (mins):
            <input
              type="number"
              name="duration"
              value={editingExercise.duration}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={editingExercise.date}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Update</button>
          <button type="button" onClick={() => setEditingExercise(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default ExerciseLog;
