var User = require('../db/models/user.js');
var multer = require('multer');
var cloudinaryApi = require('./cloudinaryApi.js');

var upload = multer().single('photo');
var requestHandler = {};

requestHandler.getUser = function (req, res) {
  User.findOne({ _id: req.params.id }, function(error, user) {
    if(error) {
      //console.error(error)
      res.status(500).send(error);
    } else {
      res.json(user);
    }
  });
};

requestHandler.getAlbums = function (req, res) {
  User.findOne({ _id: req.params.id }, function(error, user) {
    if(error) {
      //console.error(error)
      res.status(500).send(error);
    } else {
      res.json(user.albums);
    }
  });
};

requestHandler.getPics = function (req, res) {
  User.findOne({ _id: req.params.id }, function(error, user) {
    if(error) {
      //console.error(error)
      res.status(500).send(error);
    } else {
      res.json(user.photos);
    }
  });
};

requestHandler.createNewAlbumOnePhoto = function(req, res) {
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      //console.error(err);
      res.status(500).send(err);
      return;
    }

    cloudinaryApi.uploadPhotoBuffer(req.file.buffer, function(result) {

      //console.log(result);
      var photo = {
        description: req.body.description,
        url: result.url
      };

      var album = {
        name: req.body.albumName,
        photos: [
          photo
        ]
      };

      User.findOneAndUpdate(
        {_id: req.params.id},
        { $push: {photos: photo}},
        { $push: { albums: album } },
        { new: true },
        function(error, user) {
          if(error) {
            res.status(500).send(error);
          } else {
            res.json(user);
          }
        }
      );

    });
  });
};

requestHandler.createNewAlbum = function(req, res) {
  var album = {
    name: req.body.albumName,
    photos: []
  };

  User.findOneAndUpdate(
    {_id: req.params.id},
    { $push: { albums: album } },
    { new: true },
    function(error, user) {
      if(error) {
        res.status(500).send(error);
      } else {
        res.json(user);
      }
    }
  );
};

requestHandler.createUser = function(req, res) {


  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      //console.error(err);
      res.status(500).send(err);
      return;
    }

    cloudinaryApi.uploadPhotoBuffer(req.file.buffer, function(result) {

      var user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        profilePic: result.url
      };

      User.create(
        user,
        function(error, user) {
          if(error) {
            res.status(500).send(error);
          } else {
            res.json(user);
          }
        }
      );

    });
  });
  // User.create
};

module.exports = requestHandler;
