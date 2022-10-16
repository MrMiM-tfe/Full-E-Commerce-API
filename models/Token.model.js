const mongoose = require("mongoose")


const tokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    expires: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Token', tokenSchema)