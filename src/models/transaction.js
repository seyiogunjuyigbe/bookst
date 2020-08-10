const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const transactionSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    date_initiated: { type: Date, default: new Date() },
    date_paid: Date,
    customer: { type: Schema.Types.ObjectId, ref: 'User' },
    reference: String,
    status: {
        type: String,
        enum: ['pending', 'success', 'failed', 'refunded', 'cancel', 'conflict'],
        default: 'pending'
    },
});

module.exports = mongoose.model('Transaction', transactionSchema)