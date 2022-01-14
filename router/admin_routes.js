const router = require('express').Router()

const authenticate = require('../middleware/authenticate');
const admin = require('../middleware/admin');

const admin_orderController = require('../controllers/admin/order-controller');
const admin_userController = require('../controllers/admin/user-controller');

router.get('/api/admin/orders', authenticate, admin, admin_orderController().fetchOrders);

router.get('/api/admin/contact', authenticate, admin, admin_userController().fetchContacts);
router.get('/api/admin/contact', authenticate, admin, admin_orderController().fetchCancellations);



module.exports = router