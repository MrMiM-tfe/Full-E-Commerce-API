

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