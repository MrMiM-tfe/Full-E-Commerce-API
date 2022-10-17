const express = require('express')
const router = express.Router()

// Routes
const authRoutes = require('./auth.routes')
const productRoutes = require('./product.routes')
const prodcutCommentRoutes = require('./productComment.routes')

router.use('/auth', authRoutes)
router.use('/prodcut', productRoutes)
router.use('/comment/prodcut', prodcutCommentRoutes)

module.exports = router