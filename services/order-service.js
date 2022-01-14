const Cancellation = require("../models/Cancellation");
const Orders = require("../models/Order");
const PromoCodes = require("../models/Promo-code");
const Reviews = require("../models/Reviews");

class OrderService {
    async fetchOrder(filter) {
        try {
            const orders = await Orders
                .find(filter)
                .populate('customerId')
            return orders;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async fetchOrderById(_id) {
        try {
            return Orders.findById(_id)
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async saveCancellationRequest(reqObj) {
        try {
            const cancellation = new Cancellation(reqObj)
            return await cancellation.save()

        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async viewCancellationRequests(filter) {
        try {
            return await Cancellation.find(filter)

        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async findPromoCode(code) {
        try {
            return await PromoCodes
                .findOne(
                    {
                        code,
                        isValid: true
                    })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async saveReview(reqObj) {
        try {
            const review = new Reviews(reqObj)
            return await review.save()

        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

module.exports = new OrderService();