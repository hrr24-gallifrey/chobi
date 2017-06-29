var express = require('express');
var router = require('./routes.js');
var cors = require('express-cors');



var app = express();

app.use(cors({
  allowedOrigins: ['*']
}));

app.use(express.static(__dirname + '/../public'));
app.use('/user', router);

module.exports = app;
