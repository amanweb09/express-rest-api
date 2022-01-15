const orderService = require("../../services/order-service");
const Joi = require('joi');
const orderValidator = require("../../validators/order-validator");

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

                return res
                    .status(200)
                    .json({ orders, completedOrders })
            } catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ err: 'Something went wrong!' })
            }
        },
        async cancelOrder(req, res) {
            const { orderId, email, tel, reason } = req.body;

            if (!orderId || !email || !tel || !reason) {
                return res
                    .status(422)
                    .json({ err: 'Please fill all the fields!' })
            }

            const orderById = await orderService.fetchOrderById(orderId)

            if (!orderById) {
                return res
                    .status(404)
                    .json({ err: 'No order found with this ID!' })
            }

            const cancellationObj = {
                orderId, email, tel, reason
            }

            const { errorType, status, message } = orderValidator.validateCancellation(cancellationObj)

            if (errorType) {
                return res
                    .status(status)
                    .json({ err: message })
            }

            const response = await orderService.saveCancellationRequest(cancellationObj);

            if (response) {
                return res
                    .status(201)
                    .json({ message: 'Request Saved!' })
            }

            return res
                .status(500)
                .json({ err: 'Something went wrong!' })
        }
    }
}

module.exports = orderController;