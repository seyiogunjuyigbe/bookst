const mongoose = require('mongoose');
const { Schema } = mongoose;
const bookSchema = new Schema({
    title: { type: String, uppercase: true },
    type: {
        type: String,
        enum: ['default', 'vendor']
    },
    category: { type: String, lowercase: true },
    price: Number,
    description: String,
    artCover: String,
    vendor: String
}, { timestamps: true });
module.exports = mongoose.model('Book', bookSchema)