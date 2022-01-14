const mongoose = require('mongoose');

const promoCodeSchema = new mongoose.Schema({
    code: {
        type: String, required: true, unique: true
    },
    discountPer: {
    },
    discountAmt: {
    },
    isValid: {
        type: Boolean,
        default: false
    }
})

module.exports = new mongoose.model('promos', promoCodeSchema, 'promos');