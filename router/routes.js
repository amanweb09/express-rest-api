const router = require('express').Router();

const loginController = require('../controllers/auth/login-controller');
const signupController = require('../controllers/auth/signup-controller');
const authenticate = require('../middleware/authenticate');

router.post('/api/signup', signupController().createUser)
router.post('/api/login', loginController().loginUser);
router.get('/api/refresh', loginController().renewAccessToken);
router.post('/api/test', authenticate, loginController().test);

module.exports = router;