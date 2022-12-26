const setupService = require('./setup.service')
const settigService = require('./setting.service')

const authService = require('./auth.service')
const userService = require('./user.service')

const prodcutService = require('./product.service')
const prodcutCommentService = require("./productComment.service")
const productCategoryService = require("./productCategory.service")

const cartService = require('./cart.service')
const orderService = require('./order.service')
const paymentService = require('./payment.service')

module.exports = {
    setupService,
    settigService,
    authService,
    userService,
    prodcutService,
    prodcutCommentService,
    productCategoryService,
    cartService,
    orderService,
    paymentService
}