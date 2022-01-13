const Products = require('../models/Product');

class ProductService {
    async findAllProducts() {
        try {
            return await Products.find()
        } catch (error) {
            console.log(error);
            return res.status(500).json({ err: 'Something went wrong!' })
        }
    }

    async findProduct(_id) {
        try {
            return await Products.findById(_id)
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async findProductsByIds(ids) {
        try {
            return await Products.find({ _id: { $in: ids } })
        } catch (error) {
            console.log(error);
            return false
        }
    }
}

module.exports = new ProductService()