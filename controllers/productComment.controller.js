// Services
const { prodcutCommentService } = require('../services')

/**
 * @desc      Create New Comment Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.productId - Product ID
 * @property  { String } req.user.id - User ID
 * @property  { Object } req.body - Body object data
 * @returns   { JSON } - A JSON object representing the type, message and the comment
 */
exports.addComment = async (req, res) => {
    // Create new Comment
    const { type, message, statusCode, commnet } = await prodcutCommentService.createComment(
        req.body,
        req.params.productId,
        req.user.id
    )

    // 2) check if error
    if (type == "Error") {
        return res.status(statusCode).json({
            type,
            message
        })
    }

    // 3) if everything is OK, send data
    return res.status(statusCode).json({
        type,
        message,
        commnet
    })
}

/**
 * @desc      Get All Commnets Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @return    { JSON } - A JSON object representing the type, message and the Commnets
 */
exports.getAllComments = async (req, res) => {
    // 1) Get All commment
    const {type, message, statusCode, commnets} = await prodcutCommentService.getAllComments(
        req.params.productId
    )

    // 2) check if error
    if (type == "Error") {
        return res.status(statusCode).json({
            type,
            message
        })
    }

    // 3) if everything is OK, send data
    return res.status(statusCode).json({
        type,
        message,
        commnets
    })
}

/**
 * @desc    Delete Comment Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.commentId - Comment ID
 * @property  { String } req.user.id - User ID
 * @return    { JSON } - A JSON object representing the type and message
 */
exports.deleteComment = async (req, res) => {
    // 1) delete comment
    const { type, message, statusCode } = prodcutCommentService.deleteComment(
        req.params.commentId,
        req.user.id
    )

    // 2) check if error
    if (type == "Error") {
        return res.status(statusCode).json({
            type,
            message
        })
    }

    // 3) if everything is OK, send data
    return res.status(statusCode).json({
        type,
        message
    })
}