const authController = require('./auth.controller')
const userController = require('./user.controller')

const productController = require('./product.controller')
const ProductCommentController = require('./productComment.controller')
const ProductCategoryController = require('./productCategory.controller')

module.exports = {
    authController,
    userController,
    productController,
    ProductCommentController,
    ProductCategoryController
}