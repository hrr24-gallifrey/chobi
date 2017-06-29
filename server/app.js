const express = require('express');
const router = require('./routes.js');
const cors = require('express-cors');
const path = require('path');

const app = express();

app.use(cors({
  allowedOrigins: ['*'],
}));

app.use(express.static(path.join(__dirname, '/../public')));
app.use('/user', router);

module.exports = app;
