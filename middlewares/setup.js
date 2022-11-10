// Models
const { Keyv } = require('../models')

const checkIsFirstLoad = async (req, res, next) => {
    const isLoaded = await Keyv.findOne({key: "loaded"})

    if (isLoaded.value !== "true"){
        return res.status(401).json({
            type: "Error",
            message: "setup is complited in past"
        })
    }else{
        next()
    }

}

const checkSetup = async (req, res, next) => {
    const isLoaded = await Keyv.findOne({key: "loaded"})

    console.log(isLoaded);

    if (isLoaded.value === "true"){
        next()
    }else{
        return res.status(401).json({
            type: "Error",
            message: "please go to /api/setup first"
        })
    }
}

module.exports = {
    checkSetup,
    checkIsFirstLoad
}