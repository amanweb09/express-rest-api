const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    heroImg: {
        type: String,
        required: true
    },
    html: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = new mongoose.model('blogs', blogSchema, 'blogs');