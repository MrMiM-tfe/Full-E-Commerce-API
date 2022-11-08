const settingController = require('./setting.controller')

const authController = require('./auth.controller')
const userController = require('./user.controller')

const productController = require('./product.controller')
const ProductCommentController = require('./productComment.controller')
const ProductCategoryController = require('./productCategory.controller')

const cartController = require('./cart.controller')
const orderController = require('./order.controller')
const paymentController = require('./payment.controller')

module.exports = {
    settingController,
    authController,
    userController,
    productController,
    ProductCommentController,
    ProductCategoryController,
    cartController,
    orderController,
    paymentController
}