const router = require('express').Router()

const authenticate = require('../middleware/authenticate');
const admin = require('../middleware/admin');
const admin_orderController = require('../controllers/admin/order-controller');

router.get('/api/admin/orders', authenticate, admin, admin_orderController().fetchOrders)
// router.get('/api/admin/cancellations', authenticate, admin)
// router.get('/api/admin/contact', authenticate, admin)

module.exports = router