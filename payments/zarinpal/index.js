const config = require('../../config/config')
const Zarinpal = require('./zarinpal')

const zarinpal = Zarinpal.create(config.payment.zarinpal.merchantId, config.payment.zarinpal.sandbox)

module.exports = zarinpal