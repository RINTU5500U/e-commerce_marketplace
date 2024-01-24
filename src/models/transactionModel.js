const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    walletId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Wallet'
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        default: null
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['debit','credit'],
        trim: true
    },
    creditedAt: { 
        type: String,
        default: null
    },
    debitedAt: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Transaction', transactionSchema)