const router = require('express').Router();
const requestHandler = require('./lib/request-handler.js');

router.get('/:id', requestHandler.getUser);

router.get('/:id/albums', requestHandler.getAlbums);

router.get('/:id/pics', requestHandler.getPics);

router.post('/:id/upload', requestHandler.createNewAlbumOnePhoto);

router.post('/:id/album/', requestHandler.createNewAlbum);

router.post('/create', requestHandler.createUser);

module.exports = router;
