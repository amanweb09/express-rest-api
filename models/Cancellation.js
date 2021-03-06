const mongoose = require('mongoose');

const cancellationSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    }
}, { timestamps: true })


module.exports = new mongoose.model('cancellations', cancellationSchema, 'cancellations');