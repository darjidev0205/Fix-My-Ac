import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Wrench, Sparkles, Zap, Snowflake, Check, ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { useQuote } from '../context/QuoteContext'
import { QuoteSummary } from '../components/quote/QuoteSummary'

export function PriceCalculatorSection() {
  const navigate = useNavigate()
  const { selections, quote, loading, updateSelection, toggleAddon } = useQuote()

  function handleProceedToBooking() {
    toast.success('Estimate locked in! Redirecting to booking...')
    navigate('/booking')
  }

  const serviceOptionsList = [
    {
      id: 'installation',
      label: 'Installation',
      sublabel: 'New AC setup',
      icon: Wrench,
    },
    {
      id: 'cleaning',
      label: 'Jet Wash',
      sublabel: 'Deep indoor cleaning',
      icon: Sparkles,
    },
    {
      id: 'repair',
      label: 'Repair & Check',
      sublabel: 'Full diagnostics',
      icon: Zap,
    },
    {
      id: 'gas',
      label: 'Gas Refill',
      sublabel: 'R32/R410A recharge',
      icon: Snowflake,
    },
  ]

  return (
    <section className="calculator-section">
      <div className="site-container relative z-10">
        
        {/* Section Introduction */}
        <div className="calculator-heading">
          <span className="section-eyebrow">
            <Sparkles size={14} />
            LIVE PRICE BUILDER
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-3">
            Build Your Exact AC Service Quote
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mt-2 leading-relaxed">
            Select your service, AC type, tonnage and add-ons. Your invoice updates instantly.
          </p>
        </div>

        {/* Compact Three-Step Process Bar */}
        <div className="mt-8 max-w-2xl mx-auto flex items-center justify-between gap-2 p-2 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm backdrop-blur-md text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-600 font-bold min-w-0">
            <span className="h-5 w-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] shrink-0">1</span>
            <span className="truncate">Choose Service</span>
          </div>
          <div className="hidden sm:block text-slate-300">→</div>
          <div className="flex items-center gap-2 px-3 py-1.5 min-w-0">
            <span className="h-5 w-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] shrink-0">2</span>
            <span className="truncate">Customise Specs</span>
          </div>
          <div className="hidden sm:block text-slate-300">→</div>
          <div className="flex items-center gap-2 px-3 py-1.5 min-w-0">
            <span className="h-5 w-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] shrink-0">3</span>
            <span className="truncate">Instant Quote</span>
          </div>
        </div>

        {/* Main Two-Column Calculator Layout */}
        <div className="calculator-layout">
          
          {/* Left Calculator Form Card */}
          <div className="calculator-form-card space-y-7">
            
            {/* 1. Service Type Cards */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                1. Select Service Type
              </label>
              
              <div className="service-options" role="radiogroup" aria-label="Select Service Type">
                {serviceOptionsList.map((item) => {
                  const Icon = item.icon
                  const isSelected = selections.serviceType === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => updateSelection('serviceType', item.id)}
                      className={`service-option ${isSelected ? 'is-selected' : ''}`}
                    >
                      {isSelected && (
                        <span className="service-option-check" aria-hidden="true">
                          <Check size={12} strokeWidth={3} />
                        </span>
                      )}
                      
                      <div className="service-option-icon">
                        <Icon size={21} />
                      </div>
                      
                      <h4 className="service-option-title">{item.label}</h4>
                      <p className="service-option-description">{item.sublabel}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 2 & 3. AC Specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div className="min-w-0">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  2. AC Unit Type
                </label>
                <select
                  value={selections.acUnitType}
                  onChange={(e) => updateSelection('acUnitType', e.target.value)}
                  className="min-h-[52px] h-[52px] w-full rounded-2xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                >
                  <option value="split-standard">Split AC (Standard Wall Mount)</option>
                  <option value="dual-inverter">Dual Inverter AC (Smart)</option>
                  <option value="window-ac">Window AC (Single Box)</option>
                </select>
              </div>

              <div className="min-w-0">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  3. AC Tonnage Rating
                </label>
                <select
                  value={selections.tonnage}
                  onChange={(e) => updateSelection('tonnage', e.target.value)}
                  className="min-h-[52px] h-[52px] w-full rounded-2xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                >
                  <option value="ton-1">1.0 Ton (Up to 120 sq.ft)</option>
                  <option value="ton-1-5">1.5 Ton (120 – 180 sq.ft)</option>
                  <option value="ton-2">2.0 Ton (180+ sq.ft)</option>
                </select>
              </div>
            </div>

            {/* 4. Materials & Add-ons */}
            <div className="pt-2 border-t border-slate-100 space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                4. Custom Materials & Add-ons
              </label>

              {/* Copper Slider */}
              <div className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-2xl space-y-2">
                <div className="flex flex-wrap items-center justify-between text-xs font-bold text-slate-800 gap-1">
                  <span>Insulated Copper Piping</span>
                  <span className="text-blue-600 font-extrabold">{selections.copperPipeMeters} meters (₹{selections.copperPipeMeters * 250})</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={selections.copperPipeMeters}
                  onChange={(e) => updateSelection('copperPipeMeters', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>0m (Pre-installed)</span>
                  <span>5m</span>
                  <span>10m (Extended)</span>
                </div>
              </div>

              {/* Add-on Checkbox Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <AddonCard
                  label="Heavy Outdoor Wall Bracket (+₹450)"
                  checked={selections.selectedAddons.includes('wall-bracket')}
                  onChange={() => toggleAddon('wall-bracket')}
                />
                <AddonCard
                  label="Precision Core Wall Drilling (+₹250)"
                  checked={selections.selectedAddons.includes('core-drilling')}
                  onChange={() => toggleAddon('core-drilling')}
                />
                <AddonCard
                  label="Gas Top-Up R32/R410A (+₹1,100)"
                  checked={selections.selectedAddons.includes('gas-top-up')}
                  onChange={() => toggleAddon('gas-top-up')}
                />
                <AddonCard
                  label="Extended 1-Yr Protection (+₹399)"
                  checked={selections.selectedAddons.includes('extended-care')}
                  onChange={() => toggleAddon('extended-care')}
                />
              </div>
            </div>

          </div>

          {/* Right Live Mini Invoice & Summary Card */}
          <div className="space-y-4">
            <QuoteSummary quote={quote} loading={loading} mode="pricing" />

            <Button
              size="lg"
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
              onClick={handleProceedToBooking}
            >
              <span>Book Service with This Quote</span>
              <ArrowRight size={18} />
            </Button>
          </div>

        </div>

      </div>
    </section>
  )
}

function AddonCard({ label, checked, onChange }) {
  return (
    <label
      className={`addon-option ${checked ? 'is-selected' : ''}`}
      onClick={onChange}
    >
      <span className="text-xs font-semibold text-slate-700 truncate pr-2">{label}</span>
      <div className={`h-5 w-5 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
        checked ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 border border-slate-300'
      }`}>
        {checked && <Check size={12} strokeWidth={3} />}
      </div>
    </label>
  )
}

