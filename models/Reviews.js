const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        unique: false
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
        unique: false
    },
    stars: {
        type: Number,
        default: 4
    },
    reviews: {
        type: String
    }
}, { timestamps: true })

module.exports = new mongoose.model('reviews', reviewsSchema, 'reviews');