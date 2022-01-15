const Order = require("../../models/Order");
const orderService = require("../../services/order-service");
const productService = require("../../services/product-service");
const orderValidator = require("../../validators/order-validator");

const cartController = () => {
    return {
        async processCart(req, res) {
            //CART STRUCTURE
            // cart: {
            // items: {
            //     'PRODUCT1_ID': '{PRODUCT1_QTY, COLOR, SIZE}',
            //     'PRODUCT2_ID': '{PRODUCT1_QTY, COLOR, SIZE}',
            //     'PRODUCT3_ID': '{PRODUCT1_QTY, COLOR, SIZE}'
            // },
            // totalItems: 5,
            // totalPrice: 1200
            // }

            const { cart, address, isPaid, promoApplied } = req.body;

            const products = Object.keys(cart.items)
            const productsInCart = await productService
                .findProductsByIds(products);

            let orderedProducts = [];
            productsInCart
                .forEach((product) => {
                    product = {
                        ...product,
                        qty: cart.items[product._id].qty,
                        color: cart.items[product._id].color,
                        size: cart.items[product._id].size
                    }

                    orderedProducts.push(product)
                })
            let sortedOrders = []
            orderedProducts
                .forEach((product) => {
                    sortedOrders.push({
                        product: product._doc,
                        qty: product.qty,
                        color: product.color,
                        size: product.size
                    })
                })

            const orderObj = {
                customerId: req._id,
                products: sortedOrders,
                totalPrice: cart.totalPrice,
                address, isPaid, promoApplied
            }

            const { errorType, status, message } = orderValidator.validateOrder(orderObj)

            if (errorType) {
                return res
                    .status(status)
                    .json({ err: message })
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
        },
        async applyPromo(req, res) {
            const { code, cartAmount } = req.body;

            if (!code || !cartAmount) {
                return res
                    .status(422)
                    .json({ err: "All fields are required!" })
            }

            //find code in db
            const promo = await orderService.findPromoCode(code);

            //calculate discount and send to the client
            if (promo) {
                if (promo.discountPer && !promo.discountAmt) {
                    const newAmt = Math.round(cartAmout - cartAmount * promo.discountPer / 100);
                    return res
                        .status(200)
                        .json({
                            newAmt,
                            discountType: "per",
                            isApplied: true,
                            canApply: false
                        })
                }
                else if (promo.discountAmt && !promo.discountPer) {
                    const newAmt = Math
                        .round(cartAmount - promo.discountAmt);
                    return res
                        .status(200)
                        .json({
                            newAmt,
                            discountType: "amt",
                            isApplied: true,
                            canApply: false
                        })
                }
            }
            return res.status(404).json({ err: 'Promocode not found!' })
        },
        async removePromo(req, res) {
            const { cartAmount, isApplied, codeApplied, discountType } = req.body;

            if (!cartAmount || !isApplied || !codeApplied || !discountType) {
                return res
                    .status(422)
                    .json({ err: "All fields are required!" })
            }

            //find code in db
            const promo = await orderService.findPromoCode(codeApplied);

            if (promo && discountType === 'per') {
                const discount = promo.discountPer / 100;
                const den = 1 - discount

                const newAmt = Math
                    .round(cartAmount / den)

                return res
                    .status(200)
                    .json({
                        newAmt,
                        canApply: true
                    })
            }
            else if (promo && discountType === 'amt') {
                const newAmt = Math.round(cartAmount + promo.discountAmt);
                return res
                    .status(200)
                    .json({
                        newAmt,
                        canApply: true
                    })
            }

            return res
                .status(404)
                .json({ err: 'Promocode not found!' })
        }
    }
}

module.exports = cartController