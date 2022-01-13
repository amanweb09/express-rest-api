const orderService = require("../../services/order-service");

const orderController = () => {
    return {
        async fetchOrders(req, res) {
            try {
                const orders = await orderService.fetchOrder(
                    {
                        customerId: req._id,
                        status: { $ne: 'completed' }
                    },
                    {
                        sort: { 'createdAt': -1 }
                    })

                const completedOrders = await orderService.fetchOrder(
                    {
                        customerId: req._id,
                        status: 'completed'
                    },
                    {
                        sort: { 'createdAt': -1 }
                    })

                return res.status(200).json({ orders, completedOrders })
            } catch (error) {
                console.log(error);
                return res.status(500).json({ err: 'Something went wrong!' })
            }
        }
    }
}

module.exports = orderController;