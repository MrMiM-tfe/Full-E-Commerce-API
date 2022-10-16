const express = require('express')
const router = express.Router()

// Routes
const authRoutes = require('./auth.routes')
const productRoutes = require('./product.routes')

router.use('/auth', authRoutes)
router.use('/prodcut', productRoutes)

module.exports = router