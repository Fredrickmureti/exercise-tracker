const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Exercise = require('../models/Exercise');
const authenticateToken = require('../middleware/auth');

// Add a new exercise
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { userId, description, duration, date, completed } = req.body;

    if (!userId || !description || !duration || !date) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    const newExercise = new Exercise({
      userId,
      description,
      duration,
      date: parsedDate,
      completed
    });

    await newExercise.save();
    res.json(newExercise);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get exercises for a specific user
router.get('/:userId', authenticateToken, async (req, res) => {
  try {
    const exercises = await Exercise.find({ userId: req.params.userId });
    res.json(exercises);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update an exercise
router.put('/:id', authenticateToken, async (req, res) => {
  const { description, duration, date, completed } = req.body;
  try {
    const updatedExercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      { description, duration, date: date ? new Date(date) : new Date(), completed },
      { new: true }
    );
    res.status(200).json(updatedExercise);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an exercise
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Exercise deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;