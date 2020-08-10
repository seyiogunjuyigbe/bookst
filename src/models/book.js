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
    vendor: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });
module.exports = mongoose.model('Book', bookSchema)