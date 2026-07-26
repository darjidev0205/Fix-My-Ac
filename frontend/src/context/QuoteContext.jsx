import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const QuoteContext = createContext(null)

export function QuoteProvider({ children }) {
  const [selections, setSelections] = useState(() => {
    const saved = sessionStorage.getItem('cc_quote_selections')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    return {
      serviceType: 'installation',
      acUnitType: 'split-standard',
      tonnage: 'ton-1-5',
      copperPipeMeters: 3,
      selectedAddons: ['wall-bracket', 'core-drilling'],
      city: 'Ahmedabad',
    }
  })

  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Recalculate quote whenever selections change
  useEffect(() => {
    sessionStorage.setItem('cc_quote_selections', JSON.stringify(selections))
    
    let isMounted = true
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const { data } = await axios.post('/api/pricing/calculate', selections)
        if (isMounted && data.success) {
          setQuote(data.data)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          // Fallback quote computation if backend is launching
          const base = selections.serviceType === 'cleaning' ? 699 : selections.serviceType === 'repair' ? 499 : selections.serviceType === 'gas' ? 1299 : 1499
          const copper = selections.copperPipeMeters * 250
          const bracket = selections.selectedAddons.includes('wall-bracket') ? 450 : 0
          const drilling = selections.selectedAddons.includes('core-drilling') ? 250 : 0
          const gas = selections.selectedAddons.includes('gas-top-up') ? 1100 : 0
          const warranty = selections.selectedAddons.includes('extended-care') ? 399 : 0

          const subtotal = base + copper + bracket + drilling + gas + warranty
          const gstAmount = Math.round(subtotal * 0.18)
          const grandTotal = subtotal + gstAmount

          setQuote({
            currency: 'INR',
            serviceType: { id: selections.serviceType, label: selections.serviceType.toUpperCase() },
            acUnitType: { id: selections.acUnitType, label: selections.acUnitType },
            tonnage: { id: selections.tonnage, label: selections.tonnage },
            copperPipeMeters: selections.copperPipeMeters,
            selectedAddons: selections.selectedAddons,
            items: [
              { code: 'BASE', label: `Base ${selections.serviceType.toUpperCase()}`, quantity: 1, unitPrice: base, amount: base },
              copper > 0 && { code: 'COPPER', label: `Copper Pipe (${selections.copperPipeMeters}m @ ₹250/m)`, quantity: selections.copperPipeMeters, unitPrice: 250, amount: copper },
              bracket > 0 && { code: 'BRACKET', label: 'Heavy Outdoor Wall Bracket', quantity: 1, unitPrice: 450, amount: bracket },
              drilling > 0 && { code: 'DRILLING', label: 'Precision Core Wall Drilling', quantity: 1, unitPrice: 250, amount: drilling },
              gas > 0 && { code: 'GAS', label: 'Gas Top-Up R32/R410A', quantity: 1, unitPrice: 1100, amount: gas },
              warranty > 0 && { code: 'WARRANTY', label: 'Extended 1-Year Protection', quantity: 1, unitPrice: 399, amount: warranty },
            ].filter(Boolean),
            subtotal,
            gstRate: 18,
            gstAmount,
            discountAmount: 0,
            grandTotal,
            estimatedDuration: '45–60 minutes',
            warrantyDays: 90,
          })
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }, 250)

    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [selections])

  function updateSelection(key, value) {
    setSelections((prev) => ({ ...prev, [key]: value }))
  }

  function toggleAddon(addonKey) {
    setSelections((prev) => {
      const exists = prev.selectedAddons.includes(addonKey)
      return {
        ...prev,
        selectedAddons: exists
          ? prev.selectedAddons.filter((a) => a !== addonKey)
          : [...prev.selectedAddons, addonKey],
      }
    })
  }

  return (
    <QuoteContext.Provider
      value={{
        selections,
        quote,
        loading,
        error,
        updateSelection,
        toggleAddon,
        setSelections,
      }}
    >
      {children}
    </QuoteContext.Provider>
  )
}

export function useQuote() {
  return useContext(QuoteContext)
}
