const User = require('../db/models/user.js');
const multer = require('multer');
const cloudinaryApi = require('./cloudinaryApi.js');
const _ = require('underscore');
const path = require('path');

const upload = multer().single('photo');
const requestHandler = {};

const showAccessibleAlbums = function(current_username, albums) {
  return _.filter(albums, function(album) {
    return album.access.includes(current_username);
  });
};

requestHandler.getUser = function (req, res) {
  const current_username = req.session.username; // ken01
  const query_username = req.body.username; // john_doe
  if (current_username === query_username) {
    User.findOne({ username: req.session.username }, { password: 0 }, (error, user) => {
      if (error) {
        // console.error(error)
        res.status(500).send(error);
      } else {

        res.json(user);
      }
    });
  } else {
    User.findOne({ username: query_username }, { password: 0, friends:0, email:0 }, (error, user) => {
      //user john doe
      if (error) {
        // console.error(error)
        res.status(500).send(error);
      } else {
        //john does albums
        // show keno1 only the albums he has acces
        // john doe albums[0].access = [john_dow, ken01]
        user.albums = showAccessibleAlbums(current_username, user.albums);
        res.json(user);
      }
    });
  }

};



requestHandler.getUserAlbums = function (req, res) {
  const current_username = req.session.username;
  const query_username = req.body.username;
  let albums;
  User.findOne({ username: query_username }, { password: 0 }, (error, user) => {
    if (error) {
      // console.error(error)
      res.status(500).send(error);
    } else {
      if (current_username !== query_username ){
        albums = showAccessibleAlbums(user.albums, query_username);
        res.json(albums);
      } else {
        res.json(user.albums);
      }
      //res.json(user.albums);
      //
    }
  });
};

// requestHandler.sendSignup = function (req, res) {
//   res.sendFile()
// };


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
        { username: req.session.username },
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

            res.status(500).json(err);
          }
        } // eslint-disable-line
      );
    });
  });
};

// requestHandler.createNewAlbum = function (req, res) {
//   const album = {
//     name: req.body.albumName,
//     photos: [],
//   };

//   User.findOneAndUpdate(
//     { username: req.params.username },
//     { $push: { albums: album } },
//     { new: true },
//     (error, user) => {
//       if (error) {
//         res.status(500).send(error);
//       } else {
//         res.json(user);
//       }
//     } // eslint-disable-line
//   );
// };




// AUTH stuff

requestHandler.sendSignup = function (req, res) {
  res.sendFile(path.join(__dirname, '../../public/signup.html'));
};

requestHandler.sendLogin = function (req, res) {

  res.sendFile(path.join(__dirname, '../../public/login.html'));
};


function createUser(user, req, res){
  User.create(
    user,
    (error, user) => {// eslint-disable-line
      if (error) {

        res.status(500).redirect('/signup');
      } else {
        req.session.regenerate(function() {

          req.session.username = req.body.username;
          res.redirect('/');
        });
      }
    } // eslint-disable-line
  );
}

requestHandler.handleSignup = function (req, res) {


  upload(req, res, () => {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      profilePic: '',
      albums: [],
    };


    if (req.file && req.file.buffer) {
      cloudinaryApi.uploadPhotoBuffer(req.file.buffer, result => {
        user.profilePic = result.url;
        createUser(user, req, res);
      });
    } else {
      createUser(user, req, res);
    }

  });
};

requestHandler.handleLogin = function (req, res) {
  User.findOne({username: req.body.username}, function(err, user){
    if (user) {
      User.comparePassword(req.body.password, user.password, function(isAuthenticated){
        if (isAuthenticated) {
          req.session.regenerate(function() {

            req.session.username = req.body.username;
            res.redirect('/');
          });
        } else {
          res.redirect('/auth/login');
        }
      });
    } else {
      res.redirect('/auth/signup');
    }
  });

};

requestHandler.handleLogout = function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      res.status(500);
    } else {
      res.redirect('/auth/login');
    }
  });
};

module.exports = requestHandler;
