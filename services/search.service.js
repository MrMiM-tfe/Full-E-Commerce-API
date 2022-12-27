// Models
const { Product, Product_Category } = require("../models")

// Utils
const { getDocsV2 } = require("../utils/getDocs")

exports.autoComplite = async (searchStr) => {

    const products = await Product.find({ $text : { $search: searchStr } }, { score : { $meta: "textScore" } })
        .sort({ score : { $meta : 'textScore' } }).limit(5)

    return products
}

exports.search = async (req) => {

    const searchStr = req.query.q

    const query = { $text : { $search: searchStr } }
    const options = { score : { $meta: "textScore" } }
    const sort = { score : { $meta : 'textScore' } }
    
    const products = await getDocsV2(req, Product, query, options, sort)

    return {
        type: "Success",
        message: "OK",
        products
    }
}