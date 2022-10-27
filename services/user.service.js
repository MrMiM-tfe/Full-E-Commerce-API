// Utlis
const { getDocs } = require('../utils/getDocs')

// Models
const { User } = require("../models")


/**
 * @desc    Get all users
 * @param   {Obect} req - Req Object
 * @returns { Object<type|message|statusCode|users> } { type, message, statusCode, users }
 */
exports.getUsers = async (req) => {
    const users = await getDocs(req, User)

    // check users
    if (!users) {
        return {
            type: "Error",
            message: "not user found",
            statusCode: 404
        }
    }

    // if it's ok
    return {
        type: "Succes",
        message: "Users Found",
        statusCode: 200,
        users
    }
}

/**
 * @desc    Get user bi Id
 * @param   { String } UserId - user Id
 * @returns { Object<type|message|statusCode|user> } { type, message, statusCode, user }
 */
exports.getUserById = async (userId) => {
    const user = await User.findById(userId)

        // check user
        if (!user){
            return {
                type: "Error",
                message: "user not found",
                statusCode: 404
            }
        }

        return {
            type: "Success",
            message: "successfulyUserFound",
            statusCode: 200,
            user
        }
}

/**
 * @desc    Get user By user name
 * @param   { String } username - user username
 * @returns { Object<type|message|statusCode|user> } { type, message, statusCode, user }
 */
exports.getUserByUsername = async (username) => {
    const user = await User.findOne({username})

    // check user
    if (!user){
        return {
            type: "Error",
            message: "user not found",
            statusCode: 404
        }
    }

    return {
        type: "Success",
        message: "successfulyUserFound",
        statusCode: 200,
        user
    }    
}

/**
 * @desc    Edit User by ID
 * @param   { String } userId - user ID
 * @param   { Object } body - request body object
 * @returns { Object<type|message|statusCode|user> } { type, message, statusCode, user }
 */
exports.editUserById = async (userId, body) => {
    const lastUser = await User.findById(userId)

    // check user
    if (!lastUser) {
        return {
            type: "Error",
            message: "user not found",
            statusCode: 404
        }
    }

    // update user
    try {
        const user = await User.findByIdAndUpdate(userId, body, {
            new: true,
            runValidators: true
        })

        return {
            type: "Success",
            message: "successfulyUserUpdated",
            statusCode: 200,
            user
        }
    } catch (error) {
        return {
            type: "Error",
            message: error.message,
            statusCode: 400
        }
    }
}

/**
 * @desc    Edit User by username
 * @param   { String } username - user username
 * @param   { Object } body - request body object
 * @returns { Object<type|message|statusCode|user> } { type, message, statusCode, user }
 */
exports.editUserByUsername = async (username, body) => {
    const user = await User.findOne({username})

    // check user
    if (!user) {
        return {
            type: "Error",
            message: "user not found",
            statusCode: 404
        }
    }

    return await this.editUserById(user.id, body)
}

/**
 * @desc    Delete User by ID
 * @param   { String } userId - user ID
 * @returns { Object<type|message|statusCode> } { type, message, statusCode }
 */
exports.deleteUserById = async (userId) => {

    const user = await User.findById(userId)

    // check user
    if (!user) {
        return {
            type: "Error",
            message: "user not found",
            statusCode: 404
        }
    }

    try {
        await User.findByIdAndDelete(userId)

        // if its OK
        return {
            type: "Success",
            message: "user deleted",
            statusCode: 200
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
 * @desc    Delete User by username
 * @param   { String } username - user username
 * @returns { Object<type|message|statusCode> } { type, message, statusCode }
 */
exports.deleteUserByUsername = async (username) => {
    const user = await User.findOne({username})

    // check user
    if (!user) {
        return {
            type: "Error",
            message: "user not found",
            statusCode: 404
        }
    }

    return await this.deleteUserById(user.id)
}