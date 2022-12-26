// services
const { prodcutService } = require('../services')

/**
 * @desc      Get All Products Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @returns   { JSON } - A JSON object representing the type, message and the products
 */
exports.getAllProducts = async (req, res) => {
    
    // 1) get all products
    const { type, message, statusCode, products } = await prodcutService.getProducts(req)

    // 2) check if error
    if (type == "Error") {
        return res.status(statusCode).json({
            type,
            message
        })
    }

    // 3) if everything is OK, send data
    return res.status(statusCode).json({
        type,
        message,
        products
    })
}

/**
 * @desc      Get Product Using It's Slug Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.slug - Product SLug
 * @returns   { JSON } - A JSON object representing the type, message, and the product
 */
exports.getProduct = async (req, res) => {
    // 1) Get product by slug
    const { type, message, statusCode, product } = await prodcutService.getProductBySlug(req.params.slug)

    // 2) check if error
    if (type == "Error") {
        return res.status(statusCode).json({
            type,
            message
        })
    }

    // 3) if everything is OK, send data
    return res.status(statusCode).json({
        type,
        message,
        product
    })    
}

/**
 * @desc      Get Product Using It's Id Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.id - Product id
 * @returns   { JSON } - A JSON object representing the type, message, and the product
 */
 exports.getProductById = async (req, res) => {
    // 1) Get product by id
    const { type, message, statusCode, product } = await prodcutService.getProductById(req.params.id)

    // 2) check if error
    if (type == "Error") {
        return res.status(statusCode).json({
            type,
            message
        })
    }

    // 3) if everything is OK, send data
    return res.status(statusCode).json({
        type,
        message,
        product
    })    
}

/**
 * @desc      Create New Product Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { Object } req.body - Body object data
 * @property  { String } req.user.id - User ID
 * @returns   { JSON } - A JSON object representing the type, message and the product
 */
exports.addProdcut = async (req, res) => {
    const { body, user } = req;

    // 1) create product
    const {type, message, statusCode, product} = await prodcutService.createProduct(body, user.id)

    // 2) check if error
    if (type == "Error") {
        return res.status(statusCode).json({
            type,
            message
        })
    }

    // 3) if everything is OK, send data
    return res.status(statusCode).json({
        type,
        message,
        product
    })
}

/**
 * @desc      Update Product Details Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.slug - Product ID
 * @property  { String } req.user.id - Seller ID
 * @property  { Object } req.body - Body object data
 * @returns   { JSON } - A JSON object representing the type, message and the product
 */
exports.editProduct = async (req, res) => {
    // 1) update product
    const {type, message, statusCode, product} = await prodcutService.updateProductBySlug(
        req.params.slug,
        req.user.id,
        req.body
        )
    
    // 2) check if error
    if (type == "Error") {
        return res.status(statusCode).json({
            type,
            message
        })
    }

    // 3) if everything is OK, send data
    return res.status(statusCode).json({
        type,
        message,
        product
    })
}

/**
 * @desc      Delete Product Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.slug - Product slug
 * @property  { String } req.user.id - Seller ID
 * @return    { JSON } - A JSON object representing the type and message
 */
exports.deleteProduct = async (req, res) => {
    // 1) Delete product
    const { type, message, statusCode } = await prodcutService.deleteProductBySlug(req.params.slug, req.user.id)

    // 2) check if error
    if (type == "Error") {
        return res.status(statusCode).json({
            type,
            message
        })
    }

    // 3) if everything is OK, send data
    return res.status(statusCode).json({
        type,
        message,
    })
}