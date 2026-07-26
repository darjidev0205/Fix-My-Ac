const express = require('express')
const { calculate, getOptions } = require('../controllers/pricingController')

const router = express.Router()

router.get('/options', getOptions)
router.post('/calculate', calculate)

module.exports = { pricingRoutes: router }
