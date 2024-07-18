require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();


// CORS options
const corsOptions = {
  origin: ['https://exercise-tracker-arena.vercel.app', 'http://localhost:5173'], // Frontend URL here
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Root route to display welcome message
app.get('/', (req, res) => {
  res.send('Welcome to Exercise Tracker Backend API');
});

// Define routes
app.use('/api/users', require('./routes/user'));
app.use('/api/exercises', authenticateToken, require('./routes/exercise'));
app.use('/api/exercises', authenticateToken, require('./routes/deleteUpdate'));
app.use('/api/users', require('./routes/user'));
app.use('/api/calorie-logs', authenticateToken, require('./routes/calorieLog'));
app.use('/api/workout-logs', authenticateToken, require('./routes/workoutLog'));

// Handle 404 errors for non-API routes
app.use((req, res, next) => {
  res.status(404).send('404: Not Found');
});

// server should listen at port 3000 hence the url is http://localhost:3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;