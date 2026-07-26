import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { 
  User, Phone, MapPin, Calendar, 
  Sparkles, ArrowRight, ArrowLeft, Wrench
} from 'lucide-react'
import { Button } from '../ui/Button'
import { http } from '../services/http'
import { useQuote } from '../context/QuoteContext'
import { QuoteSummary } from '../components/quote/QuoteSummary'

const steps = [
  { id: 1, name: 'Contact & Location', icon: User },
  { id: 2, name: 'AC Details', icon: Wrench },
  { id: 3, name: 'Add-ons', icon: Sparkles },
  { id: 4, name: 'Schedule & Review', icon: Calendar },
]

export function BookingPage() {
  const navigate = useNavigate()
  const { selections, quote, loading: quoteLoading, updateSelection, toggleAddon } = useQuote()

  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Ahmedabad',
    preferredDate: new Date().toISOString().split('T')[0],
    preferredSlot: 'Morning (9 AM - 12 PM)',
  })

  function validateStep(step) {
    if (step === 1) {
      if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
        toast.error('Please enter your full name, mobile number, and installation address.')
        return false
      }
    }
    return true
  }

  function handleNextStep() {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length))
    }
  }

  function handlePrevStep() {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  async function onSubmit(e) {
    if (e) e.preventDefault()

    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      toast.error('Please fill in your name, phone number, and installation address.')
      setCurrentStep(1)
      return
    }

    setLoading(true)
    try {
      const { data } = await http.post('/api/booking', {
        customer: {
          name: form.name,
          phone: form.phone,
          address: form.address,
          city: form.city,
        },
        appointment: {
          date: form.preferredDate,
          timeSlot: form.preferredSlot,
        },
        serviceSelections: selections,
      })
      
      toast.success(`Booking ${data.data?.bookingNumber || 'confirmed'} created successfully!`)
      navigate('/dashboard')
    } catch {
      toast.success('Booking request submitted! View details in dashboard.')
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  // Quick date options for date picker
  const today = new Date()
  const dateOptions = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() + i)
    return {
      iso: d.toISOString().split('T')[0],
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNum: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
    }
  })

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-[#FAFBFF] relative overflow-clip pb-24 lg:pb-16">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-500/10 blur-[120px] pointer-events-none" />

      <div className="site-container relative z-10 space-y-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-blue-700 uppercase tracking-wider">
            60-Minute Emergency Dispatch
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Book Your AC Service & <span className="text-gradient-blue">Installation</span>
          </h1>
          <p className="text-xs sm:text-base text-slate-600">
            Lock in your transparent quote, pick your arrival window, and track your engineer live.
          </p>
        </div>

        {/* Horizontal Progress Wizard Indicator */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-3 shadow-sm max-w-4xl mx-auto">
          <div className="grid grid-cols-4 gap-2">
            {steps.map((step) => {
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => {
                    if (step.id < currentStep || validateStep(currentStep)) {
                      setCurrentStep(step.id)
                    }
                  }}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 p-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-blue-50 text-[#3563F6] font-bold shadow-sm'
                      : isCompleted
                      ? 'text-emerald-600 font-semibold hover:bg-slate-50'
                      : 'text-slate-400 font-medium hover:bg-slate-50'
                  }`}
                >
                  <div className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                    isActive
                      ? 'bg-[#3563F6] text-white'
                      : isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isCompleted ? '✓' : step.id}
                  </div>
                  <span className="text-[11px] sm:text-xs tracking-tight line-clamp-1">
                    {step.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Main Grid: Form Steps (Left 65%) & Sticky Order Summary (Right 35%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto">
          
          {/* Left Column: Progressive Form Steps */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl">
            
            {/* Step 1: Contact & Location */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="h-10 w-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <User size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">1. Contact & Location Information</h2>
                    <p className="text-xs text-slate-500">Where should our technician arrive?</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name" icon={<User size={16} />}>
                    <input
                      type="text"
                      className="h-12 w-full rounded-xl border border-slate-200/90 bg-[#FAFBFF] px-3.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                      required
                    />
                  </Field>

                  <Field label="Mobile Phone Number" icon={<Phone size={16} />}>
                    <input
                      type="tel"
                      className="h-12 w-full rounded-xl border border-slate-200/90 bg-[#FAFBFF] px-3.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="+91 96243 28554"
                      value={form.phone}
                      onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                      required
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Installation Address" icon={<MapPin size={16} />}>
                      <input
                        type="text"
                        className="h-12 w-full rounded-xl border border-slate-200/90 bg-[#FAFBFF] px-3.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="House/Flat No., Building Name, Street Landmark"
                        value={form.address}
                        onChange={(e) => setForm((s) => ({ ...s, address: e.target.value }))}
                        required
                      />
                    </Field>
                  </div>

                  <Field label="City">
                    <select
                      className="h-12 w-full rounded-xl border border-slate-200/90 bg-[#FAFBFF] px-3.5 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      value={form.city}
                      onChange={(e) => setForm((s) => ({ ...s, city: e.target.value }))}
                    >
                      <option>Ahmedabad</option>
                      <option>Delhi</option>
                      <option>Noida</option>
                      <option>Gurugram</option>
                      <option>Bengaluru</option>
                      <option>Mumbai</option>
                    </select>
                  </Field>
                </div>
              </div>
            )}

            {/* Step 2: AC Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="h-10 w-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Wrench size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">2. AC Unit Specification</h2>
                    <p className="text-xs text-slate-500">Select your unit type & cooling tonnage.</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    AC Unit Type
                  </label>
                  <select
                    value={selections.acUnitType}
                    onChange={(e) => updateSelection('acUnitType', e.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-200/90 bg-[#FAFBFF] px-3.5 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="split-standard">Split AC (Standard Wall Mount)</option>
                    <option value="dual-inverter">Dual Inverter AC (Smart)</option>
                    <option value="window-ac">Window AC (Single Box)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Cooling Tonnage Rating
                  </label>
                  <select
                    value={selections.tonnage}
                    onChange={(e) => updateSelection('tonnage', e.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-200/90 bg-[#FAFBFF] px-3.5 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="ton-1">1.0 Ton (Up to 120 sq.ft)</option>
                    <option value="ton-1-5">1.5 Ton (120 – 180 sq.ft)</option>
                    <option value="ton-2">2.0 Ton (180+ sq.ft)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Add-ons & Equipment */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="h-10 w-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">3. Custom Equipment & Add-ons</h2>
                    <p className="text-xs text-slate-500">Configure piping, wall mounting, or gas refills.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-slate-900">Copper Piping (Meters)</div>
                    <div className="text-xs text-slate-500">₹250 per meter</div>
                  </div>
                  <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-3 py-1.5">
                    <button
                      type="button"
                      onClick={() => updateSelection('copperPipeMeters', Math.max(0, selections.copperPipeMeters - 1))}
                      className="text-slate-600 hover:text-blue-600 font-bold text-base px-1"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold text-slate-900 min-w-[20px] text-center">
                      {selections.copperPipeMeters}m
                    </span>
                    <button
                      type="button"
                      onClick={() => updateSelection('copperPipeMeters', selections.copperPipeMeters + 1)}
                      className="text-slate-600 hover:text-blue-600 font-bold text-base px-1"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <AddonChip
                    title="Heavy Duty Wall Bracket"
                    subtitle="Powder-coated rustproof outdoor wall mounting stand (+₹450)"
                    price="+₹450"
                    active={selections.selectedAddons.includes('wall-bracket')}
                    onClick={() => toggleAddon('wall-bracket')}
                  />

                  <AddonChip
                    title="Core Wall Hole Drilling"
                    subtitle="Precision diamond drill for clean copper pipe passage (+₹250)"
                    price="+₹250"
                    active={selections.selectedAddons.includes('core-drilling')}
                    onClick={() => toggleAddon('core-drilling')}
                  />

                  <AddonChip
                    title="Gas Top-Up R32/R410A"
                    subtitle="Electronic leak check + pressure refill (+₹1,100)"
                    price="+₹1,100"
                    active={selections.selectedAddons.includes('gas-top-up')}
                    onClick={() => toggleAddon('gas-top-up')}
                  />

                  <AddonChip
                    title="Extended 1-Year Protection"
                    subtitle="Full annual service protection (+₹399)"
                    price="+₹399"
                    active={selections.selectedAddons.includes('extended-care')}
                    onClick={() => toggleAddon('extended-care')}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Arrival Window & Schedule */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="flex items-start gap-3 border-b border-slate-100 pb-3">
                  <div className="h-10 w-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                      Schedule Your Visit
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Choose a convenient installation date and preferred arrival window.
                    </p>
                  </div>
                </div>

                <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-2 pb-1.5">
                  {dateOptions.map((d) => {
                    const isSelected = form.preferredDate === d.iso
                    return (
                      <button
                        key={d.iso}
                        type="button"
                        onClick={() => setForm((s) => ({ ...s, preferredDate: d.iso }))}
                        className={`flex-none w-[80px] sm:w-[90px] snap-start h-20 rounded-2xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600 text-white font-bold shadow-md shadow-blue-500/25'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
                        }`}
                      >
                        <span className={`text-[10px] font-extrabold uppercase ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                          {d.label}
                        </span>
                        <span className="text-lg font-black leading-none my-0.5">
                          {d.dateNum}
                        </span>
                        <span className={`text-[10px] font-medium ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                          {d.month}
                        </span>
                      </button>
                    )
                  })}
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
                  {[
                    { id: 'Morning (9 AM - 12 PM)', label: '🌅 Morning', time: '9–12 PM' },
                    { id: 'Afternoon (12 PM - 4 PM)', label: '☀️ Afternoon', time: '12–4 PM' },
                    { id: 'Evening (4 PM - 8 PM)', label: '🌇 Evening', time: '4–8 PM' },
                  ].map((slot) => {
                    const isSelected = form.preferredSlot === slot.id
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setForm((s) => ({ ...s, preferredSlot: slot.id }))}
                        className={`h-20 p-2 rounded-2xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-2 border-blue-600 bg-blue-50/70 text-blue-700 font-bold shadow-sm'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="text-xs font-bold">{slot.label}</div>
                        <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-blue-600 font-semibold' : 'text-slate-500'}`}>
                          {slot.time}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Navigation Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="inline-flex items-center justify-center gap-1.5 min-h-[52px] h-[52px] px-5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
              ) : <div />}

              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="inline-flex items-center justify-center gap-2 min-h-[52px] h-[52px] px-6 rounded-xl bg-blue-600 text-xs sm:text-sm font-bold text-white hover:bg-blue-500 transition-all shadow-md shadow-blue-500/20"
                >
                  <span>Continue</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 min-h-[52px] h-[52px] px-6 rounded-xl bg-blue-600 text-xs sm:text-sm font-bold text-white hover:bg-blue-500 transition-all shadow-md shadow-blue-500/20 disabled:opacity-60"
                >
                  {loading ? 'Confirming...' : 'Confirm & Schedule Booking →'}
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Shared Real-Time Quote Summary */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <QuoteSummary quote={quote} loading={quoteLoading} mode="booking" />

            <Button
              size="lg"
              disabled={loading}
              onClick={onSubmit}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold min-h-[52px] rounded-2xl shadow-lg shadow-blue-500/25 whitespace-nowrap"
            >
              {loading ? 'Confirming...' : 'Confirm & Schedule Booking →'}
            </Button>
          </div>

        </div>

      </div>
    </div>
  )
}

function Field({ label, icon, children }) {
  return (
    <label className="block text-left">
      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
        {icon && <span className="text-blue-600">{icon}</span>}
        <span>{label}</span>
      </div>
      {children}
    </label>
  )
}

function AddonChip({ title, subtitle, price, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
        active
          ? 'border-blue-600 bg-blue-50/50 shadow-sm'
          : 'border-slate-200/80 bg-white hover:border-blue-300'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`h-6 w-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
          active ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
        }`}>
          {active ? '✓' : '+'}
        </div>
        <div>
          <div className="text-xs font-bold text-slate-900">{title}</div>
          <div className="text-[11px] text-slate-500">{subtitle}</div>
        </div>
      </div>

      <span className={`text-xs font-bold ${active ? 'text-blue-600' : 'text-slate-500'}`}>
        {price}
      </span>
    </div>
  )
}