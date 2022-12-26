// Services
const { orderService } = require('../services')


/**
 * @desc      Create New Order Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @return    { JSON } - A JSON object representing the type, message and the order
 */
exports.createOrder = async (req, res) => {
    // create order
    const { type, message, statusCode, order } = await orderService.createOrder(req.body, req.user)

    // Check if there is an error
    if (type === 'Error') {
        return res.status(statusCode).json({
            type,
            message,
        });
    }

    // If everything is OK, send data
    return res.status(statusCode).json({
        type,
        message,
        order
    });
}

/**
 * @desc      Update order status Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @return    { JSON } - A JSON object representing the type, message and the order
 */
exports.editOrderStatus = async (req, res) => {
    // update order
    const { type, message, statusCode, order } = await orderService.orderStatus(req.body.status, req.params.id)

    // Check if there is an error
    if (type === 'Error') {
        return res.status(statusCode).json({
            type,
            message,
        });
    }

    // If everything is OK, send data
    return res.status(statusCode).json({
        type,
        message,
        order
    });
}

/**
 * @desc      Get All User Orders Controller
 * @param     { Object }  req - Request object
 * @param     { Object }  res - Response object
 * @return    { JSON } - A JSON object representing the type, message and the orders
 */
exports.getUserOrders = async (req, res) => {
    // get orders
    const { type, message, statusCode, orders } = await orderService.getUserOrders(req)

    // Check if there is an error
    if (type === 'Error') {
        return res.status(statusCode).json({
            type,
            message,
        });
    }

    // If everything is OK, send data
    return res.status(statusCode).json({
        type,
        message,
        orders
    });
}

/**
 * @desc      Get User Order by Id Controller
 * @param     { Object }  req - Request object
 * @param     { Object }  res - Response object
 * @return    { JSON } - A JSON object representing the type, message and the order
 */
 exports.getUserOrder = async (req, res) => {
    // get orders
    const { type, message, statusCode, order } = await orderService.getUserOrder(req)

    // Check if there is an error
    if (type === 'Error') {
        return res.status(statusCode).json({
            type,
            message,
        });
    }

    // If everything is OK, send data
    return res.status(statusCode).json({
        type,
        message,
        order
    });
}

/**
 * @desc      Get All Orders Controller
 * @param     { Object }  req - Request object
 * @param     { Object }  res - Response object
 * @return    { JSON } - A JSON object representing the type, message and the orders
 */
exports.getAllOrders = async (req, res) => {
    // get orders
    const { type, message, statusCode, orders } = await orderService.getAllOrders(req.query.status)

    // Check if there is an error
    if (type === 'Error') {
        return res.status(statusCode).json({
            type,
            message,
        });
    }

    // If everything is OK, send data
    return res.status(statusCode).json({
        type,
        message,
        orders
    });
}