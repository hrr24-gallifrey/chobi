const User = require('../db/models/user.js');
const multer = require('multer');
const cloudinaryApi = require('./cloudinaryApi.js');
const _ = require('underscore');

const upload = multer().single('photo');
const requestHandler = {};

requestHandler.getUser = function (req, res) {
  User.findOne({ username: req.params.username }, { password: 0 }, (error, user) => {
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

requestHandler.handleUploadPhoto = (req, res) => {
  upload(req, res, err => {
    if (err) {
      // An error occurred when uploading
      res.status(500).send(err);
      return;
    }

    cloudinaryApi.uploadPhotoBuffer(req.file.buffer, result => {
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

      User.findOne(
        { username: req.params.username },
        (error, user) => {
          let allPhotosIndex;
          let foundAlbumIndex;
          if (!error) {
            // find index of All Photos album
            allPhotosIndex = _.findIndex(user.albums, foundAlbum => {
              return foundAlbum.name === 'All Photos';
            });
            // check if 'All Photos' album exists
            if (allPhotosIndex > -1) {
              // add every photo that gets uploaded to the All Photos album
              user.albums[allPhotosIndex].photos.push(photo);
            // else, ('All Photos' album doesn't exist) create it
            } else {
              const allPhotosAlbum = {
                name: 'All Photos',
                photos: [
                  photo,
                ],
              };
              // and add it to user's albums
              user.albums.push(allPhotosAlbum);
            }
            // if the user specified a different album...
            if (req.body.albumName !== 'All Photos') {
              // check if album already exists by finding its index
              foundAlbumIndex = _.findIndex(user.albums, foundAlbum => {
                return foundAlbum.name === req.body.albumName;
              });
              // if album exists...
              if (foundAlbumIndex > -1) {
                // add the uploaded photo to that album
                user.albums[foundAlbumIndex].photos.push(photo);
              // else, add the album to the user's album list
              } else {
                user.albums.push(album);
              }
            }
            // save updated user and send back to client
            user.save((err, savedUser) => { // eslint-disable-line
              res.status(200).json(savedUser);
            });
          } else {
            console.error(err);
            res.status(500).json(err);
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
  upload(req, res, err => {
    if (err) {
      // An error occurred when uploading
      res.status(500).send(err);
      return;
    }

    cloudinaryApi.uploadPhotoBuffer(req.file.buffer, result => {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        profilePic: result.url,
        albums: [],
      };

      User.create(
        user,
        (error, user) => {// eslint-disable-line
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

module.exports = requestHandler;
