const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    active:{
        type: Boolean,
        required: true,
        default: true
    },
    items:[
        {
            product:{
                type: mongoose.Types.ObjectId,
                ref: "Product",
                required: true
            },
            price:{
                type: Number,
            },
            quantity:{
                type: Number,
            },
            totalPrice: {
                type: Number
            }
        }
    ],
    totalPrice:{
        type: Number
    }
},
{
    timestamps: true
})

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

cartSchema.post("save", handleError)
cartSchema.post("update", handleError)
cartSchema.post("findOneAndUpdate", handleError)
cartSchema.post("insertMany", handleError)

module.exports = mongoose.model("Cart", cartSchema)