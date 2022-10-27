// Models
const { Product, User, Product_Comment } = require("../models")

/**
 * @desc    Create New Comment
 * @param   { Object } reqBody - Body object data
 * @param   { String } productId - Product ID
 * @param   { String } user - An object contains logged in user data
 * @returns { Object<type|message|statusCode|comment> } { type, message, statusCode, commnet }
 */
exports.createComment = async (reqBody, productId, user) => {
    const { title, body } = reqBody

    // 1) title and body
    if (!title || !body) {
        return {
            type: "Error",
            message: "title and body is required",
            statusCode: 400
        }
    }

    const product = await Product.findById(productId)

    // 2) check product id
    if (!product) {
        return {
            type: "Error",
            message: "invalidProductId",
            statusCode: 400
        }
    }    

    try {
        const comment = await Product_Comment.create({
            title,
            body,
            user,
            product: product.id
        })
    
        return {
            type: "Success",
            message: "commnetCreated",
            statusCode: 201,
            comment
        }
    } catch (error) {
        return {
            type: "Error",
            message: error.message,
            statusCode: error.statusCode
        }
    }
}

/**
 * @desc    Get All Reviews
 * @param   { String } productId - Request object
 * @returns { Object<type|message|statusCode|comments> } { type, message, statusCode, commnets }
 */
exports.getAllComments = async (productId) => {
    const product = await Product.findById(productId)

    // 1) check product
    if (!product) {
        return {
            type: "Error",
            message: "noProductFound",
            statusCode: 404
        }
    }

    const comments = product.comments

    // 2) check commnets
    if (comments.length == 0) {
        return {
            type: "Error",
            message: "noCommentFound",
            statusCode: 404
        }
    }

    return {
        type: "Success",
        message: "commentsFound",
        status:200,
        comments
    }
}

/**
 * @desc    Delete comment Using It's ID
 * @param   { String } commentId - Comment ID
 * @param   { String } userId - User ID
 * @returns { Object<type|message|statusCode> } { type, message, statusCode }
 */
exports.deleteComment = async (commentId, userId) => {
    const comment = await Product_Comment.findById(commentId)

    // 1) chech comment
    if (!comment) {
        return {
            type: "Error",
            message: "noCommnetFound",
            statusCode: 404
        }
    }

    const user = await User.findById(userId)

    // 2) check user permission
    if (user.id.toString() !== comment.user.toString()  && user.role !== 'admin') {
        return {
            type: "Error",
            message: "noPermisson",
            statusCode: 401
        }
    }

    // 3) delete commnet
    await Product_Comment.findByIdAndDelete(commentId)

    return {
        type: "Success",
        message: "commnetDeleted",
        statusCode: 200
    }
}