const { calculateQuote } = require('../services/pricingService')
const { PricingRule } = require('../models/PricingRule')

async function calculate(req, res, next) {
  try {
    const quote = await calculateQuote(req.body)
    res.json({
      success: true,
      data: quote,
    })
  } catch (err) {
    next(err)
  }
}

async function getOptions(_req, res, next) {
  try {
    const rules = await PricingRule.find({ isActive: true }).lean()
    res.json({
      success: true,
      data: rules,
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { calculate, getOptions }
