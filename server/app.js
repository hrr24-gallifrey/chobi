const express = require('express');
const router = require('./routes.js');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, '/../public')));
app.use('/', router.auth);
app.use('/user', router.user);

module.exports = app;
