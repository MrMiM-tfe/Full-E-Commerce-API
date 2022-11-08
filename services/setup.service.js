// defualt settings
const defualts = require('../config/default_setting.json')

// Models
const { Keyv } = require('../models')

exports.setupSite = async () => {
    // save default settings to database
    for await (const [key, value] of Object.entries(defualts)){
        if (typeof value === "string") {
            await Keyv.create({
                key,
                value,
                tag: "setting"
            })
        } else if ( typeof value === "object"){
            await Keyv.create({
                key,
                value: value[0],
                public: value[1],
                tag: "setting"
            })
        }
    }

    await Keyv.create({
        key: "loaded",
        value: "true",
        tag: "setting"
    })
}