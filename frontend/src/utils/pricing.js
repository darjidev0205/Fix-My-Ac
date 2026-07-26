function money(n) {
  return Math.max(0, Math.round(Number(n) || 0))
}

/**
 * Client-side pricing fallback.
 * This mirrors the backend contract:
 * { breakdown: { base, copper: { meters, rate, cost }, wallBracket, drilling, gasRefill }, total }
 */
export function calculatePricingLocal({ acType, tonnage, addOns }) {
  const type = acType === 'window' ? 'window' : 'split'
  const t = Number(tonnage) || 1.5
  const meters = money(addOns?.copperMeters ?? 0)
  const wallBracket = Boolean(addOns?.wallBracket)
  const drilling = Boolean(addOns?.drilling)
  const gasRefill = Boolean(addOns?.gasRefill)

  // Base cost logic (reasonable SaaS defaults; backend will be source of truth)
  const baseByType = type === 'window' ? 1199 : 1499
  const tonnageMultiplier = t <= 1 ? 1 : t <= 1.5 ? 1.12 : 1.28
  const base = money(baseByType * tonnageMultiplier)

  // Add-ons
  const copperRate = type === 'window' ? 240 : 320 // per meter
  const copperCost = money(meters * copperRate)
  const wallBracketCost = wallBracket ? 399 : 0
  const drillingCost = drilling ? 499 : 0
  const gasRefillCost = gasRefill ? 899 : 0

  const total = money(
    base + copperCost + wallBracketCost + drillingCost + gasRefillCost,
  )

  return {
    breakdown: {
      base,
      copper: { meters, rate: copperRate, cost: copperCost },
      wallBracket: wallBracketCost,
      drilling: drillingCost,
      gasRefill: gasRefillCost,
    },
    total,
  }
}

