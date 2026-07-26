const { PricingRule } = require('../models/PricingRule')

function money(n) {
  return Math.max(0, Math.round(Number(n) || 0))
}

/**
 * Single Authoritative Quote Calculation Engine
 */
async function calculateQuote(input) {
  // Load active pricing rules from DB (fallback to defaults if DB empty)
  let dbRules = await PricingRule.find({ isActive: true }).lean()
  const rulesMap = new Map()
  if (dbRules && dbRules.length > 0) {
    dbRules.forEach((r) => rulesMap.set(r.key, r))
  }

  // Normalise Machine-readable IDs
  const serviceKey = input.serviceType || 'installation'
  const acTypeKey = input.acUnitType || 'split-standard'
  const tonnageKey = input.tonnage || 'ton-1-5'
  const copperMeters = Math.max(0, Math.min(50, Number(input.copperPipeMeters ?? input.copperMeters) || 0))
  const selectedAddons = Array.isArray(input.selectedAddons)
    ? input.selectedAddons
    : [
        input.wallBracket && 'wall-bracket',
        input.drilling && 'core-drilling',
        input.gasRefill && 'gas-top-up',
        input.extendedWarranty && 'extended-care',
      ].filter(Boolean)

  // 1. Service Base Price
  const serviceRule = rulesMap.get(serviceKey) || { price: 1499, label: 'Installation' }
  let basePrice = serviceRule.price

  // 2. AC Type & Tonnage Adjustments
  const acTypeRule = rulesMap.get(acTypeKey) || { price: 0, label: 'Split AC (Standard)' }
  const tonnageRule = rulesMap.get(tonnageKey) || { price: 0, label: '1.5 Ton' }

  let tonnageMultiplier = 1.0
  if (tonnageKey === 'ton-1') tonnageMultiplier = 0.9
  if (tonnageKey === 'ton-2') tonnageMultiplier = 1.25

  let calculatedBase = Math.round(basePrice * tonnageMultiplier)
  if (acTypeKey === 'dual-inverter') calculatedBase += 300
  if (acTypeKey === 'window-ac') calculatedBase = Math.max(499, calculatedBase - 300)

  const items = [
    {
      code: `SERVICE_${serviceKey.toUpperCase()}`,
      label: `Base ${serviceRule.label} (${acTypeRule.label} - ${tonnageRule.label})`,
      quantity: 1,
      unitPrice: calculatedBase,
      amount: calculatedBase,
    },
  ]

  let subtotal = calculatedBase

  // 3. Copper Piping
  if (copperMeters > 0) {
    const copperRule = rulesMap.get('copper-piping') || { price: 250, label: 'Insulated Copper Piping' }
    const copperCost = copperMeters * copperRule.price
    subtotal += copperCost
    items.push({
      code: 'COPPER_PIPING',
      label: `${copperRule.label} (${copperMeters}m @ ₹${copperRule.price}/m)`,
      quantity: copperMeters,
      unit: 'meter',
      unitPrice: copperRule.price,
      amount: copperCost,
    })
  }

  // 4. Addons
  selectedAddons.forEach((addonKey) => {
    const addonRule = rulesMap.get(addonKey)
    if (addonRule) {
      subtotal += addonRule.price
      items.push({
        code: `ADDON_${addonKey.toUpperCase().replace(/-/g, '_')}`,
        label: addonRule.label,
        quantity: 1,
        unitPrice: addonRule.price,
        amount: addonRule.price,
      })
    }
  })

  // 5. GST Calculation (18% on taxable subtotal)
  const gstRateRule = rulesMap.get('gst-rate') || { price: 18 }
  const gstRate = gstRateRule.price
  const gstAmount = Math.round(subtotal * (gstRate / 100))
  const discountAmount = 0
  const grandTotal = subtotal + gstAmount - discountAmount

  const warrantyRule = rulesMap.get('warranty-days') || { price: 90 }

  return {
    currency: 'INR',
    serviceType: {
      id: serviceKey,
      label: serviceRule.label,
    },
    acUnitType: {
      id: acTypeKey,
      label: acTypeRule.label,
    },
    tonnage: {
      id: tonnageKey,
      label: tonnageRule.label,
    },
    copperPipeMeters: copperMeters,
    selectedAddons,
    items,
    subtotal,
    gstRate,
    gstAmount,
    discountAmount,
    grandTotal,
    estimatedDuration: '45–60 minutes',
    warrantyDays: warrantyRule.price,
  }
}

module.exports = { calculateQuote, money }
