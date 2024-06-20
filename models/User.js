const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    uniquie: true
  }
});


const User = mongoose.model('User', userSchema);

module.exports = User;