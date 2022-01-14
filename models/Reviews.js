const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
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