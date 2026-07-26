const mongoose = require('mongoose')

const PricingRuleSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    category: {
      type: String,
      required: true,
      enum: ['service', 'acUnitType', 'tonnage', 'material', 'addon', 'tax', 'warranty', 'duration'],
      index: true,
    },
    label: { type: String, required: true },
    description: { type: String, default: '' },
    unit: { type: String, default: '' },
    price: { type: Number, required: true },
    gstApplicable: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true, index: true },
    metadata: { type: Object, default: {} },
  },
  { timestamps: true },
)

const PricingRule = mongoose.model('PricingRule', PricingRuleSchema)
module.exports = { PricingRule }
