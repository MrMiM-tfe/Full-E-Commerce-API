// Services
const { productCategoryService } = require('../services')

/**
 * @desc      Get All Categories Data Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @returns   { JSON } - A JSON object representing the type, message and categories
 */
exports.getAllCategories = async (req, res) => {
    // 1) get all categories
    const { type, message, statusCode, categories} = await productCategoryService.getCategories(req)

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
        categories
    })
}

/**
 * @desc      Get Category Using It's slug
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.slug - Category slug
 * @returns   { JSON } - A JSON object representing the type, message, and the category
 */
exports.getCategory = async (req, res) => {
    // 1) get category
    const { type, message, statusCode, category } = await productCategoryService.getCategory(req.params.slug)

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
        category
    })
}

/**
 * @desc      Create New Category Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @returns   { JSON } - A JSON object representing the type, message and the category
 */
exports.addCategory = async (req ,res) => {
    // 1) create category
    const { type, message, statusCode, category } = productCategoryService.createCategory(req.body)

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
        category
    })
}

/**
 * @desc      Update Category Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @returns   { JSON } - A JSON object representing the type, message, and the category
 */
exports.updateCategory = async (req, res) => {
    // 1) Update category
    const { type, message, statusCode, category } = productCategoryService.updateCategory(req.params.slug, req.body)

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
        category
    })
}

/**
 * @desc      Delete Category Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.slug - Category slug
 * @returns   { JSON } - A JSON object representing the type and message
 */
exports.deleteCategory = async (req, res) => {
    // 1) delete category
    const { type, message, statusCode } = productCategoryService.deleteCategory(req.params.slug)

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
        message
    })
}