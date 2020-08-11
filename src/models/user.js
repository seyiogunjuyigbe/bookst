const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');
const crypto = require('crypto');
const Token = require('./token');
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    role: {
        type: String,
        enum: ['customer', "admin"]
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }],
    favourites: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
});
userSchema.methods.generatePasswordReset = function () {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

userSchema.methods.generateVerificationToken = function () {
    let payload = {
        userId: this._id,
        token: crypto.randomBytes(20).toString('hex')
    };

    return new Token(payload);
};
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model('User', userSchema)