// Packages
const express = require('express')
const router = express.Router()

// controllers
const { paymentController } = require('../controllers')

// middlewares
const { protect } = require('../middlewares/auth')

router.use(protect)

router.post('/pay', paymentController.pay)
router.get('/verfy/zp', paymentController.verfyZarinpal)

module.exports = router