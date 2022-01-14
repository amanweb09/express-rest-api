const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    tel: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    refreshToken: {
        type: String
    },
    accessToken: {
        type: String
    },
    passwordResetToken: {
        type: String
    }
})

const User = new mongoose.model('users', userSchema, 'users');

module.exports = User;