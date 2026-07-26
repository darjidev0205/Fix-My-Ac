const mongoose = require('mongoose')

const ServiceAreaSchema = new mongoose.Schema(
  {
    city: { type: String, required: true, unique: true, index: true },
    state: { type: String, required: true },
    postalCodes: [{ type: String }],
    isActive: { type: Boolean, default: true, index: true },
    dispatchFee: { type: Number, default: 0 },
  },
  { timestamps: true },
)

const ServiceArea = mongoose.model('ServiceArea', ServiceAreaSchema)
module.exports = { ServiceArea }
