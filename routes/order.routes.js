// Packages
const express = require('express')
const router = express.Router()

// controllers
const { orderController } = require('../controllers')

// middlewares
const { adminCheck, protect } = require('../middlewares/auth')

router.use(protect)

router.post('/', orderController.createOrder)
router.get('/user/', orderController.getUserOrders)
router.get('/user/:id', orderController.getUserOrder)

router.use(adminCheck)

router.get('/', orderController.getAllOrders)
router.put('/:id', orderController.editOrderStatus)

module.exports = router