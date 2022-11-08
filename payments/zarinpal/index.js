const config = require('../../config/config')
const Zarinpal = require('./zarinpal')

const { Keyv } = require('../../models')

const createZarinPal = async () => {

    const merchantId = await Keyv.findOne({key: "payment_zarinpal_merchant"})
    const sandbox = await Keyv.findOne({key: "payment_zarinpal_sandbox"})

    const zarinpal = Zarinpal.create(merchantId, sandbox)

    return zarinpal
}

module.exports = createZarinPal