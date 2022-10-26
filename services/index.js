const authService = require('./auth.service')
const userService = require('./user.service')

const prodcutService = require('./product.service')
const prodcutCommentService = require("./productComment.service")
const productCategoryService = require("./productCategory.service")

module.exports = {
    authService,
    userService,
    prodcutService,
    prodcutCommentService,
    productCategoryService
}