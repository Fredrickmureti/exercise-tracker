import React, { useState, useEffect } from 'react';
import './ExerciseLog.css';
import { FaTrash, FaEdit, FaCheck, FaClock, FaCalendarAlt, FaTasks } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import NavigationPane from './NavigationPane';
import { Link } from 'react-router-dom';

const ExerciseLog = ({ userId }) => {
  const [exercises, setExercises] = useState([]);
  const [editingExercise, setEditingExercise] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/exercises/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not okay');
        }
        const data = await response.json();
        setExercises(data);
      } catch (err) {
        console.log('Error fetching exercises', err);
      }
    };

    if (userId) {
      fetchExercises();
    }
  }, [userId]);

  useEffect(() => {
    const checkDueTasks = () => {
      const now = new Date();
      exercises.forEach(exercise => {
        const exerciseDate = new Date(exercise.date);
        if (exerciseDate <= now && !exercise.completed) {
          toast.info(`Task "${exercise.description}" is due!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
    };

    const interval = setInterval(checkDueTasks, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [exercises]);

  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this exercise?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const token = localStorage.getItem('token');
              const response = await fetch(`http://localhost:3000/api/exercises/${id}`, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
              if (response.ok) {
                setExercises(exercises.filter(exercise => exercise._id !== id));
                toast.success('Exercise deleted successfully!', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              } else {
                console.error('Failed to delete exercise');
              }
            } catch (err) {
              console.error('Error deleting exercise:', err);
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  const handleEdit = (exercise) => {
    setEditingExercise({
      ...exercise,
      date: new Date(exercise.date).toISOString().substr(0, 10),
      time: new Date(exercise.date).toISOString().substr(11, 5)
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { _id, description, duration, date, time, completed } = editingExercise;
    const formattedDate = new Date(`${date}T${time}`).toISOString();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/exercises/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ description, duration, date: formattedDate, completed })
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
    const { name, value, type, checked } = e.target;
    setEditingExercise({ ...editingExercise, [name]: type === 'checkbox' ? checked : value });
  };

  const handleCompletionToggle = async (exercise) => {
    const updatedExercise = { ...exercise, completed: !exercise.completed };
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/exercises/${exercise._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedExercise)
      });
      if (response.ok) {
        const updatedExerciseData = await response.json();
        setExercises(exercises.map(ex => ex._id === exercise._id ? updatedExerciseData : ex));
      } else {
        console.error('Failed to update exercise');
      }
    } catch (err) {
      console.error('Error updating exercise:', err);
    }
  };

  return (
    <div className="exercise-log">
      <h2>Exercise Log</h2>
      <NavigationPane />
      {exercises.length === 0 ? (
        <div className="no-logs">
          <p>No exercise logs currently available.</p>
          <Link to="/add-exercise" className="add-exercise-link">Add Exercise</Link>
        </div>
      ) : (
        <ul className="exercise-list">
          {exercises.map((exercise) => (
            <li key={exercise._id} className="exercise-item">
              <div className="exercise-info">
                <span className="exercise-description"><FaTasks /> {exercise.description}</span>
                <span className="exercise-duration"><FaClock /> {exercise.duration} mins</span>
                <span className="exercise-date"><FaCalendarAlt /> {new Date(exercise.date).toLocaleString()}</span>
                <span className={`exercise-status ${exercise.completed ? 'completed' : 'not-completed'}`}>
                  <FaCheck /> {exercise.completed ? "Completed" : "Not Completed"}
                </span>
              </div>
              <div className="exercise-actions">
                <button className="exercise-button complete-button" onClick={() => handleCompletionToggle(exercise)}>
                  <FaCheck /> {exercise.completed ? "Mark Incomplete" : "Mark Complete"}
                </button>
                <button className="exercise-button edit-button" onClick={() => handleEdit(exercise)}>
                  <FaEdit /> Modify
                </button>
                <button className="exercise-button delete-button" onClick={() => handleDelete(exercise._id)}>
                  <FaTrash /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editingExercise && (
        <form className="edit-form" onSubmit={handleUpdate}>
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
          <label>
            Time:
            <input
              type="time"
              name="time"
              value={editingExercise.time}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Completed:
            <input
              type="checkbox"
              name="completed"
              checked={editingExercise.completed}
              onChange={handleChange}
            />
          </label>
          <button className="exercise-button update-button" type="submit">Update</button>
          <button className="exercise-button cancel-button" type="button" onClick={() => setEditingExercise(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default ExerciseLog;