const router = require('express').Router();
const { productController } = require('../controllers');


// @route   GET api/products
// @desc    Get user data
// @access  Private
router.get('/:id', productController.getProducts);

// @route  POST api/products/add
// @desc   Add product
// @access Private
router.post('/add', productController.addProduct);

module.exports = router;