require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();

// CORS options
const corsOptions = {
  origin: 'https://exercise-tracker-arena.vercel.app', // Frontend URL
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

// Handle 404 errors for non-API routes
app.use((req, res, next) => {
  res.status(404).send('404: Not Found');
});

module.exports = app;