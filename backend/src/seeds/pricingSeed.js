const mongoose = require('mongoose')

const defaultRules = [
  // Services
  { key: 'installation', category: 'service', label: 'Installation', description: 'New AC setup & mounting', price: 1499, gstApplicable: true },
  { key: 'cleaning', category: 'service', label: 'Jet Wash', description: 'Deep indoor foam cleaning', price: 699, gstApplicable: true },
  { key: 'repair', category: 'service', label: 'Repair & Check', description: 'Full electrical & cooling diagnostic', price: 499, gstApplicable: true },
  { key: 'gas', category: 'service', label: 'Gas Refill', description: 'Refrigerant pressure top-up', price: 1299, gstApplicable: true },

  // AC Unit Types
  { key: 'split-standard', category: 'acUnitType', label: 'Split AC (Standard)', description: 'Wall-mounted dual unit', price: 0, metadata: { baseMultiplier: 1.0 } },
  { key: 'dual-inverter', category: 'acUnitType', label: 'Dual Inverter AC', description: 'Variable speed smart inverter', price: 300, metadata: { baseMultiplier: 1.2 } },
  { key: 'window-ac', category: 'acUnitType', label: 'Window AC', description: 'Single box window frame', price: -500, metadata: { baseMultiplier: 0.67 } },

  // Tonnages
  { key: 'ton-1', category: 'tonnage', label: '1.0 Ton', description: 'Up to 120 sq.ft', price: 0, metadata: { multiplier: 0.9 } },
  { key: 'ton-1-5', category: 'tonnage', label: '1.5 Ton', description: '120 - 180 sq.ft', price: 0, metadata: { multiplier: 1.0 } },
  { key: 'ton-2', category: 'tonnage', label: '2.0 Ton', description: '180+ sq.ft', price: 0, metadata: { multiplier: 1.25 } },

  // Materials
  { key: 'copper-piping', category: 'material', label: 'Insulated Copper Piping', description: 'Heavy copper tube per meter', unit: 'meter', price: 250, gstApplicable: true },

  // Addons
  { key: 'wall-bracket', category: 'addon', label: 'Heavy Outdoor Wall Bracket', description: 'Powder-coated rustproof stand', price: 450, gstApplicable: true },
  { key: 'core-drilling', category: 'addon', label: 'Precision Core Wall Drilling', description: 'Clean wall opening for piping', price: 250, gstApplicable: true },
  { key: 'gas-top-up', category: 'addon', label: 'Gas Top-Up R32/R410A', description: 'Leak test + pressure refill', price: 1100, gstApplicable: true },
  { key: 'extended-care', category: 'addon', label: 'Extended 1-Year Protection', description: 'Full annual service protection', price: 399, gstApplicable: true },

  // Tax & Config
  { key: 'gst-rate', category: 'tax', label: 'GST Rate', description: 'Goods & Services Tax percentage', price: 18, gstApplicable: false },
  { key: 'warranty-days', category: 'warranty', label: 'Standard Warranty', description: 'Days of free service guarantee', price: 90, gstApplicable: false },
]

async function seedPricing(PricingRule) {
  for (const rule of defaultRules) {
    await PricingRule.findOneAndUpdate({ key: rule.key }, rule, { upsert: true, new: true })
  }
}

module.exports = { seedPricing, defaultRules }
