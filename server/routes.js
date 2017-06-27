var router = require('express').Router();
var requestHandler = require('./lib/request-handler.js');

router.get('/:id', requestHandler.getUser);

router.post('/:id/:albumName/:photoUrl', requestHandler.createNewAlbumOnePhoto);

router.post('/create', requestHandler.createUser);

module.exports = router;
