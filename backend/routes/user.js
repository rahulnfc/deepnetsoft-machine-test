const router = require('express').Router();
const { userController } = require('../controllers');
const { checkLoggedIn } = require('../middlewares/userJWTAuth');

// @route   POST api/user/register
// @desc    Register user
// @access  Public
router.post('/register', userController.register);

// @route   POST api/user/login
// @desc    Login user and return JWT token
// @access  Public
router.post('/login', userController.login);

// @route   GET api/user
// @desc    Get user data
// @access  Private
router.get('/', checkLoggedIn, userController.getUser);

module.exports = router;