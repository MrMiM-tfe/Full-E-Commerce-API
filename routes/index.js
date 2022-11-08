const express = require('express')
const router = express.Router()

// Routes
const settingRoutes = require('./setting.routes')

const authRoutes = require('./auth.routes')
const userRoutes = require('./user.routes')

const productRoutes = require('./product.routes')
const prodcutCommentRoutes = require('./productComment.routes')
const prodcutCategoryRoutes = require('./productCategory.routes')

const cartRoutes = require("./cart.routes")
const orderRoutes = require('./order.routes')
const paymentRoutes = require('./payment.routes')

router.use('/setting', settingRoutes)

router.use('/auth', authRoutes)
router.use('/user', userRoutes)

router.use('/product', productRoutes)
router.use('/comment/product', prodcutCommentRoutes)
router.use('/category/product', prodcutCategoryRoutes)

router.use('/cart', cartRoutes)
router.use('/order', orderRoutes)
router.use('/payment', paymentRoutes)

// router.use('/article', articleRoutes)
// router.use('/comment/article', articleCommentRoutes)
// router.use('/category/article', articleCategoryRoutes)


module.exports = router