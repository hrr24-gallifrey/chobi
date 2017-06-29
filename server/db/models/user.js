const mongoose = require('../config.js');
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');

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
  password: {
    type: String,
    required: true,
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

User.comparePassword = function(candidatePassword, savedPassword, cb) {
  bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch) {
    if (err) { return cb(err); }
    cb(null, isMatch);
  });
};

userSchema.pre('save', function(next) {
  this.profilePic = 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-tech-guy.png';
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});

if (process.env.NODE_ENV !== 'production') {
  User.remove();

  var testUser = {
    firstName: 'John',
    lastName: 'Doe',
    username: 'john_doe',
    password: 'john123',
    email: 'john@doe.com',
  };

  User.create(testUser);
};

module.exports = User;
