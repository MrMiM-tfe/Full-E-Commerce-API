// Packages
const express = require('express')
const router = express.Router()

// controllers
const { settingController } = require('../controllers')

// middlewares
const { adminCheck } = require('../middlewares/auth')

router.get('/:key', settingController.getSetting)

router.use(adminCheck)

router.get('/', settingController.getAllSettings)

router.post('/:key', settingController.setSetting)

router.delete('/:key', settingController.deleteSetting)

module.exports = router