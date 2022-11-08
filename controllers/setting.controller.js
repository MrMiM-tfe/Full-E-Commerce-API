// Services
const { settigService } = require('../services')

exports.getAllSettings = async (req, res) => {
    // get all settings
    const { type, message, statusCode, settings} = await settigService.getSettings()

    if (type === "Error"){
        return res.status(statusCode).json({
            type,
            message
        })
    }

    return res.status(statusCode).json({
        type,
        message,
        settings
    })
}

exports.getSetting = async (req, res) => {

    // get single setting by key
    const { type, message, statusCode, setting} = await settigService.getSetting(req)

    if (type === "Error"){
        return res.status(statusCode).json({
            type,
            message
        })
    }

    return res.status(statusCode).json({
        type,
        message,
        setting
    })
}

exports.setSetting = async (req, res) => {
    const key = req.params.key
    const value = req.body.value

    // edit or set setting by key
    const { type, message, statusCode, setting} = await settigService.setSetting(key, value)

    if (type === "Error"){
        return res.status(statusCode).json({
            type,
            message
        })
    }

    return res.status(statusCode).json({
        type,
        message,
        setting
    })
}

exports.deleteSetting = async (req, res) => {
    const key = req.params.key

    // delete setting by key
    const { type, message, statusCode, setting} = await settigService.deleteSetting(key)

    if (type === "Error"){
        return res.status(statusCode).json({
            type,
            message
        })
    }

    return res.status(statusCode).json({
        type,
        message,
        setting
    })
}