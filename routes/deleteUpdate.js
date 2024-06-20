const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');

// Delete an exercise
router.delete('/:id', async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Exercise deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update an exercise
router.put('/:id', async (req, res) => {
  const { description, duration, date } = req.body;
  try {
    const updatedExercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      { description, duration, date: date ? new Date(date) : new Date() },
      { new: true }
    );
    res.status(200).json(updatedExercise);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
