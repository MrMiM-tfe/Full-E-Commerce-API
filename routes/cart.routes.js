// Packages
const express = require('express')
const router = express.Router()

// controllers
const { cartController } = require('../controllers')

// middlewares
const { adminCheck, protect } = require('../middlewares/auth')

router.user(protect)

// Get Cart
// Add Item To Cart
// Delete Cart
router.route('/').get(cartController.getCart).put(cartController.editCart).delete(cartController.deleteCart)

// Reduce One
router.patch('/reduce-one', cartController.reduceByOne)
// Increase One
router.patch('/increase-one', cartController.increaseByOne)

router.use(adminCheck)

// get all carts for one user
router.get('/:username', cartController.getCarts)

module.exports = router