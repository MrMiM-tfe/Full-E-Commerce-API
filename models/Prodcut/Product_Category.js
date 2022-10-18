const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    slug: {
        type: String,
        unique: true
    },
    mother:{
        type: mongoose.Schema.ObjectId,
        ref:"Product_Comment"
    },
    des: {
        type: String
    }
},{
    timestamps:true
})

categorySchema.index({ slug: 1 })

// set products virtual
categorySchema.virtual('products', {
    ref: "Product",
    foreignField: 'categories',
    localField: '_id'
})

categorySchema.pre('save', function (next) {

    const regexExp = "/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/" 

    // check if slug is modified by user
    if(this.slug && regexExp.test(this.slug)){
        next()
    }

    this.slug = slugify(this.name)
    next()
})

module.exports = mongoose.model("Product_Category", categorySchema)