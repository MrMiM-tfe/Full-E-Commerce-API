// Serices
const { userService } = require('../services')

/**
 * @desc      Get All Users Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @returns   { JSON } - A JSON object representing the type, message and the users
 */
exports.getUsers = async (req, res) => {
    const { type, message, statusCode, users } = userService.getUsers(req)

    // check if is eny errors
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
        users
    })
}

/**
 * @desc      Get single User by ID
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @returns   { JSON } - A JSON object representing the type, message and the user
 */
exports.getUser = async (req, res) => {
    const { type, message, statusCode, user } = userService.getUserById(req.params.id)

    // check if is eny errors
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
        user
    })
}

/**
 * @desc      Get single User by username
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @returns   { JSON } - A JSON object representing the type, message and the user
 */
 exports.getUserByUsername = async (req, res) => {
    const { type, message, statusCode, user } = userService.getUserByUsername(req.params.username)

    // check if is eny errors
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
        user
    })
}

/**
 * @desc      Edit User by ID
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @returns   { JSON } - A JSON object representing the type, message and the user
 */
 exports.editUser = async (req, res) => {
    const { type, message, statusCode, user } = userService.editUserById(req.params.id, req.body)

    // check if is eny errors
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
        user
    })
}

/**
 * @desc      Edit User by username
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @returns   { JSON } - A JSON object representing the type, message and the user
 */
 exports.editUserByUsername = async (req, res) => {
    const { type, message, statusCode, user } = userService.editUserByUsername(req.params.username, req.body)

    // check if is eny errors
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
        user
    })
}

/**
 * @desc      Delete User by ID
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @returns   { JSON } - A JSON object representing the type and message
 */
 exports.deleteUser = async (req, res) => {
    const { type, message, statusCode } = userService.deleteUserById(req.params.id)

    // check if is eny errors
    if (type === "Error") {
        return res.status(statusCode).json({
            type,
            message
        })
    }

    // if OK
    return res.status(statusCode).json({
        type,
        message
    })
}

/**
 * @desc      Delete User by username
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @returns   { JSON } - A JSON object representing the type and message
 */
 exports.deleteUserByUsername = async (req, res) => {
    const { type, message, statusCode } = userService.deleteUserByUsername(req.params.username)

    // check if is eny errors
    if (type === "Error") {
        return res.status(statusCode).json({
            type,
            message
        })
    }

    // if OK
    return res.status(statusCode).json({
        type,
        message
    })
}