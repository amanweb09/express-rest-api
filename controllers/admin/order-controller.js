const Orders = require('../../models/Order');
const orderService = require('../../services/order-service');

const admin_orderController = () => {
    return {
        async fetchOrders(req, res) {
            const orders = await orderService.fetchOrder();

            if (orders) {
                return res.status(200).json({ orders })
            }
            
            return res.status(200).json({ orders: [] })
        }
    }
}

module.exports = admin_orderController;