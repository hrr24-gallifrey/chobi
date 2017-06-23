var express = require('express');
var router = require('./routes.js');

var app = express();

app.use(express.static(__dirname + '/../public'));
app.use('/user', router);

module.exports = app;
