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

module.exports = mongoose.model("Cart", cartSchema)