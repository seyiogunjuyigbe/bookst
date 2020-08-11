const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinaryConfig = require('../config/cloudinary')
cloudinaryConfig()
const multer = require('multer')
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'art_covers',
  },
});
module.exports = multer({ storage });