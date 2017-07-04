const mongoose = require('mongoose');
var config = require('../lib/config-env.js'); // Create this file

// Set up your config-env.js file based on README instructions to make functional
const mongooseUri = config.mongooseUri;

mongoose.connect(mongooseUri);

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('connection error: ', err);
});

db.once('open', () => console.log('mongoDB connection open'));

module.exports = mongoose;
