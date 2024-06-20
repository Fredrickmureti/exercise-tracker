require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//define routes(to be implemented)
app.use('/api/users', require('./routes/user')); // api/users path will be handled by user.js 
app.use('/api/exercises', require('./routes/exercise')); // api/exercises path will be handled by exercise.js
app.use('/api/exercises', require('./routes/deleteUpdate'));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})