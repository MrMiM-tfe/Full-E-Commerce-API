// Packages
const jwt = require('jsonwebtoken')

// config
const config = require('../config/config')

// Models
const { User } = require('../models')

exports.protect = async (req, res, next) => {

    // 1) Getting the token
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    // 2) Check if token exist
    if (!token) {
        return res.status(401).json({
            type: "Error",
            message: "You are not logged in!"
        })
    }

    // 3) Token verification
    const decoded = await jwt.verify(token, config.jwt.secret)

    // 4) Extract user data from database
    const currentUser = await User.findById(decoded.sub);

    // 5) Check if user does not exist
    if (!currentUser) {
        return res.status(401).json({
            type: "Error",
            message: "The user belonging to this token does no longer exist."
        })
    }

    // 6) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return req.status(401).json({
            type: "Error",
            message: "User recently changed password! Please login again!"
        })
    }

    req.user = currentUser

    next()
}