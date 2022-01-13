const Joi = require("joi");
const Order = require("../../models/Order");
const productService = require("../../services/product-service");

const cartController = () => {
    return {
        async processCart(req, res) {
            //CART STRUCTURE
            // cart: {
            // items: {
            //     'PRODUCT1_ID': 'PRODUCT1_QTY',
            //     'PRODUCT2_ID': 'PRODUCT2_QTY',
            //     'PRODUCT3_ID': 'PRODUCT3_QTY'
            // },
            // totalItems: 5,
            // totalPrice: 1200
            // }

            const { cart, address, isPaid, promoApplied } = req.body;

            const products = Object.keys(cart.items)

            const productsInCart = await productService.findProductsByIds(products);

            const orderObj = {
                customerId: req._id,
                products: productsInCart,
                totalPrice: cart.totalPrice,
                address, isPaid, promoApplied
            }

            const orderSchema = Joi.object({
                customerId: Joi
                    .required(),
                products: Joi
                    .array()
                    .required(),
                totalPrice: Joi
                    .number()
                    .min(100)
                    .max(8000)
                    .required(),
                address: Joi
                    .string()
                    .min(6)
                    .required(),
                isPaid: Joi
                    .boolean()
                    .required(),
                promoApplied: Joi
                    .boolean()
                    .required(),
            })

            const validateOrder = await orderSchema.validate(orderObj)

            if (validateOrder.error) {
                if (validateOrder.error.name == 'ValidationError') {
                    return res
                        .status(422)
                        .json({ err: validateOrder.error.message })
                }
            }


            const order = new Order(orderObj)


            try {
                const placeOrder = await order.save();
                return res
                    .status(201)
                    .json({ message: 'Order Placed Successfully!' })

            } catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ err: 'Something went wrong!' })
            }
        }
    }
}

module.exports = cartController