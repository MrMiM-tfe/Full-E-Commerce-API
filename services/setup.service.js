// defualt settings
const defualts = require('../config/default_setting.json')

// Models
const { Keyv } = require('../models')

exports.setupSite = async () => {
    // save default settings to database
    for await (const [key, value] of Object.entries(defualts)){
        console.log(key);
        console.log( typeof value);

        if (typeof value === "string") {
            try {
                await Keyv.create({
                    key,
                    value,
                    tag: "setting"
                })
            } catch (error) {
                console.log(error.message);
            }
        } else if ( typeof value === "object"){
            try {
                await Keyv.create({
                    key,
                    value: value[0],
                    public: value[1],
                    tag: "setting"
                })
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    await Keyv.create({
        key: "loaded",
        value: "true",
        tag: "setting"
    }).then(() => {
        console.log("ok");
    })
}