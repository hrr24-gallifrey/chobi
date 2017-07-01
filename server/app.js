const express = require('express');
//const router = require('./routes.js');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const requestHandler = require('./lib/request-handler.js');
const bodyParser = require('body-parser');



const app = express();



function authenticate(req, res, next) {
  if (req.session.username) {

    next();
  } else {
    res.redirect('/auth/login');
  }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(session({
  secret: 'jlskjwoejclsdknviowh290',
  resave: false,
  saveUninitialized: true
}));

app.get('/', authenticate);

app.get('/user/:username', requestHandler.getUser);
//app.get('/user/albums/:username', requestHandler.getUser);
app.post('/user/upload', requestHandler.handleUploadPhoto);


app.get('/auth/signup', requestHandler.sendSignup);

app.post('/auth/signup', requestHandler.handleSignup);

app.get('/auth/login', requestHandler.sendLogin);

app.post('/auth/login', requestHandler.handleLogin);

app.get('/auth/logout', requestHandler.handleLogout);


app.use(express.static(path.join(__dirname, '/../public')));

//app.get('/', authenticate, function());


//app.use('/auth', router.auth);
//app.use('/user', router.user);


module.exports = app;
