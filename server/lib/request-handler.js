var User = require('../db/models/user.js');

var requestHandler = {};

requestHandler.getUser = function(req, res) {
  User.findOne({_id: req.params.id}, function(error, user) {
    if(error) {
      console.error(error);
    } else {
      res.json(user);
    }
  });
};

requestHandler.createNewAlbumOnePhoto = function(req, res) {
  var album = {
    "name": req.params.albumName,
    "photos": [
      {
        "url": req.params.photoUrl
      }
    ]
  };

  User.findOneAndUpdate(
    {_id: req.params.id},
    { $push: { "albums": album } },
    { new: true },
    function(error, user) {
      if(error) {
        console.error(error);
      } else {
        res.json(user);
      }
    }
  );
};

requestHandler.createUser = function(req, res) {
  var user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    profilePic: profilePic
  };
  // User.create
};

module.exports = requestHandler;
