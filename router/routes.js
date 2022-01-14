const router = require('express').Router();

const loginController = require('../controllers/auth/login-controller');
const signupController = require('../controllers/auth/signup-controller');
const cartController = require('../controllers/order-management/cart-controller');
const orderController = require('../controllers/order-management/order-controller');
const productController = require('../controllers/product-managemnt/products-controller');
const reviewsController = require('../controllers/product-managemnt/reviews-controller');
const blogController = require('../controllers/user-control/blog-controller');
const contactController = require('../controllers/user-control/contact-controller');
const userController = require('../controllers/user-control/user-controller');

const authenticate = require('../middleware/authenticate');

router.post('/api/signup', signupController().createUser)
router.post('/api/login', loginController().loginUser);
router.get('/api/refresh', loginController().renewAccessToken);

router.get('/api/products', productController().productList);
router.get('/api/product', productController().viewProduct);
router.post('/api/post-review/:pid', authenticate, reviewsController().post);

router.post('/api/checkout', authenticate, cartController().processCart);
router.post('/api/cancel-order', authenticate, orderController().cancelOrder);
router.post('/api/apply-promo', authenticate, cartController().applyPromo);
router.post('/api/remove-promo', authenticate, cartController().removePromo);

router.post('/api/profile', authenticate, userController().viewProfile);
router.post('/api/orders', authenticate, orderController().fetchOrders);
router.post('/api/contact', authenticate, contactController().contact);

router.get('/api/view-blogs', blogController().showAllBlogs);
router.get('/api/view-blogs/:slug', blogController().showBlog);


module.exports = router;