var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chobi');

var db = mongoose.connection;

db.on('error', (err) => {
  console.error('connection error: ', err);
});

db.once('open', () => console.log('mongoDB connection open'));

module.exports = mongoose;
