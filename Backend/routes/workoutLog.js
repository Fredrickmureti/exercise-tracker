const express = require('express');
const router = express.Router();
const WorkoutLog = require('../models/WorkoutLog');

// Add a new workout log
router.post('/', async (req, res) => {
  try {
    const { userId, date, workoutType, duration, intensity, notes } = req.body;

    // Ensure all required fields are provided
    if (!userId || !date || !workoutType || !duration || !intensity) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newWorkoutLog = new WorkoutLog({ userId, date, workoutType, duration, intensity, notes });
    await newWorkoutLog.save();
    res.status(201).json(newWorkoutLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all workout logs for a user
router.get('/:userId', async (req, res) => {
  try {
    const workoutLogs = await WorkoutLog.find({ userId: req.params.userId });
    if (workoutLogs.length === 0) {
      return res.status(200).json({ message: 'No workout logs found.' });
    }
    res.status(200).json(workoutLogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
