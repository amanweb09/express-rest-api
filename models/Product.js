const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image_primary: {
        type: String,
        required: true
    },
    image_sec: {
        type: String
    },
    category: {
        type: Array,
        required: true
    },
    desc: {
        type: Array,
        required: true
    },
    colors: {
        type: Array,
        required: true
    },
    sizes: {
        type: Array,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    season: {
        type: String,
        required: true
    } 
})

const Product = new mongoose.model('products', productSchema, 'products');

module.exports = Product;