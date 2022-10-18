const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    title:{
        type:String,
        required: [true, "title is required for comment"]
    },
    body:{
        type: String,
        required:[true, "Body is required for comment"]
    },
    product:{
        type: mongoose.Types.ObjectId,
        ref: "Prodcut",
        required: [true, "Comment must belong to a product"]
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Comment must belong to a user"]
    }
},{
    timestamps:true
})

commentSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Product_Commnet', commentSchema)