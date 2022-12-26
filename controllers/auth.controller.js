// Middlewares
const { loginCheck } = require('../middlewares/auth')

// Services
const { authService } = require('../services')

/**
 * @desc      Sign Up Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { Object } req.body - Body data
 * @property  { Object } req.file - User image
 * @returns   { JSON } - A JSON object representing the type, message, user data, and tokens
 */
exports.signup = async (req, res) => {
    // 1) Calling sign up service
    const { type, message, statusCode, user, token } = await authService.signup(req.body)

    // 2) Check if something went wrong
    if (type === 'Error') {
        return res.status(statusCode).json({
        type,
        message: message
        });
    }

    console.log(message);

    // 3) If everything is OK, send data
    return res.status(statusCode).json({
        type,
        message,
        user,
        token
    });
}

/**
 * @desc      Sign In Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { Object } req.body.username - User username
 * @property  { Object } req.body.password - User password
 * @returns   { JSON } - A JSON object representing the type, message, user data, and tokens
 */
exports.login = async (req, res) => {
    
    // 1) Calling sign in service
    const { type, message, statusCode, user, token } = await authService.login(
        req.body.username,
        req.body.password
    );

    // 2) Check if something went wrong
    if (type === 'Error') {
        return res.status(statusCode).json({
            type,
            message
        });
    }

    // 3) If everything is OK, send data
    return res.status(statusCode).json({
        type,
        message,
        user,
        token
    });
}

/**
 * @desc      Logout Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { Object } req.body.token - User token
 * @returns   { JSON } - A JSON object representing the type and message
 */
exports.logout = async (req, res) => {

    // 1) Calling log out service
    const { type, message, statusCode} = await authService.logout(req.headers.authorization)

    // 2) Check if something went wrong
    if (type === 'Error') {
        return res.status(statusCode).json({
        type,
        message,
        });
    }

    // 3) If everything is OK, send data
    return res.status(statusCode).json({
        type,
        message
    });
}

/**
 * @desc      getUserInfo Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { Object } req.body.token - User token
 * @returns   { JSON } - A JSON object representing the type and message
 */
exports.getUser = async (req, res) => {

    // check user
    if (!req.user) {
        return res.status(403).json({
            type: "Error",
            message: "user not loged in"
        })
    }

    return res.json({
        type: "Success",
        message: "user successfuly got",
        user: req.user
    })
}