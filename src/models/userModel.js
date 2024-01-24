const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        enum: ['buyer', 'seller'],
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase : true,
        trim: true
    },
    password: {
        type: String,
        required: true,
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

module.exports = mongoose.model('User', userSchema)