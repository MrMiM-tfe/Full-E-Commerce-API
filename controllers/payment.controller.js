// Services
const { paymentService } = require('../services')

/**
 * @desc      pay
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @return    { JSON } - A JSON object representing the type, message and the url
 */
exports.pay = async (req, res) => {
    const {type, message, statusCode, url} = await paymentService.pay(req.body.orderId, req.body.callback)

    // if Error
    if (type === "Error") {
        return res.status(statusCode).json({
            type,
            message
        })
    }

    // if OK
    return res.status(statusCode).json({
        type,
        message,
        url
    })
}

/**
 * @desc      verfy zarinpal
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @return    { JSON } - A JSON object representing the type, message and the RefID
 */
exports.verifyZarinpal = async (req, res) => {
    const {type, message, statusCode, RefID } = await paymentService.verifyZarinpal(req)

    // if Error
    if (type === "Error") {
        return res.status(statusCode).json({
            type,
            message
        })
    }

    // if OK
    return res.status(statusCode).json({
        type,
        message,
        RefID
    })
}