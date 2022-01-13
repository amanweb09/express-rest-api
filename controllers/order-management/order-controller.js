const Orders = require("../../models/Order");
const orderService = require("../../services/order-service");
const userService = require("../../services/user-service");

const orderController = () => {
    return {
        async fetchOrders(req, res) {
            try {
                const orders = await orderService.fetchOrder({ customerId: req._id })
                return res.status(200).json({ orders })
            } catch (error) {
                console.log(error);
                return res.status(500).json({ err: 'Something went wrong!' })
            }
        }
    }
}

module.exports = orderController;