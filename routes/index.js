const express = require('express')
const router = express.Router()

// Routes
const authRoutes = require('./auth.routes')
const productRoutes = require('./product.routes')
const prodcutCommentRoutes = require('./productComment.routes')
const prodcutCategoryRoutes = require('./productCategory.routes')


router.use('/auth', authRoutes)

router.use('/product', productRoutes)
router.use('/comment/product', prodcutCommentRoutes)
router.use('/category/product', prodcutCategoryRoutes)

// router.use('/article', articleRoutes)
// router.use('/comment/article', articleCommentRoutes)
// router.use('/category/article', articleCategoryRoutes)


module.exports = router