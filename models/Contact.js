const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model('contacts', contactSchema, 'contacts')