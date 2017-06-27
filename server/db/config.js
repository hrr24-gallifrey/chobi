var mongoose = require('mongoose');

var mongooseUri = 'mongodb://chobi_user:chobi123@ds139262.mlab.com:39262/heroku_rwrj9msr';

mongoose.connect(mongooseUri);

var db = mongoose.connection;

db.on('error', (err) => {
  console.error('connection error: ', err);
});

db.once('open', () => console.log('mongoDB connection open'));

module.exports = mongoose;
