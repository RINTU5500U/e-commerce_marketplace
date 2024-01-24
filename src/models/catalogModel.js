const mongoose = require('mongoose');

const catalogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    item: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    createdAt: { 
        type: String,
        default: new Date().toLocaleString()
    },
    updateAt: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Catalog', catalogSchema)