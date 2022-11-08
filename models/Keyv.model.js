const mongoose = require('mongoose')

const keyvSchema = mongoose.Schema({
    key:{
        type:String,
        require: true,
        unique: true
    },
    value:{
        type:String
    },
    public:{
        type:Boolean,
        default: false
    },
    tag:{
        type:String
    }
})

keyvSchema.index({ key: 1 })

const handleError = (err, doc, next) => {
    
    switch (err.name) {
        case "ValidationError":
            err.statusCode = 400
            break;
        case "MongoServerError":
            if (err.code === 11000){
                err.statusCode = 400
            }
            break;
        default:
            err.statusCode = 500
            break;
        }
    next(err)
}

keyvSchema.post("save", handleError)
keyvSchema.post("update", handleError)
keyvSchema.post("findOneAndUpdate", handleError)
keyvSchema.post("insertMany", handleError)

module.exports = mongoose.model("Keyv", keyvSchema)