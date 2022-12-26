// Packages
const express = require('express')
const router = express.Router()

// controllers
const { paymentController } = require('../controllers')

// middlewares
const { protect } = require('../middlewares/auth')

router.get('/verify/zp', paymentController.verifyZarinpal)

router.use(protect)

router.post('/pay', paymentController.pay)

module.exports = router