const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    promoApplied: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'placed'
    },
    paymentType: {
        type: String,
        default: 'COD'
    }
}, { timestamps: true })

module.exports = new mongoose.model('orders', orderSchema, 'orders');