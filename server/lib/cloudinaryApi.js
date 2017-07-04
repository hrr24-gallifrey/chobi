const cloudinary = require('cloudinary');
const config = require('./config-env.js'); // Create this file

const cloudinaryApi = {};

// Set up your config-env.js file based on README instructions to make functional
cloudinary.config({
  cloud_name: config.cloudinary.NAME,
  api_key: config.cloudinary.API_KEY,
  api_secret: config.cloudinary.API_SECRET,
});

// For uploading photos from filepaths (see Cloudinary docs)
cloudinaryApi.uploadPhoto = function (image, callback) {
  cloudinary.uploader.upload(image, callback);
};

// For handling photos uploaded on a form (see Cloudinary docs)
cloudinaryApi.uploadPhotoBuffer = function (buffer, callback) {
  cloudinary.uploader.upload_stream(callback)
    .end(buffer);
};

module.exports = cloudinaryApi;
