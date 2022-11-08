// Services
const { setupService } = require('../services')

exports.setup = async (req, res) => {
    await setupService.setupSite()

    return res.json({
        type: "Success",
        message: "ok"
    })
}