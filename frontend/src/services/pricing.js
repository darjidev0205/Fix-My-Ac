import { http } from './http'

export async function calculatePricing(payload) {
  const { data } = await http.post('/api/pricing/calculate', payload)
  return data
}

