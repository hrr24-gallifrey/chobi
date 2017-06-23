var router = require('express').Router();
var requestHandler = require('./lib/request-handler.js');

router.get('/', requestHandler.get);

module.exports = router;
