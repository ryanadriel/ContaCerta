const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    user: {
        type: String,
        ref: 'User',
        required: false
    },
    tag_id: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        ref: 'Tag',
        required: false
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;