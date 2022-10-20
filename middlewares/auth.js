// Packages
const jwt = require('jsonwebtoken')

// config
const config = require('../config/config')

// Models
const { User } = require('../models')

const loginCheck = async (req) => {
    // 1) Getting the token
    const token = req.headers.authorization;

    // 2) Check if token exist
    if (!token) {
        return {
            type: "Error",
            message: "You are not logged in!",
            statusCode: 401
        }
    }

    // 3) Token verification
    try {
        var decoded = await jwt.verify(token, config.jwt.secret)
    } catch (error) {
        return {
            type: "Error",
            message: "You are not logged in!",
            statusCode: 401
        }
    }

    // 4) Extract user data from database
    const currentUser = await User.findById(decoded.sub);

    // 5) Check if user does not exist
    if (!currentUser) {
        return {
            type: "Error",
            message: "The user belonging to this token does no longer exist.",
            statusCode: 401
        }
    }

    // 6) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return {
            type: "Error",
            message: "User recently changed password! Please login again!",
            statusCode: 401
        }
    }

    req.user = currentUser

    return {
        type: "Success",
        message: "User Loged in",
    }
}

const protect = async (req, res, next) => {

    const {type, message, statusCode } = await loginCheck(req)
    
    if (type == "Error") {
        return res.status(statusCode).json({
            type,
            message
        })
    }

    next()
}

const adminCheck = async (req, res, next) => {

    const {type, message, statusCode } = await loginCheck(req)
    
    if (type == "Error") {
        return res.status(statusCode).json({
            type,
            message
        })
    }

    if (req.user.role != 'admin') {
        return res.status(403).json({
            type: "Error",
            message: "no permission"
        })
    }

    next()
}

const sellerCheck = async (req, res, next) => {

    const {type, message, statusCode } = await loginCheck(req)
    
    if (type == "Error") {
        return res.status(statusCode).json({
            type,
            message
        })
    }

    if (req.user.role != 'seller' && req.user.role != 'admin') {
        return res.status(403).json({
            type: "Error",
            message: "no permission"
        })
    }

    next()
}

module.exports = {
    protect,
    adminCheck,
    sellerCheck,
    loginCheck
}