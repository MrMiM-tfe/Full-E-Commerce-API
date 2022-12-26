// Packages
const express = require('express')
const router = express.Router()

// controllers
const { setupController } = require('../controllers')

// middlewares
const { checkIsFirstLoad } = require('../middlewares/setup')

router.use(checkIsFirstLoad)

router.get('/',setupController.setup)

module.exports = router