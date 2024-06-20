const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Exercise = require('../models/Exercise');

// Add a new exercise
router.post('/', async (req, res) => {
  try {
    const { userId, description, duration, date } = req.body;

    // Validate required fields
    if (!userId || !description || !duration || !date) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Parse and validate the date
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    // Create and save the new exercise
    const newExercise = new Exercise({
      userId,
      description,
      duration,
      date: parsedDate
    });

    await newExercise.save();
    res.json(newExercise);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get exercises for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const exercises = await Exercise.find({ userId: req.params.userId });
    res.json(exercises);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
