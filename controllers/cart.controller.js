// Services
const { cartService } = require('../services')

/**
 * @desc      Get cart
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @returns   { JSON } - A JSON object representing the type, message and the cart
 */
exports.getCart = async (req, res) => {
    const { type, message, statusCode, cart } = await cartService.getCart(req.user.username)

    // check if error
    if (type == "Error") {
        return res.status(statusCode).json({
            type,
            message
        })
    }

    // if everything is OK, send data
    return res.status(statusCode).json({
        type,
        message,
        cart
    })
}

/**
 * @desc      Get carts
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @returns   { JSON } - A JSON object representing the type, message and the carts
 */
 exports.getCarts = async (req, res) => {
    const { type, message, statusCode, carts } = await cartService.getCarts(req.params.username)

    // check if error
    if (type == "Error") {
        return res.status(statusCode).json({
            type,
            message
        })
    }

    // if everything is OK, send data
    return res.status(statusCode).json({
        type,
        message,
        carts
    })
}

/**
 * @desc      edit cart
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @returns   { JSON } - A JSON object representing the type, message and the cart
 */
exports.editCart = async (req, res) => {
    const { type, message, statusCode, cart } = await cartService.editCart(req.body.productId, parseInt(req.body.quantity), req.user.username)

    // check if error
    if (type == "Error") {
        return res.status(statusCode).json({
            type,
            message
        })
    }

    // if everything is OK, send data
    return res.status(statusCode).json({
        type,
        message,
        cart
    })
}

/**
 * @desc      Increase Product Quantity By One
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @returns   { JSON } - A JSON object representing the type, message and the cart
 */
 exports.increaseByOne = async (req, res) => {
    const { type, message, statusCode, cart } = await cartService.increaseByOne(req.body.productId, req.user.username)

    // check if error
    if (type == "Error") {
        return res.status(statusCode).json({
            type,
            message
        })
    }

    // if everything is OK, send data
    return res.status(statusCode).json({
        type,
        message,
        cart
    })
}

/**
 * @desc      Reduce Product Quantity By One
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @returns   { JSON } - A JSON object representing the type, message and the cart
 */
 exports.reduceByOne = async (req, res) => {
    const { type, message, statusCode, cart } = await cartService.reduceByOne(req.body.productId, req.user.username)

    // check if error
    if (type == "Error") {
        return res.status(statusCode).json({
            type,
            message
        })
    }

    // if everything is OK, send data
    return res.status(statusCode).json({
        type,
        message,
        cart
    })
}

/**
 * @desc      Delete Cart
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @returns   { JSON } - A JSON object representing the type, message
 */
 exports.deleteCart = async (req, res) => {
    const { type, message, statusCode } = await cartService.deleteCart(req.user.username)

    // check if error
    if (type == "Error") {
        return res.status(statusCode).json({
            type,
            message
        })
    }

    // if everything is OK, send data
    return res.status(statusCode).json({
        type,
        message
    })
}

