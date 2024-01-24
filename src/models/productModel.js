const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    catalogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catalog',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
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

module.exports = mongoose.model('Product', productSchema)