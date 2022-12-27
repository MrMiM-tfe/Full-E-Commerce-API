
exports.getDocs = async (req, model, query = {}) => {

    // Pagination
    const limit = req.query.limit || 10
    const page = req.query.page - 1 || 0

    const totalCount = await model.countDocuments({})
    const totalPage = Math.ceil(totalCount / limit)

    const docs = await model.find(query).skip(limit * page).limit(limit)

    if(!docs){
        return null
    }

    return { page: page + 1, limit, totalCount, totalPage, docs }
}

exports.getDocsV2 = async (req, model, query = {}, options = {}, sort = {}) => {

    // Pagination
    const limit = req.query.limit || 10
    const page = req.query.page - 1 || 0

    const totalCount = await model.countDocuments({})
    const totalPage = Math.ceil(totalCount / limit)

    const docs = await model.find(query, options).skip(limit * page).limit(limit).sort(sort)

    if(!docs){
        return []
    }

    return { page: page + 1, limit, totalCount, totalPage, docs }
}