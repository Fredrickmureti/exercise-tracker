const express = require('express');
const router = express.Router();
const User = require('../models/User');


//create a new User
router.post('/', async (req, res) => {
  try {
    const { username } = req.body;
    //check if the user already exist in the database
    let userPerson = await User.findOne({ username });
    if (userPerson) {
      //if user exists, return the user
      return res.json(userPerson);
    } else {
      //if user does not exist, create a new user
      const newUser = new User({ username });
      await newUser.save();
      return res.json(newUser);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//router to get all Users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}); // returns all Users
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router