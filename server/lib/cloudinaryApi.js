var cloudinary = require('cloudinary');
var config = require('./config.js');
var cloudinaryApi = {};

cloudinary.config({
  cloud_name: config.cloudinary.NAME,
  api_key: config.cloudinary.API_KEY,
  api_secret: config.cloudinary.API_SECRET
});

cloudinaryApi.uploadPhoto = function(image, callback) {
  cloudinary.uploader.upload(image, callback);
};

cloudinaryApi.uploadPhotoBuffer = function(buffer, callback){
  cloudinary.uploader.upload_stream(callback)
    .end(buffer);
}

module.exports = cloudinaryApi;