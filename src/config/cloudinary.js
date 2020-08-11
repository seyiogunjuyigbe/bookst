const { config } = require('cloudinary').v2;
const { cloud_name, api_key, api_secret } = require('./config')
module.exports = () => config({
    cloud_name,
    api_key,
    api_secret,
});