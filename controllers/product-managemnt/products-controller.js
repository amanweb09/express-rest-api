const Products = require('../../models/Product');
const productService = require('../../services/product-service');

const productController = () => {
    return {
        async productList(req, res) {
            const products = await productService.findAllProducts()
            return res.status(200).json({ products })
        },
        async viewProduct(req, res) {
            const { _id } = req.params;

            const product = await productService.findProduct({ _id })

            if (product) {
                return res.status(200).json({ product })
            }
            
            return res.status(404).json({ err: 'No product found with this ID!' })
        }
    }
}

module.exports = productController;