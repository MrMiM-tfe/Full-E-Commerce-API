// Configs
const tokenTypes = require('../config/tokens')

// Middlewares
const { generateAuthToken } = require('../middlewares/token')

// Models
const { User ,Token } = require('../models')

/**
 * @desc    Signup Service
 * @param   { Object } body - Body object data
 * @return  { Object<type|statusCode|message|user|token>}
*/
exports.signup = async (body) => {
    const { name, username, email, password, passwordConfirmation, role, address, phone} = body

    if (
        !name ||
        !username ||
        !email ||
        !password ||
        !passwordConfirmation ||
        !role
      ) {
        return {
          type: 'Error',
          message: 'fieldsRequired',
          statusCode: 400
        };
      }

    // 1) Make admin role forbidden
    if (!['user', 'seller'].includes(body.role)) {
        return {
            type: 'Error',
            message: 'roleRestriction',
            statusCode: 400
        }
    }

    // 2) Check Password Confirmation
    if (body.password != body.passwordConfirmation) {
        return {
            type: 'Error',
            message: "paswordNotMatch",
            statusCode: 400
        }
    }
    
    
    // 2) Create new User
    const savingData = { name, username, email, password, passwordConfirmation, role, address, phone}

    try {
        const user = await User.create(savingData)

        // 3) Generate token
        const token = await generateAuthToken(user)

        // 4) Remove the password from the output
        user.password = undefined;

        return {
            type: 'Success',
            statusCode: 201,
            message: 'successfulSignUp',
            user,
            token
        };
    } catch (error) {
        return {
            type: "Error",
            message: error.message,
            statusCode: error.statusCode ?? 500
        }
    }
}

/**
 * @desc    Sign In Service
 * @param   { String } username - Username
 * @param   { String } password - User password
 * @return  { Object<type|statusCode|message|user|token> }
 */
exports.login = async (username, password) => {
    // 1) check if username and password exist
    if(!username || !password) {
        return {
            type:'Error',
            message: "usernamePasswordRequired",
            statusCode: 400
        }
    }

    // 2) Get User from database
    const user = await User.findOne({username}).select('+password')

    // 3) check if user does not exist
    if(!user){
        return {
            type:'Error',
            statusCode:401,
            message: 'incorrectUsernameOrPassword'
        }
    }

    const isMatch = await user.isPasswordMatch(password)

    // 4) check if password match
    if(!isMatch){
        return {
            type:'Error',
            statusCode:401,
            message: 'incorrectUsernameOrPassword'
        }
    }

      // 5) Generate authentication tokens
    const token = await generateAuthToken(user);

    // 6) If everything ok, send data
    return {
        type: 'Success',
        statusCode: 200,
        message: 'successfulLogin',
        user,
        token
    };
}

/**
 * @desc    Logout Service
 * @param   { String } token - User's token
 * @return  { Object }
 */
exports.logout = async (token) => {
    // 1) find token and delete from database
    const tokenDoc = await Token.findOneAndDelete({
        token,
        type: tokenTypes.ACCESS
    })

      // 2) Check if token already exist
    if (!tokenDoc) {
        return {
            type: 'Error',
            statusCode: 401,
            message: 'loginAgain'
        };
    }

    // 3) If everything ok, send data
    return {
        type: 'Success',
        statusCode: 200,
        message: 'successfulogout'
    };
}