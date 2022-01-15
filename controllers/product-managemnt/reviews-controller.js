const orderService = require('../../services/order-service');
const productService = require('../../services/product-service');

module.exports = function reviewsController() {
    return {
        async post(req, res) {
            const { pid } = req.params;
            const { stars, reviews } = req.body;

            if (!stars || !reviews) {
                return res
                    .status(422)
                    .json({ err: 'all fields are required!' })
            }

            //find the product
            const product = await productService
                .findProduct(pid)

            //validate product is
            if (!product) {
                return res
                    .status(404)
                    .json({ err: 'No product found with this ID!' })
            }

            const reviewsObj = {
                userId: req._id,
                productId: pid,
                stars, reviews
            }

            //save review
            const saveReview = await orderService.saveReview(reviewsObj)

            if (saveReview) {
                return res.status(201).json({ message: 'Review Saved Successfully!' })
            }

            return res
                .status(500)
                .json({ err: 'Something went wrong!!' })

        }
    }
}