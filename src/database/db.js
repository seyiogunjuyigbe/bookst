const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { DB_URL } = require('../config/config');
module.exports = {
    startDb() {
        mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true
        }, (err, done) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Database connected');

            }
        })
    }
}