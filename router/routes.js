const router = require('express').Router();

const loginController = require('../controllers/auth/login-controller');
const signupController = require('../controllers/auth/signup-controller');
const cartController = require('../controllers/order-management/cart-controller');
const orderController = require('../controllers/order-management/order-controller');
const productController = require('../controllers/product-managemnt/products-controller');
const userController = require('../controllers/user-control/user-controller');

const authenticate = require('../middleware/authenticate');

router.post('/api/signup', signupController().createUser)
router.post('/api/login', loginController().loginUser);
router.get('/api/refresh', loginController().renewAccessToken);
router.post('/api/logout', loginController().logout)

router.get('/api/products', productController().productList);
router.get('/api/products', productController().viewProduct);
router.post('/api/checkout', authenticate, cartController().processCart);

router.post('/api/profile', authenticate, userController().viewProfile);
router.post('/api/orders', authenticate, orderController().fetchOrders);

module.exports = router;