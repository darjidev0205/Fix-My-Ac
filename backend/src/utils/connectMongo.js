const mongoose = require('mongoose')
const { PricingRule } = require('../models/PricingRule')
const { seedPricing } = require('../seeds/pricingSeed')

async function connectMongo() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('Missing MONGODB_URI in backend/.env')

  mongoose.set('strictQuery', true)
  await mongoose.connect(uri)
  // eslint-disable-next-line no-console
  console.log('MongoDB connected successfully')
  await seedPricing(PricingRule)
}

module.exports = { connectMongo }

