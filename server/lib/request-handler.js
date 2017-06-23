var User = require('../db/models/user.js');

var requestHandler = {};

requestHandler.get = function(req, res) {
  res.send('response successful');
};

module.exports = requestHandler;
