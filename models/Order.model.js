const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    products:{
        type: Array,
    },
    totalPrice:{
        type: Number,
        default: 0
    },
    isPaid:{
        type: Boolean,
        default: false
    },
    paidAt:{
        type: Date
    },
    deliveredAt:{
        type: Date
    },
    address:{
        type: String
    },
    shippingPrice: {
        type: Number,
        default: 0
    },
    phone:{
        type: String,
        required: [true, "phone is required"]
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ["walet", "zarinpal"]
    },
    authority: {
        type: String
    },
    status: {
        type: String,
        default: 'NotPaid',
        enum: ['NotPaid', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    }
},
{ timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema);