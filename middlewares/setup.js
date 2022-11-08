// Models
const { Keyv } = require('../models')

const checkIsFirstLoad = async (req, res, next) => {
    const isLoaded = await Keyv.findOne({key: "loaded"})

    if (isLoaded){
        return res.status(401).json({
            type: "Error",
            message: "setup is complited in past"
        })
    }else{
        next()
    }

}

module.exports = {
    checkIsFirstLoad
}