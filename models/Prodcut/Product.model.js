const mongoose = require('mongoose')
const slugify = require('slugify')

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, "Product name is required"],
        trim:true
    },
    slug: {
        type: String,
        unique: true
    },
    coverImage:{
        type:String,
    },
    images:{
        type:[String],
    },
    shortDes:{
        type:String
    },
    des:{
        type:String
    },
    categories:{
        type:[mongoose.Schema.ObjectId],
        ref:'Category'
    },
    seller:{
        type: mongoose.Schema.ObjectId,
        ref:'User'
    },
    regularPrice:{
        type: Number,
        default: 0
    },
    sellPrice:{
        type: Number,
        default: 0
    },
    quantity:{
        type: Number,
        default: 0
    },
    sold:{
        type: Number,
        default: 0
    },
    isOutOfStock:{
        type:Boolean,
        default: false
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: (val) => Math.round(val * 10) / 10
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
})

productSchema.index(
    { name: 1, price: 1, sold: 1, ratingsAverage: -1 },
    { unique: true }
);
productSchema.index({ slug: 1 })

productSchema.virtual('comments', {
    ref: "Product_Comment",
    foreignField: "product", // product filed in Product_Comment Model
    localField: '_id' // _id filed in Product Model
})

productSchema.pre('save', function (next) {

    const regexExp = "/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/" 

    // check if slug is modified by user
    if(this.slug && regexExp.test(this.slug)){
        next()
    }

    this.slug = slugify(this.name)
    next()
})

module.exports = mongoose.model('Product', productSchema)