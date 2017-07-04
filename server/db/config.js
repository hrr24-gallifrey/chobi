const mongoose = require('mongoose');
var config = require('../lib/config-env.js');

const mongooseUri = config.mongooseUri;

mongoose.connect(mongooseUri);

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('connection error: ', err);
});

db.once('open', () => console.log('mongoDB connection open'));

module.exports = mongoose;
