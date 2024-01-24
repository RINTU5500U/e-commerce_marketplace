const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
        default: 0
    },
    createdAt: { 
        type: String,
        default: new Date().toLocaleString()
    },
    updatedAt: { 
        type: String,
        default: null
    },
});

module.exports = mongoose.model('Wallet', walletSchema)