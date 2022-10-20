// Utils
const { getDocs } = require('../utils/getDocs')

// Models
const { Product, User } = require('../models')

/**
 * @desc    Get all products
 * @param   { Object } req - Request object
 * @returns { Object<type|message|statusCode|products> } { type, message, statusCode, products }
 */
exports.getProducts = async (req) => {

    const products = await getDocs(req, Product)

    // 1) Check if products is empty
    if (!products) {
        return {
            type: "Error",
            message: "noProductsFound",
            statusCode: 404
        }
    }

    return {
        type: "Success",
        message: "successfulProductsFound",
        statusCode: 200,
        products
    }
}

/**
 * @desc    Get Product By Slug
 * @param   { String } slug
 * @returns {Object<type|message|statusCode|product>} { type, message, statusCode, product }
 */
exports.getProductBySlug = async (slug) => {
    const product = await Product.findOne({slug})

    if (!product) {
        return {
            type: "Error",
            message: "productNotFound",
            statusCode: 404
        }
    }

    return {
        type: "Success",
        message: "productFound",
        statusCode: 200,
        product
    }
}


/**
 * @desc    Create new Product
 * @param   { Object }  body - Body Object Data
 * @param   { Object }  seller - Product seller ID
 * @returns { Object<type|message|statusCode|product> } { type, message, statusCode, product }
 */
exports.createProduct = async (body, seller) => {
    const {
        name,
        slug,
        coverImage,
        images,
        shortDes,
        des,
        categories,
        regularPrice,
        sellPrice,
        quantity,
        isOutOfStock
    } = body

    // 1) Check if there any empty field
    if (
        !name
    ) {
        return {
            type: 'Error',
            message: 'fieldsRequired',
            statusCode: 400
        }
    }

    // 2) Create product
    const product = await Product.create({
        name,
        slug,
        coverImage,
        images,
        shortDes,
        des,
        seller,
        categories,
        regularPrice,
        sellPrice,
        quantity,
        isOutOfStock
    })

    return {
        type: 'Success',
        message: 'successfulProductCreate',
        statusCode: 201,
        product
    };
}

/**
 * @desc    Update Product Details
 * @param   { String }  productId
 * @param   { String }  sellerId
 * @param   { Object }  body
 * @returns { Object<type|message|statusCode|product> } { type, message, statusCode, product }
 */
exports.updateProductById = updateProductById = async (productId, sellerId, body) => {
    const lastProduct = await Product.findById(productId)

    // 1) check if product exist
    if(!lastProduct) {
        return {
            type: "Error",
            message: "noProductFound",
            statusCode: 404
        }
    }

    const editor = await User.findById(sellerId)

    // 2) check if seller exist
    if (!editor) {
        return {
            type: "Error",
            message: "userIdNotFound",
            statusCode: 403
        }
    }

    // 2) check user permission
    if(
        sellerId.toString() !== lastProduct.seller.toString() &&
        editor.role != "admin"
    ){
        return {
            type: "Error",
            message: "noPermission",
            statusCode: 403
        }
    }

    // 3) Update product
    const product = await Product.findByIdAndUpdate(productId, body, {
        new: true,
        runValidators: true
    })

    return {
        type: 'Success',
        message: 'successfulProductDetails',
        statusCode: 200,
        product
    }
}

/**
 * @desc    Update Product Details
 * @param   { String }  slug
 * @param   { String }  sellerId
 * @param   { Object }  body
 * @returns { Object<type|message|statusCode|product> } { type, message, statusCode, product }
 */
exports.updateProductBySlug = async (slug, sellerId, body) => {
    const product = await Product.findOne({slug})

    if (!product) {
        return {
            type: 'Error',
            message: 'noProductFound',
            statusCode: 404
        }
    }

    return await updateProductById(product.id, sellerId, body)
}

/**
 * @desc    Delete prodcut by id
 * @param   { String }  productId
 * @param   { String }  sellerId,
 * @returns { Object<type|message|statusCode> } { type, message, statusCode }
 */
exports.deleteProductById = deleteProductById = async (productId, sellerId) => {
    const product = await Product.findById(productId)

    // 1) check if Product exist
    if(!product) {
        return {
            type: "Error",
            message: "noProductFound",
            statusCode: 404
        }
    }

    const editor = await User.findById(sellerId)

    // 2) check user permission
    if (
        sellerId.toString() !== product.seller.toString() &&
        editor.role != "admin"
    ){
        return {
            type: "Error",
            message: "noPermission",
            statusCode: 403
        }
    }

    // 3) delete product
    await Product.findByIdAndDelete(productId)

    // 4) If everything is OK, send data
    return {
        type: 'Success',
        message: 'successfulProductDelete',
        statusCode: 200
    };
}

/**
 * @desc    Delete prodcut by slug
 * @param   { String }  slug
 * @param   { String }  sellerId,
 * @returns { Object<type|message|statusCode> } { type, message, statusCode }
 */
exports.deleteProductBySlug = async (slug, sellerId) => {
    const product = await Product.findOne({slug})

    if (!product) {
        return {
            type: 'Error',
            message: 'noProductFound',
            statusCode: 404
        }
    }

    return await this.deleteProductById(product.id, sellerId)
}