import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
// import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
// var React = require('react');
// var ReactDOM = require('react-dom');
// var App = require('./components/app.jsx');

var test = () => console.log('test');

test();

ReactDOM.render(<App />, document.getElementById('app'));
