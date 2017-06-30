const User = require('../db/models/user.js');
const multer = require('multer');
const cloudinaryApi = require('./cloudinaryApi.js');
const _ = require('underscore');

const upload = multer().single('photo');
const requestHandler = {};

requestHandler.getUser = function (req, res) {
  User.findOne({ username: req.params.username }, {password:0}, (error, user) => {
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
  upload(req, res, (err) => {
    if (err) {
      // An error occurred when uploading
      // console.error(err);
      res.status(500).send(err);
      return;
    }

    cloudinaryApi.uploadPhotoBuffer(req.file.buffer, (result) => {
       //console.log('cloudinaryApi result', result);

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
      let index;

      User.findOne(
        { username: req.params.username },
        (error, user) => {
          let allPhotosIndex;
          let foundAlbumIndex;
          if (!error) {
            console.log('found user', user);

            allPhotosIndex = _.findIndex(user.albums, function(foundAlbum) {
              return foundAlbum.albumName === 'All Photos';
            });

            if (req.body.albumName !== 'All Photos') {
              console.log('===== ablum name ==: ',req.body.albumName);
              foundAlbumIndex = _.findIndex(user.albums, function(album) {
                return album.albumName === req.body.albumName;
              });
              console.log('===== found index', foundAlbumIndex);
            }


            user.albums[allPhotosIndex].photos.push(photo);

            if (foundAlbumIndex > -1) {
              user.albums[foundAlbumIndex].photos.push(photo);
            } else if (foundAlbumIndex != undefined) {
              user.albums.push(album);
            }

            console.log('updating user', user);

            user.save(function(err, savedUser) {
              res.status(200).json(savedUser);
            });

          } else {
            console.error(err);
            res.status(500).json(err);
          }
        }
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
        albums: [{albumName: 'All Photos', photos: []}]
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
