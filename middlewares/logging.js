// Middlewares
const { loginCheck } = require('./auth')

// Utils
const color = require('../utils/colors')

const logToConsole = async (req, res, next) => {

    const { type } = await loginCheck(req)

    
    if(type == "Error") {
        var user = "Guest"
    }else {
        var user = req.user.username
    }

    const url = req.url

    const method = req.method

    const logText = ( color.fg.green + method + color.reset + " => " + url )

    console.log( "\n" + color.fg.blue + user + color.reset);
    console.log(logText);

    next()
}

module.exports = {
    logToConsole
}