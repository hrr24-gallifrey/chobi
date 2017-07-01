const Router = require('express').Router;
const requestHandler = require('./lib/request-handler.js');

const router = {};
router.user = Router();
router.auth = Router();



// auth routes
router.auth.get('/signup', requestHandler.sendSignup);

router.auth.post('/signup', requestHandler.handleSignup);

router.auth.get('/login', requestHandler.sendLogin);

router.auth.post('/login', requestHandler.handleLogin);

// user routes (after logging in)
// router.user.get('/:username', requestHandler.getUser);

// router.user.get('/:username/albums', requestHandler.getAlbums);

// router.user.get('/:username/pics', requestHandler.getPics);

// router.user.post('/:username/upload', requestHandler.handleUploadPhoto);

// router.user.post('/:username/album/', requestHandler.createNewAlbum);

// router.user.post('/create', requestHandler.createUser);

module.exports = router;
