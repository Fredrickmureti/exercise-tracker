const express = require('express');
const router = express.Router();
const CalorieLog = require('../models/CalorieLog');

// Add a new calorie log
router.post('/', async (req, res) => {
  try {
    const { userId, date, foodItem, calories } = req.body;
    const newCalorieLog = new CalorieLog({ userId, date, foodItem, calories });
    await newCalorieLog.save();
    res.status(201).json(newCalorieLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all calorie logs for a user
router.get('/:userId', async (req, res) => {
  try {
    const calorieLogs = await CalorieLog.find({ userId: req.params.userId });
    if (calorieLogs.length === 0) {
      return res.status(200).json({ message: 'No calorie logs found.' });
    }
    res.status(200).json(calorieLogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;