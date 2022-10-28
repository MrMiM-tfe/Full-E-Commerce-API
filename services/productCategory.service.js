// Utils
const { getDocs } = require('../utils/getDocs')

// Models
const { Product_Category } = require('../models')

/**
 * @desc    Create New Category
 * @param   { Object } body - Body object data
 * @returns { Object<type|message|statusCode|category> } { type, message, statusCode, category }
 */
exports.createCategory = async (body) => {
    const { name, des, mother, slug } = body

    // 1) check name
    if (!name) {
        return {
            type: 'Error',
            message: 'nameIsRequired',
            statusCode: 400
        }
    }

    try {
        // 2) create category
        const category = await Product_Category.create({
            name,
            slug,
            des,
            mother
        })
    
        return {
            type: "Success",
            message: "CategoryCreated",
            statusCode: 201,
            category
        }
    } catch (error) {
        return {
            type: "Error",
            message: error.message,
            statusCode: error.statusCode ?? 500
        }
    }
    
}

/**
 * @desc    Get Categories
 * @param   { Object } req - Request object
 * @returns { Object<type|message|statusCode|categories> } { type, message, statusCode, categories }
 */
exports.getCategories = async (req) => {
    // 1) get all categories
    const categories = await getDocs(req, Product_Category)

    // 2) check categories
    if (!categories) {
        return {
            type: "Error",
            message: "noCategoryFound",
            statusCode: 404
        }
    }

    // if ok
    return {
        type: "Success",
        message: "CategoryFound",
        categories
    }
}

/**
 * @desc    Query Category Using It's Slug
 * @param   { String } slug - Category slug
 * @returns { Object<type|message|statusCode|category> } { type, message, statusCode, category }
 */
exports.getCategory = async (slug) => {
    // 1) get category
    const category = Product_Category.findOne({slug})

    // 2) check category
    if (!category) {
        return {
            type: "Error",
            message: "categoryNotFound",
            statusCode: 404
        }
    }

    return {
        type: "Success",
        message: "successfulCategoryFound",
        statusCode: 200,
        category
    }
}

/**
 * @desc    Update Category
 * @param   { String } slug - Category slug
 * @param   { Object } body - Category details
 * @returns { Object<type|message|statusCode|category> }
 */
exports.updateCategory = async (CatSlug, body) => {
    const { name, des, mother, slug } = body

    try {
        // 1) create category
        const category = await Product_Category.findByIdAndUpdate({slug : CatSlug}, body, {
            new: true,
        })
    
        return {
            type: "Success",
            message: "CategoryUpdated",
            statusCode: 201,
            category
        }
    } catch (error) {
        return {
            type: "Error",
            message: error.message,
            statusCode: error.statusCode ?? 500
        }
    }
}

/**
 * @desc    Delete Category
 * @param   { String } slug - Category slug
 * @returns { Object<type|message|statusCode> }
 */
exports.deleteCategory = async (slug) => {
    const category = await Product_Category.findOne({slug})

    // 1) Check if category doesn't exist
    if (!category) {
        return {
            type: 'Error',
            message: 'noCategoryFound',
            statusCode: 404
        };
    }

    // 3) Delete category
    await Product_Category.findOneAndDelete({slug})

    return {
        type: "Success",
        message: "successfulCategoryDelete",
        statusCode: 200
    }
}