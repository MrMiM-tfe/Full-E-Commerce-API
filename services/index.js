const authService = require('./auth.service')
const userService = require('./user.service')

const prodcutService = require('./product.service')
const prodcutCommentService = require("./productComment.service")
const productCategoryService = require("./productCategory.service")

const cartService = require('./cart.service')
const orderService = require('./order.service')
const paymentService = require('./payment.service')

module.exports = {
    authService,
    userService,
    prodcutService,
    prodcutCommentService,
    productCategoryService,
    cartService,
    orderService,
    paymentService
}