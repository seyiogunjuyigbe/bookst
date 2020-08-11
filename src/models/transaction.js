const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseIdToken = require('mongoose-id-token')
const transactionSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    date_initiated: { type: Date, default: new Date() },
    type: {
        type: String,
        enum: ["card", "bank", "ussd"],
        default: "card"
    },
    date_paid: Date,
    customer: { type: Schema.Types.ObjectId, ref: 'User' },
    reference: String,
    status: {
        type: String,
        enum: ['pending', 'success', 'failed', 'refunded', 'cancel', 'conflict'],
        default: 'pending'
    },
    token: String
});
transactionSchema.plugin(mongooseIdToken, { fieldName: 'token' })
module.exports = mongoose.model('Transaction', transactionSchema)