const Orders = require("../models/Order");

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
}

module.exports = new OrderService();