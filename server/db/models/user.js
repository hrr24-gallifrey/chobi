var mongoose = require('../config.js');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  profilePic: String,
  photos: [],
  albums: [],
  friends: []
});

var User = mongoose.model('User', userSchema);

module.exports = User;
