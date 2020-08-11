const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tokenSchema = new Schema({
userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
        },
token: {
        type: String,
        required: true
        },
createdAt: {
        type: Date,
        required: true,
        default: new Date().getTime(),
        expires: 43200
        },
expiresAt:{
        type: Date
},
expired: {
        type: Boolean,
        default: false
}
}, {timestamps: true});

module.exports = mongoose.model('Token', tokenSchema);