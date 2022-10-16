// Packages
const jwt = require('jsonwebtoken')

// Configs
const config = require('../config/config')
const tokenTypes = require('../config/tokens')

// Models
const { Token } = require('../models')

/**
 * Save Token to DataBase
 * @param   { String }      token
 * @param   { ObjectId }    userId
 * @param   { Data }        expires
 * @param   { String }      type
 * @returns { Promise<Token> }
 */
const saveToken = async (token, userId, expires, type) => {

    // 1) delete last tokens if exist
    const lastTokens = await Token.deleteMany({user:userId})

    const savingData = {
        token,
        user: userId,
        expires: parseInt(expires),
        type
    }

    return await Token.create(savingData)
}


/**
 * Generate Token
 * @param   { ObjectId }    userId
 * @param   { Data }        expires
 * @param   { String }      type
 * @returns { Promise<Token> }
 */
const generateToken = async (userId, expires, type) => {

    const secret = config.jwt.secret
    const payload = {
        sub: userId,
        iat: Date.now(),
        exp: parseInt(expires),
        type
    }

    const TokenStr = jwt.sign(payload, secret)

    return await saveToken(TokenStr, userId, expires, type)
}

/**
 * verify token and return TokenDoc (or throw an error if it's not valid)
 * @param   { String }    token
 * @param   { type }      type
 * @returns { Promise<Token> }
 */
const verifyToken = async (token, type) => {
    const payload = jwt.verify(token, config.jwt.secret)

    const tokenDoc = await Token.findOne({
        token,
        type,
        user: payload.sub
    })

    if (!tokenDoc) {
        return {
            type: 'Error',
            statusCode: 404,
            message: 'Token not found'
        }
    }

    return tokenDoc
}

/**
 * Generate Expires Time
 * @param   { Number }  expirationDays
 * @returns { Number }
 */
const generateExpiration = (expirationDays) => {
    const date = new Date()
    date.setHours(date.getHours() + 24 * expirationDays)
    return date.getTime()
}


/**
 * Generate auth token
 * @param   { Object } user
 * @returns { Promise<Token> }
 */
const generateAuthToken = async (user) => {
    const accessTokenExpires = generateExpiration(config.jwt.accessExpirationDays)

    const accessToken = generateToken(
        user.id,
        accessTokenExpires,
        tokenTypes.ACCESS
    )

    return accessToken
}

module.exports = {
    generateToken,
    saveToken,
    generateExpiration,
    generateAuthToken,
}