const mongoose = require('../config.js');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  profilePic: String,
  photos: [],
  albums: [],
  friends: [],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
