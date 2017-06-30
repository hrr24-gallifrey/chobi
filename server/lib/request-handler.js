const User = require('../db/models/user.js');
const multer = require('multer');
const cloudinaryApi = require('./cloudinaryApi.js');

const upload = multer().single('photo');
const requestHandler = {};

requestHandler.getUser = function (req, res) {
  User.findOne({ username: req.params.username }, (error, user) => {
    if (error) {
      // console.error(error)
      res.status(500).send(error);
    } else {
      res.json(user);
    }
  });
};

// requestHandler.sendSignup = function (req, res) {
//   res.sendFile()
// };

requestHandler.getAlbums = function (req, res) {
  User.findOne({ username: req.params.username }, (error, user) => {
    if (error) {
      // console.error(error)
      res.status(500).send(error);
    } else {
      res.json(user.albums);
    }
  });
};

requestHandler.getPics = function (req, res) {
  User.findOne({ username: req.params.username }, (error, user) => {
    if (error) {
      // console.error(error)
      res.status(500).send(error);
    } else {
      res.json(user.photos);
    }
  });
};

requestHandler.createNewAlbumOnePhoto = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      // An error occurred when uploading
      // console.error(err);
      res.status(500).send(err);
      return;
    }

    cloudinaryApi.uploadPhotoBuffer(req.file.buffer, (result) => {
      // console.log(result);
      const photo = {
        description: req.body.description,
        url: result.url,
      };

      const album = {
        name: req.body.albumName,
        photos: [
          photo,
        ],
      };

      User.findOneAndUpdate(
        { username: req.params.username },
        { $push: { photos: photo, albums: album } },
        { new: true },
        (error, user) => {
          if (error) {
            res.status(500).send(error);
          } else {
            res.json(user);
          }
        } // eslint-disable-line
      );
    });
  });
};

requestHandler.createNewAlbum = function (req, res) {
  const album = {
    name: req.body.albumName,
    photos: [],
  };

  User.findOneAndUpdate(
    { username: req.params.username },
    { $push: { albums: album } },
    { new: true },
    (error, user) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.json(user);
      }
    } // eslint-disable-line
  );
};

requestHandler.createUser = function (req, res) {
  upload(req, res, (err) => {
    if (err) {
      // An error occurred when uploading
      // console.error(err);
      res.status(500).send(err);
      return;
    }

    cloudinaryApi.uploadPhotoBuffer(req.file.buffer, (result) => {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        profilePic: result.url,
      };

      User.create(
        user,
        (error, user) => { // eslint-disable-line
          if (error) {
            res.status(500).send(error);
          } else {
            res.json(user);
          }
        } // eslint-disable-line
      );
    });
  });
  // User.create
};

module.exports = requestHandler;
