const fs = require('fs')

// Model
const { Keyv } = require('../models')

// setting tag
const tag = "setting"

/**
 * @desc    get all settigs
 * @returns { Object<type|message|statusCode|settings> }
 */
exports.getSettings = async () => {
    const settings = await Keyv.find({tag})

    if (!settings) {
        return {
            type:"Error",
            message:"not setting found",
            statusCode: 404
        }       
    }

    return {
        type:"Success",
        message:"OK",
        statusCode: 200,
        settings
    } 
}

/**
 * @desc    get settig by key
 * @param   { string } key key of setting
 * @returns { Object<type|message|statusCode|setting> }
 */
exports.getSetting  = async (req) =>{
    
    const key = req.params.key

    // generate public filter
    let filter = {key, tag, public:true}

    if (req.user?.role === "admin") {
        // generate admin filter
        filter = {key, tag}
    }

    // use filter to get setting
    const setting = await Keyv.findOne(filter)

    if (!setting) {
        return {
            type:"Error",
            message:"not setting found",
            statusCode: 404
        }       
    }

    return {
        type:"Success",
        message:"OK",
        statusCode: 200,
        setting
    }
}

/**
 * @desc    edit or set settig by key
 * @param   { string } key key of setting
 * @param   { string } value value of setting
 * @returns { Object<type|message|statusCode|setting> }
 */
exports.setSetting = async (key, value) => {
    // check key
    if (!key) {
        return {
            type: "Error",
            message: "key is requred",
            statusCode: 400
        }
    }

    try {
        const settings = await Keyv.findOneAndUpdate({key, tag}, {
            value,
        })

        if (!settings) {
            const newSetting = await Keyv.create({
                key,
                tag,
                value
            })

            if (!newSetting) {
                return {
                    type: "Error",
                    message: "can not create setting",
                    statusCode: 500
                }
            }

            return {
                type: "Success",
                message: "new setting added",
                statusCode: 200,
                settings: newSetting
            }
        }

        return {
            type: "Success",
            message: "setting updated",
            statusCode: 200,
            settings,
        }
    } catch (error) {
        return {
            type: "Error",
            message: error.message,
            statusCode: error.statusCode ?? 500
        }
    }
}


/**
 * @desc    delete settig by key
 * @param   { string } key key of setting
 * @returns { Object<type|message|statusCode|setting> }
 */
exports.deleteSetting = async (key) => {
    // delete setting
    const setting = await Keyv.findOneAndDelete({key})

    if (!setting) {
        return {
            type: "Error",
            message: "key not found in settins",
            statusCode: 404
        }
    }

    return {
        type: "Success",
        message: "setting deleted",
        statusCode: 200,
        setting
    }

}