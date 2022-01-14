const router = require('express').Router()

const authenticate = require('../middleware/authenticate');
const admin = require('../middleware/admin');

const admin_orderController = require('../controllers/admin/order-controller');
const admin_userController = require('../controllers/admin/user-controller');
const admin_blogController = require('../controllers/admin/blog-controller');

router.get('/api/admin/orders', authenticate, admin, admin_orderController().fetchOrders);

router.get('/api/admin/contact', authenticate, admin, admin_userController().fetchContacts);
router.get('/api/admin/contact', authenticate, admin, admin_orderController().fetchCancellations);

router.post('/api/admin/create-blog', authenticate, admin, admin_blogController().create)

module.exports = router